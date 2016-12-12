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
 * @date 14/11/16 12:52
 */

namespace Modules\Editor\Fields;

use Phact\Form\Fields\TextAreaField;

class EditorField extends TextAreaField
{
    public $inputTemplate = 'editor/fields/editor_field_input.tpl';
}