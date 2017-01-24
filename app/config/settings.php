<?php

return [
    'name' => 'First phact application',
    'paths' => [
        'base' => realpath(implode(DIRECTORY_SEPARATOR, [__DIR__, '..'])),
        'www' => realpath(implode(DIRECTORY_SEPARATOR, [__DIR__, '..', '..', 'www'])),
    ],
    'modules' => [
        'Editor',
        'Admin',
        'Base',
        'Files',
        'Mail',
        'Text',
        'User',
        'Catalog'
    ],
    'components' => [
        'db' => [
            'class' => \Phact\Orm\ConnectionManager::class,
            'connections' => [
                'default' => [
                    'driver' => 'mysql',
                    'config' => [
                        'host' => '127.0.0.1',
                        'database' => 'default',
                        'username' => 'user',
                        'password' => 'password',
                        'charset' => 'utf8', // Optional
                        'collation' => 'utf8_unicode_ci', // Optional
                    ]
                ]
            ]
        ],
        'errorHandler' => [
            'class' => \Phact\Main\ErrorHandler::class,
            'debug' => true
        ],
        'request' => [
            'class' => \Phact\Request\RequestManager::class,
            'httpRequest' => [
                'class' => \Phact\Request\HttpRequest::class,
                'session' => [
                    'class' => \Phact\Request\Session::class
                ]
            ],
            'cliRequest' => [
                'class' => \Phact\Request\CliRequest::class,
            ]
        ],
        'router' => [
            'class' => \Phact\Router\Router::class,
            'pathRoutes' => 'base.config.routes'
        ],
        'template' => [
            'class' => \Phact\Template\TemplateManager::class,
            'forceCompile' => true
        ],
        'auth' => [
            'class' => \Modules\User\Components\Auth::class
        ],
        'storage'=>[
            'class'=>\Phact\Storage\StorageManager::class,
            'config'=>[
                'default'=>[
                    'class'=>\Phact\Storage\FileSystemStorage::class,
                ]
            ],
        ],
        'breadcrumbs' => [
            'class' => \Phact\Components\Breadcrumbs::class
        ],
        'seo' => [
            'class' => \Phact\Components\Seo::class
        ],
        'flash' => [
            'class' => \Phact\Components\Flash::class
        ],
    ],
    'autoloadComponents' => [
        'errorHandler'
    ]
];