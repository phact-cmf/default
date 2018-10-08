<?php

return [
    'name' => 'First phact application',
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
        'paths' => [
            'class' => \Phact\Components\Path::class,
            'calls' => [
                'setPaths' => [
                    [
                        'base' => realpath(__DIR__ . '/../'),
                        'www' => realpath(__DIR__ . '/../../www'),
                        'static' => realpath(__DIR__ . '/../../www/static'),
                        'static_modules' => realpath(__DIR__ . '/../../www/static_modules'),
                        'root' => realpath(__DIR__ . '/../../'),
                    ]
                ]
            ]
        ],
        'translate' => [
            'class' => \Phact\Translate\Translate::class,
            'calls' => [
                'setLocale' => ['ru']
            ]
        ],
        'db' => [
            'class' => \Phact\Orm\ConnectionManager::class,
            'properties' => [
                'settings' => [
                    'cacheFieldsTimeout' => PHACT_DEBUG ? null : 86400
                ],
                'connections' => [
                    'default' => [
                        'host' => '127.0.0.1',
                        'dbname' => 'tpl',
                        'user' => 'root',
                        'password' => '',
                        'charset' => 'utf8',
                        'driver' => 'pdo_mysql',
                    ]
                ]
            ],
        ],
        'errorHandler' => [
            'class' => \Phact\Main\ErrorHandler::class,
            'properties' => [
                'debug' => PHACT_DEBUG
            ]
        ],
        'logger.default' => [
            'class' => \Monolog\Logger::class,
            'arguments' => [
                'name' => 'default'
            ],
            'calls' => [
                'pushHandler' => ['@default_logger_handler']
            ]
        ],
        'default_logger_handler' => [
            'class' => \Monolog\Handler\RotatingFileHandler::class,
            'arguments' => [
                'filename' => realpath(__DIR__ . '/../runtime') . '/default.log',
                'maxFiles' => 7,
                'level' => PHACT_DEBUG ? \Monolog\Logger::DEBUG : \Monolog\Logger::WARNING
            ]
        ],
        'event' => [
            'class' => \Phact\Event\EventManager::class
        ],
        'session' => [
            'class' => \Phact\Request\Session::class
        ],
        'request' => [
            'class' => \Phact\Request\HttpRequest::class
        ],
        'cliRequest' => [
            'class' => \Phact\Request\CliRequest::class
        ],
        'router' => [
            'class' => \Phact\Router\Router::class,
            'arguments' => [
                'configPath' => 'base.config.routes'
            ],
            'properties' => [
                'cacheTimeout' => PHACT_DEBUG ? null : 86400
            ],
        ],
        'template' => [
            'class' => \Phact\Template\TemplateManager::class,
            'properties' => [
                'librariesCacheTimeout' => PHACT_DEBUG ? null : 86400,
                'forceCompile' => PHACT_DEBUG ? true : false,
                'autoReload' => PHACT_DEBUG ? true : false
            ]
        ],
        'auth' => [
            'class' => \Modules\User\Components\Auth::class,
            'properties' => [
                'afterLoginRoute' => 'personal:index',
                'afterLogoutRoute' => 'user:login'
            ]
        ],
        'storage'=>[
            'class' => \Phact\Storage\FileSystemStorage::class
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
            'calls' => [
                'setDrivers' => [[
                    'default' =>  [
                        'class' => \Phact\Cache\Drivers\File::class
                    ]
                ]]
            ]
        ],
        'mail' => [
            'class' => \Modules\Mail\Components\Mailer::class,
            'properties' => [
                'defaultFrom' => 'order@rclass.pro',
                'mode' => 'smtp',
                'config' => [
                    'host' => 'smtp.yandex.ru',
                    'username' => 'order@rclass.pro',
                    'password' => 'hZairr9APo',
                    'port' => '465',
                    'security' => 'ssl'
                ]
            ]
        ],
        'assets' => [
            'class' => \Modules\Assets\Components\AssetsComponent::class,
            'calls' => [
                'setBuilds' => [[
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
                ]]
            ]
        ],
    ],
    'autoloadComponents' => [
        'errorHandler'
    ]
];