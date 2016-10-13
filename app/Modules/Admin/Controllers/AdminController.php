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

namespace Modules\Admin\Controllers;

use Modules\Admin\Contrib\Admin;
use Phact\Main\Phact;

class AdminController extends BackendController
{
    public function all($module, $admin)
    {
        $admin = $this->getAdmin($module, $admin);
        $this->setBreadcrumbs($admin);
        $admin->all();
    }

    public function create($module, $admin)
    {
        $admin = $this->getAdmin($module, $admin);
        $this->setBreadcrumbs($admin);
        $admin->create();
    }

    public function update($module, $admin, $pk)
    {
        $admin = $this->getAdmin($module, $admin);
        $this->setBreadcrumbs($admin);
        $admin->update($pk);
    }

    /**
     * @param $admin Admin
     */
    public function setBreadcrumbs($admin)
    {
        Phact::app()->breadcrumbs->add(
            $admin->getName(),
            $admin->getAllUrl()
        );
    }

    /**
     * @param $module
     * @param $admin
     * @return Admin
     * @throws \Phact\Exceptions\HttpException
     */
    public function getAdmin($module, $admin)
    {
        $class = "Modules\\{$module}\\Admin\\{$admin}";
        if (class_exists($class)) {
            return new $class;
        }
        $this->error(404);
    }
}