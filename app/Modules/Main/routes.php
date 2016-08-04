<?php

return [
    [
        'route' => '/',
        'target' => [\Modules\Main\Controllers\MainController::class, 'index'],
        'name' => 'index'
    ],
    [
        'route' => '/{:name}',
        'target' => [\Modules\Main\Controllers\MainController::class, 'name'],
        'name' => 'name'
    ]
];