<?php

include('../app/vendor/autoload.php');

$configPath = '../app/config/settings.php';
$localConfigPath = '../app/config/local_settings.php';

$debug = false;
if (is_file($localConfigPath)) {
    $configPath = $localConfigPath;
    $debug = true;
}

define("DEBUG", $debug);

$config = include $configPath;
\Phact\Main\Phact::init($config);
\Phact\Main\Phact::app()->run();