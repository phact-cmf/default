#!/bin/bash

echo '\x1b[32mCreating directories\x1b[0m'
mkdir www/media
mkdir www/media/Editor
mkdir app/runtime
mkdir app/Modules
cd app
echo '\x1b[32mInstalling composer\x1b[0m'
EXPECTED_SIGNATURE=$(wget -q -O - https://composer.github.io/installer.sig)
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
ACTUAL_SIGNATURE=$(php -r "echo hash_file('SHA384', 'composer-setup.php');")

if [ "$EXPECTED_SIGNATURE" != "$ACTUAL_SIGNATURE" ]
then
    >&2 echo 'ERROR: Invalid composer installer signature'
    rm composer-setup.php
    exit 1
fi
php composer-setup.php --quiet
RESULT=$?
rm composer-setup.php
echo '\x1b[32mInstalling vendors\x1b[0m'
php composer.phar install --no-dev
echo '\x1b[32mInstalling phact modules\x1b[0m'
cd Modules
git clone https://github.com/phact-cmf-modules/Admin.git Admin
git clone https://github.com/phact-cmf-modules/Assets.git Assets
git clone https://github.com/phact-cmf-modules/Base.git Base
git clone https://github.com/phact-cmf-modules/Editor.git Editor
git clone https://github.com/phact-cmf-modules/Files.git Files
git clone https://github.com/phact-cmf-modules/Mail.git Mail
git clone https://github.com/phact-cmf-modules/Text.git Text
git clone https://github.com/phact-cmf-modules/User.git User
git clone https://github.com/phact-cmf-modules/Meta.git Meta
git clone https://github.com/phact-cmf-modules/Sitemap.git Sitemap
echo -e '\x1b[32mInstalling node modules\x1b[0m'
cd ../../www/static
yarn
echo '\x1b[32mWell done!\x1b[0m'