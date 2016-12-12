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

namespace Modules\Text\Forms;


use Modules\Editor\Fields\EditorField;
use Modules\Text\Models\InfoBlock;
use Phact\Form\ModelForm;

class InfoBlockForm extends ModelForm
{
    public function getModel()
    {
        return new InfoBlock();
    }

    public function getFields()
    {
        return [
            'text' => [
                'class' => EditorField::class,
                'label' => 'Editor'
            ]
        ];
    }
}