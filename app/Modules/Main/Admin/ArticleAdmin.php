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
 * @date 03/10/16 10:32
 */

namespace Modules\Main\Admin;

use Modules\Admin\Contrib\Admin;
use Modules\Main\Forms\ArticleForm;
use Modules\Main\Models\Article;
use Phact\Orm\Model;

class ArticleAdmin extends Admin
{
    public $sort = 'position';
    
    public function getSearchColumns()
    {
        return ['name', 'text'];
    }

    public function getForm()
    {
        return new ArticleForm();
    }

    /**
     * @return Model
     */
    public function getModel()
    {
        return new Article();
    }

    public function __toString()
    {
        return (string) $this->name;
    }
}