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
 * @date 07/08/16 13:24
 */

namespace Modules\User\Helpers;


class Password
{
    public static function hash($raw, $algo = PASSWORD_DEFAULT, $options = [])
    {
        return password_hash($raw, $algo, $options);
    }

    public static function verify($raw, $hashed)
    {
        return password_verify($raw, $hashed);
    }
}