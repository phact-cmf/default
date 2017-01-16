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

namespace Modules\Text\Models;

use Phact\Orm\Fields\CharField;
use Phact\Orm\Fields\TextField;
use Phact\Orm\Model;

/**
 * Class InfoBlock
 * @package Modules\Text\Models
 *
 * @property String name
 * @property String text
 * @property String key
 */
class InfoBlock extends Model
{
    public static function getFields()
    {
        return [
            'name' => [
                'class' => CharField::class,
                'label' => 'Наименование'
            ],
            'text' => [
                'class' => TextField::class,
                'label' => 'Текст'
            ],
            'key' => [
                'class' => CharField::class,
                'label' => 'Ключ (для разработчика)',
                'null' => true
            ]
        ];
    }

    public function __toString()
    {
        return (string) $this->name;
    }
}