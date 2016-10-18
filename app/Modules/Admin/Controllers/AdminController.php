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
 * @date 19/05/16 07:48
 */

namespace Modules\Admin\Controllers;

use Modules\Admin\Contrib\Admin;
use Phact\Main\Phact;

class AdminController extends BackendController
{
    public function all($module, $admin)
    {
        $admin = $this->getAdmin($module, $admin);
        $this->setBreadcrumbs($admin);
        $admin->all();
    }

    public function create($module, $admin)
    {
        $admin = $this->getAdmin($module, $admin);
        $this->setBreadcrumbs($admin, 'Создание');
        $admin->create();
    }

    public function update($module, $admin, $pk)
    {
        $admin = $this->getAdmin($module, $admin);
        $this->setBreadcrumbs($admin, 'Редактирование');
        $admin->update($pk);
    }

    public function remove($module, $admin, $pk)
    {
        if (!$this->request->getIsPost()) {
            $this->error(404);
        }
        $admin = $this->getAdmin($module, $admin);
        $admin->remove($pk);
    }

    public function groupAction($module, $admin)
    {
        if (!$this->request->getIsPost()) {
            $this->error(404);
        }
        $admin = $this->getAdmin($module, $admin);
        $action = isset($_POST['action']) ? $_POST['action'] : null;
        $pkList = isset($_POST['pk_list']) && is_array($_POST['pk_list']) ? $_POST['pk_list'] : [];

        if ($action) {
            $admin->handleGroupAction($action, $pkList);
        } else {
            $this->error(404);
        }
    }

    /**
     * @param $admin Admin
     */
    public function setBreadcrumbs($admin, $last = null)
    {
        Phact::app()->breadcrumbs->add(
            $admin->getName(),
            $admin->getAllUrl()
        );

        if ($last) {
            Phact::app()->breadcrumbs->add($last);
        }
    }

    /**
     * @param $module
     * @param $admin
     * @return Admin
     * @throws \Phact\Exceptions\HttpException
     */
    public function getAdmin($module, $admin)
    {
        $class = "Modules\\{$module}\\Admin\\{$admin}";
        if (class_exists($class)) {
            return new $class;
        }
        $this->error(404);
    }
}