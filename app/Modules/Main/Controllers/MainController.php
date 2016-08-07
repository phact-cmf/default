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
 * @date 19/05/16 07:48
 */

namespace Modules\Main\Controllers;

use Modules\User\Forms\LoginForm;
use Modules\User\Helpers\Password;
use Modules\User\Models\User;
use Phact\Controller\Controller;
use Phact\Main\Phact;

class MainController extends Controller
{
    public function index()
    {
        echo $this->render('main/index.tpl');
    }

    public function login()
    {
        /** @var User $user */
        $user = Phact::app()->getUser();
        if (!$user->getIsGuest()) {
            d('Logged');
        }
        $form = new LoginForm();

        if ($this->request->getIsPost() && $form->fill($_POST)) {
            if ($form->valid) {
                $form->login();
                $this->redirect('main:index');
            }
        }
        echo $this->render('main/login.tpl', [
            'form' => $form
        ]);
    }

    public function logout()
    {
        Phact::app()->auth->logout();
        $this->redirect('main:login');
    }
    
    public function name($name)
    {
        echo 'Name: ' . $name;
    }
}