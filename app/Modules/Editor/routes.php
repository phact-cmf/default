<?php

return [
    [
        'route' => '/index',
        'target' => [\Modules\Editor\Controllers\EditorController::class, 'index'],
        'name' => 'index'
    ],
    [
        'route' => '/upload',
        'target' => [\Modules\Editor\Controllers\EditorController::class, 'upload'],
        'name' => 'upload'
    ],
    [
        'route' => '/changed',
        'target' => [\Modules\Editor\Controllers\EditorController::class, 'changed'],
        'name' => 'changed'
    ],
    [
        'route' => '/api',
        'target' => [\Modules\Editor\Controllers\EditorController::class, 'api'],
        'name' => 'api'
    ],
];