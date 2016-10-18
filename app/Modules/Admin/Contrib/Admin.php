<?php
/**
 *
 *
 * All rights reserved.
 *
 * @author Okulov Anton
 * @email qantus@mail.ru
 * @version 1.0
 * @company HashStudio
 * @site http://hashstudio.ru
 * @date 08/08/16 08:22
 */

namespace Modules\Admin\Contrib;


use Exception;
use Phact\Components\Flash;
use Phact\Exceptions\HttpException;
use Phact\Form\ModelForm;
use Phact\Helpers\ClassNames;
use Phact\Helpers\SmartProperties;
use Phact\Helpers\Text;
use Phact\Main\Phact;
use Phact\Orm\Fields\Field;
use Phact\Orm\Fields\ForeignField;
use Phact\Orm\Fields\HasManyField;
use Phact\Orm\Fields\ManyToManyField;
use Phact\Orm\Model;
use Phact\Orm\QuerySet;
use Phact\Pagination\Pagination;
use Phact\Template\Renderer;

abstract class Admin
{
    use SmartProperties, ClassNames, Renderer;

    public static $public = true;

    public $allTemplate = 'admin/all.tpl';
    public $listItemActionsTemplate = 'admin/list/_item_actions.tpl';
    public $listPaginationTemplate = 'admin/list/_pagination.tpl';

    public $createTemplate = 'admin/create.tpl';
    public $updateTemplate = 'admin/update.tpl';
    public $formTemplate = 'admin/form/_form.tpl';

    public $pageSize = 20;
    public $pageSizes = [20, 50, 100];

    /**
     * Sorting column
     *
     * @var null|string
     */
    public $sort = null;

    /**
     * @return mixed
     */
    public function getAvailableListColumns()
    {
        return [
            'id' => [
                'title' => 'ID',
                'template' => 'admin/list/columns/default.tpl',
                'order' => 'id'
            ],
            '(string)' => [
                'title' => $this->getItemName(),
                'template' => 'admin/list/columns/default.tpl',
                'order' => 'id'
            ],
        ];
    }

    public function getListColumns()
    {
        return ['id', '(string)'];
    }

    /**
     * Available string options: "update", "view", "remove", "info"
     * @return array
     */
    public function getListItemActions()
    {
        return [
            'update',
            'view',
            'remove'
        ];
    }

    /**
     * @return array
     *
     * Example:
     *
     * [
     *  'remove',
     *  'activate' => 'Activate items',
     *  'process' => [
     *      'title' => 'Process',
     *      'callback' => function ($qs, $ids) {
     *          $qs->filter(['status' => 1])->delete();
     *          return true;
     *      }
     *  ],
     * 'example' => [
     *      'title' => 'Example return',
     *      'callback' => function ($qs, $ids) {
     *          $qs->filter(['status' => 3])->delete();
     *          return [true, "Objects successfully removed"];
     *      }
     *  ],
     *  'do' => [
     *      'title' => 'Do some action',
     *      'callback' => [$this, 'do']
     *  ]
     * ]
     */
    public function getListGroupActions()
    {
        return [
            'update',
            'remove'
        ];
    }

    public function getListGroupActionsConfig()
    {
        $actions = $this->getListGroupActions();
        $result = [];
        foreach ($actions as $key => $item) {
            $title = null;
            $callback = null;

            if (is_numeric($key) && is_string($item)) {
                $id = $item;
            } elseif (is_string($key) && $item) {
                $id = $key;
                if (is_array($item)) {
                    $title = isset($item['title']) ? $item['title'] : [];
                    $callback = isset($item['callback']) ? $item['callback'] : [];
                } elseif (is_string($item)) {
                    $title = $item;
                }
            } else {
                continue;
            }
            if (!$title) {
                $title = Text::ucfirst($id);
            }
            if (!$callback) {
                $callback = [$this, 'group' . Text::ucfirst($id)];
            }
            $result[$id] = [
                'title' => $title,
                'callback' => $callback
            ];
        }
        return $result;
    }

