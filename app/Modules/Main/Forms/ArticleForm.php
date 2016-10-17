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
 * @date 17/10/16 12:53
 */

namespace Modules\Main\Forms;


use Modules\Main\Models\Article;
use Phact\Form\Fields\CheckboxField;
use Phact\Form\ModelForm;

class ArticleForm extends ModelForm
{
    public function getModel()
    {
        return new Article();
    }

    public function getFields()
    {
        return [
            'bool' => [
                'class' => CheckboxField::class,
                'label' => 'Label'
            ]
        ];
    }
}