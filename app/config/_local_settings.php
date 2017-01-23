<?php

$config = include (__DIR__) . '/settings.php';
$config['components']['db'] = [
    'class' => \Phact\Orm\ConnectionManager::class,
    'connections' => [
        'default' => [
            'driver' => 'mysql',
            'config' => [
                'host' => '127.0.0.1',
                'database' => 'database',
                'username' => 'username',
                'password' => 'password',
                'charset' => 'utf8', // Optional
                'collation' => 'utf8_unicode_ci', // Optional
            ]
        ]
    ]
];

return $config;