    public function handleGroupAction($action, $pkList = [])
    {
        /** @var Flash $flash */
        $flash = Phact::app()->flash;
        $request = Phact::app()->request;

        $actions = $this->getListGroupActionsConfig();
        if (!isset($actions[$action])) {
            throw new HttpException(404);
        }
        $actionConfig = $actions[$action];
        $callback = $actionConfig['callback'];
        $qs = $this->getQuerySet();
        $qs = $qs->filter(['pk__in' => $pkList]);
        $result = call_user_func($callback, $qs, $pkList);

        $success = true;
        $message = 'Изменения успешно применены';

        if (is_array($result) && count($result) == 2 && is_bool($result[0]) && is_string($result[1])) {
            $success = $result[0];
            $message = $result[1];
        } elseif ($result !== true) {
            $success = false;
            if (is_string($result)) {
                $message = $result;
            } else {
                $message = 'При применении изменений произошла ошибка';
            }
        }

        if ($request->getIsAjax()) {
            $this->jsonResponse([
                'success' => $success,
                'message' => $message
            ]);
            Phact::app()->end();
        } else {
            $flash->add($message, $success ? 'success' : 'error');
            $request->redirect($this->getAllUrl());
        }
    }

    public function getListDropDownGroupActions()
    {
        $actions = $this->getListGroupActionsConfig();
        if (array_key_exists('remove', $actions)) {
            unset($actions['remove']);
        }
        if (array_key_exists('update', $actions)) {
            unset($actions['update']);
        }
        return $actions;
    }

    /**
     * @TODO From cookies/db/etc
     * @return null|string[]
     */
    public function getUserColumns()
    {
        return null;
    }

    public function buildListColumns()
    {
        $defaultColumns = $this->getListColumns();
        $userColumns = $this->getUserColumns();

        $availableColumns = $this->getAvailableListColumns();
        $fields = $this->getModel()->getFields();

        $config = [];
        $enabled = [];
        foreach ($defaultColumns as $key => $value) {
            if (is_string($key) && is_array($value)) {
                $enabled[] = $value;
                $config[$key] = $value;
            } elseif (is_string($value)) {
                $config[$value] = [];
                $enabled[] = $value;
            }
        }
        foreach ($availableColumns as $key => $value) {
            if (is_string($key) && is_array($value) && (!array_key_exists($key, $config) || empty($config[$key]))) {
                $config[$key] = $value;
            } elseif (is_string($value) && !array_key_exists($value, $config)) {
                $config[$value] = [];
            }
        }
        foreach ($fields as $name => $field) {
            if (is_array($field)) {
                $columnConfig = isset($config[$name]) ? $config[$name] : [];
                if (!isset($columnConfig['title']) && isset($field['label'])) {
                    $columnConfig['title'] = $field['label'];
                }
                if (!isset($columnConfig['order'])) {
                    /** @var Field $modelField */
                    $modelField = $this->getModel()->getField($name);
                    $attribute = $modelField->getAttributeName();
                    if ($attribute) {
                        $columnConfig['order'] = $attribute;
                    }
                }
                $config[$name] = $columnConfig;
            }
        }
        foreach ($config as $key => $item) {
            if (!isset($item['title'])) {
                $config[$key]['title'] = ucfirst($key);
            }
        }
        if ($userColumns) {
            $safeUserColumns = [];
            foreach ($userColumns as $column) {
                if (array_key_exists($column, $config)) {
                    $safeUserColumns[] = $column;
                }
            }
            if ($safeUserColumns) {
                $enabled = $safeUserColumns;
            }
        }

        return [
            'enabled' => $enabled,
            'config' => $config
        ];
    }

    public function getSearchColumns()
    {
        return [];
    }

    /**
     * @return Model
     */
    abstract public function getModel();

    /**
     * @return ModelForm
     */
    public function getForm()
    {
        return new ModelForm();
    }

    /**
     * @return ModelForm
     */
    public function getUpdateForm()
    {
        return $this->getForm();
    }

    public static function getName()
    {
        return static::classNameShort();
    }

    public static function getItemName()
    {
        return static::classNameShort();
    }

    public function getQuerySet()
    {
        $model = $this->getModel();
        return $model->objects()->getQuerySet();
    }

    public function getOrder()
    {
        $order = isset($_GET['order']) ? $_GET['order'] : null;
        if ($order) {
            $clean = $order;
            $asc = true;
            if (Text::startsWith($clean, '-')) {
                $asc = false;
                $clean = mb_substr($clean, 1);
            }
            return [
                'raw' => $order,
                'clean' => $clean,
                'asc' => $asc,
                'desc' => !$asc
            ];
        }
        return null;
    }

    public function applyOrder($qs)
    {
        $order = $this->getOrder();
        if ($order && isset($order['raw'])) {
            $qs->order([
                $order['raw']
            ]);
        }
        return $qs;
    }

    public function getCommonData()
    {
        return [
            'admin' => $this,
            'adminClass' => static::classNameShort(),
            'moduleClass' => static::getModuleName()
        ];
    }

