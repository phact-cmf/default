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
use Modules\User\Validators\PasswordValidator;
use Phact\Form\Fields\EmailField;
use Phact\Form\Fields\PasswordField;
use Phact\Form\Form;
use Phact\Main\Phact;

class RegisterForm extends Form
{
    protected $_user;

    public function getFields()
    {
        return [
            'name' => [
                'class' => EmailField::class,
                'label' => 'Ваше имя',
                'required' => true
            ],
            'email' => [
                'class' => EmailField::class,
                'label' => 'Адрес электронной почты',
                'required' => true
            ],
            'password' => [
                'class' => PasswordField::class,
                'label' => 'Пароль',
                'validators' => [
                    new PasswordValidator()
                ]
            ]
        ];
    }

    public function clean($attributes)
    {
        if (User::objects()->filter(['email' => $attributes['email']])->count() > 1) {
            $this->addError('email', 'Данный адрес уже используется на сайте');
        }
    }

    public function save()
    {
        $attributes = $this->getAttributes();
        $hasher = UserModule::getPasswordHasher();

        $this->_user = new User();
        $this->_user->name = $attributes['name'];
        $this->_user->password = $hasher::hash($attributes['password']);
        $this->_user->email = $attributes['email'];
//        d($this->_user->send_sms);
        return $this->_user->save();
    }

    public function login()
    {
        Phact::app()->auth->login($this->_user);
    }
}