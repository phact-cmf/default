<?php

include('../app/vendor/autoload.php');

$configPath = '../app/config/settings.php';
$localConfigPath = '../app/config/local_settings.php';

if (is_file($localConfigPath)) {
    $configPath = $localConfigPath;
}

$config = include $configPath;
\Phact\Main\Phact::init($config);
\Phact\Main\Phact::app()->run();