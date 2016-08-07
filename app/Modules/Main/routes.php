<?php

return [
    [
        'route' => '/',
        'target' => [\Modules\Main\Controllers\MainController::class, 'index'],
        'name' => 'index'
    ],
    [
        'route' => '/login',
        'target' => [\Modules\Main\Controllers\MainController::class, 'login'],
        'name' => 'login'
    ],
    [
        'route' => '/logout',
        'target' => [\Modules\Main\Controllers\MainController::class, 'logout'],
        'name' => 'logout'
    ],
    [
        'route' => '/{:name}',
        'target' => [\Modules\Main\Controllers\MainController::class, 'name'],
        'name' => 'name'
    ]
];