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
 * @date 04/08/16 10:42
 */

namespace Modules\Text;

use Modules\Admin\Traits\AdminTrait;
use Phact\Module\Module;

class TextModule extends Module
{
    use AdminTrait;

    public static function getVerboseName()
    {
        return "Тексты";
    }
}