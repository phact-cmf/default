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

use Phact\Controller\Controller;

class MainController extends Controller
{
    public function index()
    {
        echo $this->render('main/index.tpl');
    }

    public function name($name)
    {
        echo 'Name: ' . $name;
    }
}