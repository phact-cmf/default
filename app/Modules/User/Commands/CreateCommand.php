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
 * @date 12/12/16 16:08
 */

namespace Modules\User\Commands;

use Modules\User\Models\User;
use Modules\User\UserModule;
use Phact\Commands\Command;
use Phact\Main\Phact;

class CreateCommand extends Command
{
    public function handle($arguments = [])
    {
        $email = readline("E-mail: ");
        
        if (User::objects()->filter(['email' => $email])->count() > 0) {
            echo "User with email {$email} already exists";
            Phact::app()->end();
        }
        
        $password = null;
        while (!$password) {
            $password = readline("Password: ");
        }

        $hasher = UserModule::getPasswordHasher();
        
        $user = new User();
        $user->email = $email;
        $user->password = $hasher::hash($password);
        $user->is_superuser = true;
        $user->is_staff = true;
        $user->save();
        echo "Superuser with email {$email} created successfully";
    }

    public function getDescription()
    {
        return 'Create superuser';
    }
}