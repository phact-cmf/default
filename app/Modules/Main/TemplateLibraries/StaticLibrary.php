<?php
/**
 *
 *
 * All rights reserved.
 *
 * @author Okulov Anton
 * @email qantus@mail.ru
 * @version 1.0
 * @company HashStudio
 * @site http://hashstudio.ru
 * @date 08/09/16 07:25
 */

namespace Modules\Main\TemplateLibraries;

use Phact\Helpers\Paths;
use Phact\Template\TemplateLibrary;

class StaticLibrary extends TemplateLibrary
{
    protected static function getFrontendVersionsDir()
    {
        return Paths::get('www.static.frontend.versions');
    }

    protected static function getVersionFromContent($content)
    {
        $space = strpos($content, ' ');
        if ($space !== false) {
            return substr($content, 0, $space);
        }
        return null;
    }

    protected static function getVersion($file, $default = 1)
    {
        if (is_file($file) && ($content = file_get_contents($file)) && ($version = self::getVersionFromContent($content))) {
            return $version;
        }
        return $default;
    }

    /**
     * @kind function
     * @name frontend_css_version
     * @return int|void
     */
    public static function getFrontendCssVersion()
    {
        return self::getVersion(self::getFrontendVersionsDir() . DIRECTORY_SEPARATOR . 'css.yml');
    }

    /**
     * @kind function
     * @name frontend_js_version
     * @return int|void
     */
    public static function getFrontendJsVersion()
    {
        return self::getVersion(self::getFrontendVersionsDir() . DIRECTORY_SEPARATOR . 'js.yml');
    }
}