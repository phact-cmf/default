<?php

$config = include (__DIR__) . '/settings.php';
$config['components']['db'] = [
    'class' => \Phact\Orm\ConnectionManager::class,
    'properties' => [
        'connections' => [
            'default' => [
                'host' => '127.0.0.1',
                'dbname' => 'database',
                'user' => 'user',
                'password' => '',
                'charset' => 'utf8',
                'driver' => 'pdo_mysql',
            ]
        ]
    ],
];

return $config;