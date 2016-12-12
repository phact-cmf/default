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
use Phact\Form\Fields\CheckboxField;
use Phact\Form\Fields\EmailField;
use Phact\Form\Fields\PasswordField;
use Phact\Form\Form;
use Phact\Main\Phact;
use Phact\Form\Fields\CharField;

class PasswordForm extends Form
{
    protected $_instance;

    public function getFields()
    {
        return [
            'current_password' => [
                'class' => PasswordField::class,
                'label' => 'Текущий пароль'
            ],
            'new_password' => [
                'class' => PasswordField::class,
                'label' => 'Новый пароль',
                'validators' => [
                    new PasswordValidator()
                ]
            ],
            'repeat_password' => [
                'class' => PasswordField::class,
                'label' => 'Повторите новый пароль'
            ],
        ];
    }

    /**
     * @return User
     */
    public function getInstance()
    {
        return $this->_instance;
    }

    /**
     * @param $instance User
     * @return mixed
     */
    public function setInstance($instance)
    {
        $this->_instance = $instance;
        return $instance;
    }

    public function clean($attributes)
    {
        $password = $attributes['current_password'];
        $newPassword = $attributes['new_password'];
        $repeatPassword = $attributes['repeat_password'];
        $hasher = UserModule::getPasswordHasher();
        $user = $this->getInstance();

        if (!$hasher::verify($password, $user->password)) {
            $this->addError('current_password', 'Некорректный пароль');
        }

        if ($newPassword != $repeatPassword) {
            $this->addError('repeat_password', 'Введенные пароли не совпадают');
        }
    }

    public function save()
    {
        $attributes = $this->getAttributes();
        $hasher = UserModule::getPasswordHasher();
        $user = $this->getInstance();
        $user->setAttributes([
            'password' => $hasher::hash($attributes['new_password'])
        ]);
        $user->save();
        return true;
    }
}