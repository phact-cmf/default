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

namespace Modules\User;

use Modules\User\Helpers\Password;
use Phact\Module\Module;

class UserModule extends Module
{
    public static function getPasswordHasher()
    {
        return Password::class;
    }
}