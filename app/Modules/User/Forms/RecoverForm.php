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
 * @date 07/08/16 16:17
 */

namespace Modules\User\Forms;

use Modules\User\Models\User;
use Modules\User\UserModule;
use Phact\Form\Fields\EmailField;
use Phact\Form\Fields\PasswordField;
use Phact\Form\Form;
use Phact\Main\Phact;

class RecoverForm extends Form
{
    public function getFields()
    {
        return [
            'email' => [
                'class' => EmailField::class,
                'label' => 'Адрес электронной почты',
                'required' => true,
                'hint' => 'Укажите ваш адрес электронной почты и следуйте инструкциям'
            ]
        ];
    }

    public function clean($attributes)
    {
        if (User::objects()->filter(['email' => $attributes['email']])->count() == 0) {
            $this->addError('email', 'Пользователь с данным адресом не зарегистрирован в системе');
        }
    }

    public function save()
    {
        $attributes = $this->getAttributes();
        $password = uniqid();
        $user = User::objects()->filter(['email' => $attributes['email']])->limit(1)->get();
        $hasher = UserModule::getPasswordHasher();
        $user->setAttributes([
            'password' => $hasher::hash($password)
        ]);
        $user->save();
        Phact::app()->mail->template($user->email, 'Восстановление пароля', 'mail/recover_password.tpl', [
            'password' => $password
        ]);
        return true;
    }

    public function getUser($email)
    {
        return User::objects()->filter(['email' => $email])->get();
    }
}