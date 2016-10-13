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
 * @date 28/09/16 12:03
 */

namespace Modules\Main\Models;

use Phact\Orm\Fields\CharField;
use Phact\Orm\Fields\ForeignField;
use Phact\Orm\Fields\HasManyField;
use Phact\Orm\Fields\TextField;
use Phact\Orm\Model;

class Article extends Model
{
    public static function getFields()
    {
        return [
            'name' => [
                'class' => CharField::class,
                'label' => 'Name'
            ],
            'text' => [
                'class' => TextField::class,
                'label' => 'Text'
            ],
            'article' => [
                'class' => ForeignField::class,
                'modelClass' => Article::className(),
                'label' => "Article"
            ],
            'articles' => [
                'class' => HasManyField::class,
                'modelClass' => Article::className(),
                'label' => "Articles"
            ],
        ];
    }

    public function __toString()
    {
        return (string) $this->name;
    }
}