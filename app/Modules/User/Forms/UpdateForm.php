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
use Phact\Form\Fields\CheckboxField;
use Phact\Form\Fields\EmailField;
use Phact\Form\Fields\PasswordField;
use Phact\Form\Form;
use Phact\Main\Phact;
use Phact\Form\Fields\CharField;

class UpdateForm extends Form
{
    protected $_instance;

    public function getFields()
    {
        return [
            'name' => [
                'class' => EmailField::class,
                'label' => 'Имя',
                'required' => true,
                'requiredMessage' => 'Поле обязательно для заполнения'
            ],
            'phone' => [
                'class' => CharField::class,
                'label' => 'Ваш телефон',
                'required' => true,
                'requiredMessage' => 'Поле обязательно для заполнения',
                'attributes' => [
                    'data-mask' => '+7 (999) 999 99 99',
                    'placeholder' => '+7 (___) ___ __ __'
                ],
            ],
            'send_sms' => [
                'class' => CheckboxField::class,
                'label' => 'Получать уведомления по смс'
            ],
            'email' => [
                'class' => EmailField::class,
                'label' => 'Ваш e-mail',
                'required' => true,
                'requiredMessage' => 'Поле обязательно для заполнения'
            ],
            'send_email' => [
                'class' => CheckboxField::class,
                'label' => 'Получать уведомления по e-mail'
            ],
            'current_password' => [
                'class' => PasswordField::class,
                'label' => 'Текущий пароль'
            ],
            'allow_personal_data' => [
                'class' => CheckboxField::class,
                'label' => 'Я согласен на обработку персональных данных',
                'required' => true,
                'value' => 0,
                'hintTemplate' => 'personal/order/_allow_personal_data_hint.tpl',
                'requiredMessage' => 'Вы обязаны принять условия'
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
        $this->setAttributes($instance->getAttributes());
        return $instance;
    }

    public function clean($attributes)
    {
        $password = $attributes['current_password'];
        $hasher = UserModule::getPasswordHasher();
        $user = $this->getInstance();

        if (!$hasher::verify($password, $user->password)) {
            $this->addError('current_password', 'Некорректный пароль');
        }

        if (User::objects()->filter(['email' => $attributes['email']])->exclude(['id' => $user->id])->count() > 1) {
            $this->addError('email', 'Данный адрес уже используется на сайте');
        }

        if (User::objects()->filter(['phone' => $attributes['phone']])->exclude(['id' => $user->id])->count() > 1) {
            $this->addError('email', 'Данный номер телефона уже используется на сайте');
        }
    }

    public function save()
    {
        $data = $this->getAttributes();
        $user = $this->getInstance();
        $user->setAttributes($data);
        $user->save();
        return true;
    }
}