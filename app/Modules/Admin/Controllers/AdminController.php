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
use Modules\User\Models\User;
use Phact\Controller\Controller;
use Phact\Main\Phact;

class AdminController extends BackendController
{
    public function index()
    {
        echo $this->render('admin/index.tpl', [

        ]);
    }
}