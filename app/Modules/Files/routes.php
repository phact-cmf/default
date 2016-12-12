<?php

return [
    [
        'route' => '/upload',
        'target' => [\Modules\Files\Controllers\UploadController::class, 'upload'],
        'name' => 'upload'
    ],
    [
        'route' => '/sort',
        'target' => [\Modules\Files\Controllers\UploadController::class, 'sort'],
        'name' => 'sort'
    ],
    [
        'route' => '/delete',
        'target' => [\Modules\Files\Controllers\UploadController::class, 'delete'],
        'name' => 'delete'
    ]
];