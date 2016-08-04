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
    ],
    'autoloadComponents' => [
        'errorHandler'
    ]
];