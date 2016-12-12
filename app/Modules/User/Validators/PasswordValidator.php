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
 * @date 28/11/16 18:38
 */

namespace Modules\User\Validators;


use Phact\Validators\Validator;

class PasswordValidator extends Validator
{
    public function validate($value)
    {
        $errors = [];
        if (mb_strlen($value) < 6) {
            $errors[] = 'Пароль не может быть короче 6 символов';
        }
        return empty($errors) ? true : $errors;
    }
}