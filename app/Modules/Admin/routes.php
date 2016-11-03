<?php

return [
    [
        'route' => '',
        'target' => [\Modules\Admin\Controllers\CommonController::class, 'index'],
        'name' => 'index'
    ],

    [
        'route' => '/all/{:module}/{:admin}',
        'target' => [\Modules\Admin\Controllers\AdminController::class, 'all'],
        'name' => 'all'
    ],
    [
        'route' => '/create/{:module}/{:admin}',
        'target' => [\Modules\Admin\Controllers\AdminController::class, 'create'],
        'name' => 'create'
    ],
    [
        'route' => '/group_action/{:module}/{:admin}',
        'target' => [\Modules\Admin\Controllers\AdminController::class, 'groupAction'],
        'name' => 'group_action'
    ],
    [
        'route' => '/sort/{:module}/{:admin}',
        'target' => [\Modules\Admin\Controllers\AdminController::class, 'sort'],
        'name' => 'sort'
    ],
    [
        'route' => '/columns/{:module}/{:admin}',
        'target' => [\Modules\Admin\Controllers\AdminController::class, 'columns'],
        'name' => 'columns'
    ],
    [
        'route' => '/update/{:module}/{:admin}/{:pk}',
        'target' => [\Modules\Admin\Controllers\AdminController::class, 'update'],
        'name' => 'update'
    ],
    [
        'route' => '/info/{:module}/{:admin}/{:pk}',
        'target' => [\Modules\Admin\Controllers\AdminController::class, 'info'],
        'name' => 'info'
    ],
    [
        'route' => '/remove/{:module}/{:admin}/{:pk}',
        'target' => [\Modules\Admin\Controllers\AdminController::class, 'remove'],
        'name' => 'remove'
    ],
    [
        'route' => '/login',
        'target' => [\Modules\Admin\Controllers\AuthController::class, 'login'],
        'name' => 'login'
    ],
    [
        'route' => '/logout',
        'target' => [\Modules\Admin\Controllers\AuthController::class, 'logout'],
        'name' => 'logout'
    ],
];