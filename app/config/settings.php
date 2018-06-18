<?php

return [
    'name' => 'First phact application',
    'paths' => [
        'base' => realpath(__DIR__ . '/../'),
        'www' => realpath(__DIR__ . '/../../www'),
        'static' => realpath(__DIR__ . '/../../www/static'),
        'static_modules' => realpath(__DIR__ . '/../../www/static_modules'),
    ],
    'modules' => [
        'Assets',
        'Editor',
        'Admin',
        'Base',
        'Files',
        'Text',
        'Meta',
        'User',
        'Mail',
        'Sitemap'
    ],
    'components' => [
        'db' => [
            'class' => \Phact\Orm\ConnectionManager::class,
            'settings' => [
                'cacheFieldsTimeout' => PHACT_DEBUG ? null : 86400
            ],
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
            'debug' => PHACT_DEBUG
        ],
        'log' => [
            'class' => \Phact\Log\LogManager::class,
            'handlers' => [
                'default' => [
                    'class' => \Monolog\Handler\RotatingFileHandler::class,
                    '__construct' => [
                        realpath(__DIR__ . '/../runtime') . '/default.log',
                        7,
                        PHACT_DEBUG ? \Monolog\Logger::DEBUG : \Monolog\Logger::WARNING
                    ]
                ]
            ],
            'loggers' => [
                'default' => [
                    'class' => \Monolog\Logger::class,
                    'handlers' => [
                        'default'
                    ]
                ]
            ]
        ],
        'event' => [
            'class' => \Phact\Event\EventManager::class
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
            'pathRoutes' => 'base.config.routes',
            'cacheTimeout' => PHACT_DEBUG ? null : 86400
        ],
        'template' => [
            'class' => \Phact\Template\TemplateManager::class,
            'librariesCacheTimeout' => PHACT_DEBUG ? null : 86400,
            'forceCompile' => PHACT_DEBUG ? true : false,
            'autoReload' => PHACT_DEBUG ? true : false
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
        'meta' => [
            'class' => \Modules\Meta\Components\MetaComponent::class
        ],
        'flash' => [
            'class' => \Phact\Components\Flash::class
        ],
        'settings' => [
            'class' => \Phact\Components\Settings::class
        ],
        'cache' => [
            'class' => \Phact\Cache\Cache::class,
            'drivers' => [
                'default' =>  [
                    'class' => \Phact\Cache\Drivers\File::class
                ]
            ]
        ],
        'mail' => [
            'class' => \Modules\Mail\Components\Mailer::class,
            'defaultFrom' => 'EMAIL',
            'mode' => 'smtp',
            'config' => [
                'host' => 'HOST',
                'username' => 'EMAIL',
                'password' => 'PASSWORD',
                'port' => '465',
                'security' => 'ssl'
            ]
        ],
        'assets' => [
            'class' => \Modules\Assets\Components\AssetsComponent::class,
            'builds' => [
                'default' => [
                    'class' => \Modules\Assets\Builds\SimpleBuild::class,
                    'publicPath' => '/static'
                ],
                'frontend' => [
                    'class' => \Modules\Assets\Builds\ManifestBuild::class,
                    'publicPath' => '/static',
                    'manifestFile' => realpath( __DIR__ . '/../../www/static/manifest.json')
                ],
                'admin' => [
                    'class' => \Modules\Assets\Builds\ManifestBuild::class,
                    'publicPath' => '/static_admin',
                    'manifestFile' => realpath(__DIR__ . '/../../www/static_admin/manifest.json')
                ],
                'modules' => [
                    'class' => \Modules\Assets\Builds\SimpleBuild::class,
                    'publicPath' => '/static_modules'
                ]
            ]
        ],
    ],
    'autoloadComponents' => [
        'errorHandler',
        'log'
    ]
];