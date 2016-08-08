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


use Phact\Form\ModelForm;
use Phact\Helpers\ClassNames;
use Phact\Helpers\SmartProperties;
use Phact\Orm\Model;

abstract class Admin
{
    use SmartProperties, ClassNames;

    public $public = true;
    
    /**
     * @return string[]
     */
    public function getListColumns()
    {
        return ['(string)'];
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
}