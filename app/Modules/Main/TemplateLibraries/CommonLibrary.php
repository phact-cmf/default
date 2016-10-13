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

use Phact\Main\Phact;
use Phact\Template\Renderer;
use Phact\Template\TemplateLibrary;

class CommonLibrary extends TemplateLibrary
{
    use Renderer;

    /**
     * @name render_breadcrumbs
     * @kind function
     * @return string
     */
    public static function renderBreadcrumbs($params)
    {
        $template = isset($params['template']) ? $params['template'] : '_breadcrumbs.tpl';
        $name = isset($params['name']) ? $params['name'] : 'DEFAULT';

        return self::renderTemplate($template, [
            'breadcrumbs' => Phact::app()->breadcrumbs->get($name)
        ]);
    }

    /**
     * @name build_url
     * @kind function
     * @return string
     */
    public static function buildUrl($params)
    {
        $data = isset($params['data']) ? $params['data'] : [];
        $query = Phact::app()->request->getQueryArray();
        foreach ($data as $key => $value) {
            $query[$key] = $value;
        }
        return Phact::app()->request->getPath() . '?' . http_build_query($query);
    }
}