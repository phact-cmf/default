#!/bin/bash

mkdir www/media
mkdir www/media/Editor
mkdir app/runtime
mkdir app/Modules
cd app/Modules
git clone https://github.com/phact-cmf-modules/Admin.git Admin
git clone https://github.com/phact-cmf-modules/Base.git Base
git clone https://github.com/phact-cmf-modules/Editor.git Editor
git clone https://github.com/phact-cmf-modules/Files.git Files
git clone https://github.com/phact-cmf-modules/Mail.git Mail
git clone https://github.com/phact-cmf-modules/Text.git Text
git clone https://github.com/phact-cmf-modules/Text.git Text
git clone https://github.com/phact-cmf-modules/User.git User
git clone https://github.com/phact-cmf-modules/Meta.git Meta