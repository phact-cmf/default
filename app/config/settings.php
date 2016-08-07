<?php

return [
    'name' => 'First phact application',
    'paths' => [
        'base' => implode(DIRECTORY_SEPARATOR, [__DIR__, '..'])
    ],
    'modules' => [
        'Main'
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
            'class' => \Phact\Template\TemplateManager::class
        ],
        'auth' => [
            'class' => \Modules\User\Components\Auth::class
        ]
    ],
    'autoloadComponents' => [
        'errorHandler'
    ]
];