    public function getId()
    {
        return implode('-', [static::getModuleName(), static::classNameShort()]);
    }

    public function getAllUrl()
    {
        return Phact::app()->router->url('admin:all', [
            'module' => static::getModuleName(),
            'admin' => static::classNameShort()
        ]);
    }

    public function getCreateUrl()
    {
        return Phact::app()->router->url('admin:create', [
            'module' => static::getModuleName(),
            'admin' => static::classNameShort()
        ]);
    }

    public function getUpdateUrl($pk = null)
    {
        return Phact::app()->router->url('admin:update', [
            'module' => static::getModuleName(),
            'admin' => static::classNameShort(),
            'pk' => $pk
        ]);
    }

    public function getInfoUrl($pk = null)
    {
        return Phact::app()->router->url('admin:info', [
            'module' => static::getModuleName(),
            'admin' => static::classNameShort(),
            'pk' => $pk
        ]);
    }

    public function getRemoveUrl($pk = null)
    {
        return Phact::app()->router->url('admin:remove', [
            'module' => static::getModuleName(),
            'admin' => static::classNameShort(),
            'pk' => $pk
        ]);
    }

    public function getGroupActionUrl()
    {
        return Phact::app()->router->url('admin:group_action', [
            'module' => static::getModuleName(),
            'admin' => static::classNameShort()
        ]);
    }

    public function getItemProperty(Model $item, $property)
    {
        $value = $item;
        $data = explode('__', $property);
        foreach ($data as $name) {
            $value = $value->{$name};
        }
        return $value;
    }

    public function all()
    {
        $qs = $this->getQuerySet();
        $qs = $this->applyOrder($qs);

        $pagination = new Pagination($qs, [
            'defaultPageSize' => $this->pageSize,
            'pageSizes' => $this->pageSizes
        ]);

        $this->render($this->allTemplate, [
            'objects' => $pagination->getData(),
            'pagination' => $pagination,
            'order' => $this->getOrder(),
            'search' => $this->getSearchColumns(),
            'columns' => $this->buildListColumns()
        ]);
    }

    public function remove($pk)
    {
        $object = $this->getModelOr404($pk);
        $removed = $object->delete();
        if ($removed) {
            $data = ['success' => true];
        } else {
            $data = ['error' => 'При удалении объекта произошла ошибка'];
        }
        $this->jsonResponse($data);
    }

    /**
     * @param $qs QuerySet
     * @param $pkList
     * @return bool
     */
    public function groupRemove($qs, $pkList)
    {
        $qs->delete();
        return [true, "Объекты успешно удалены"];
    }

    public function render($template, $data = [])
    {
        echo $this->renderTemplate($template, array_merge($data, $this->getCommonData()));
    }

    public function jsonResponse($data = [])
    {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    /**
     * @param $pk
     * @return null|Model
     * @throws HttpException
     */
    public function getModelOr404($pk)
    {
        $object = $this->getModel()->objects()->filter(['pk' => $pk])->limit(1)->get();
        if (!$object) {
            throw new HttpException(404);
        }
        return $object;
    }

    public function getFormFieldsets()
    {
        return null;
    }

    public function create()
    {
        $this->update(null);
    }

    public function update($pk = null)
    {
        $new = false;
        if (is_null($pk)) {
            $new = true;
            $model = $this->newModel();
            $form = $this->getForm();
        } else {
            $model = $this->getModelOr404($pk);
            $form = $this->getUpdateForm();
        }

        $form->setModel($model);
        $form->setInstance($model);

        $request = Phact::app()->request;
        if ($request->getIsPost() && $form->fill($_POST, $_FILES)) {
            if ($form->valid && $form->save()) {
                if ($request->getIsAjax()) {

                } else {
                    Phact::app()->flash->success('Изменения сохранены');

                    $next = isset($_POST['save']) ? $_POST['save']: 'save';
                    if ($next == 'save') {
                        $request->redirect($this->getAllUrl());
                    } elseif ($next == 'save-stay') {
                        $request->refresh();
                    } else {
                        $request->redirect($this->getCreateUrl());
                    }
                }
            } else {
                if (!$request->getIsAjax()) {
                    Phact::app()->flash->error('Пожалуйста, исправьте ошибки');
                }
            }
        }
        
        $template = $new ? $this->createTemplate : $this->updateTemplate;
        $this->render($template, [
            'form' => $form,
            'model' => $model,
            'new' => $new
        ]);
    }

    public function newModel()
    {
        $model = $this->getModel();
        return new $model;
    }
}