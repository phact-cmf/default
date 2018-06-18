#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Creating directories${NC}"
mkdir www/media
mkdir www/media/Editor
mkdir app/runtime
mkdir app/Modules

echo -e "${GREEN}Installing composer${NC}"
EXPECTED_SIGNATURE=$(wget -q -O - https://composer.github.io/installer.sig)
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
ACTUAL_SIGNATURE=$(php -r "echo hash_file('SHA384', 'composer-setup.php');")
if [ "$EXPECTED_SIGNATURE" != "$ACTUAL_SIGNATURE" ]
then
    >&2 echo -e "${RED}ERROR: Invalid composer installer signature${NC}"
    rm composer-setup.php
    exit 1
fi
php composer-setup.php --quiet
RESULT=$?
rm composer-setup.php

echo -e "${GREEN}Installing vendors${NC}"
php composer.phar install --no-dev

echo -e "${GREEN}Installing phact modules${NC}"
cd app/Modules
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

echo -e "${GREEN}Installing node modules${NC}"
cd ../../
yarn || npm i
echo -e "${GREEN}Well done!${NC}"