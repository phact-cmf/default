{extends "base.tpl"}

{block 'heading'}
    <h1>Login</h1>
{/block}

{block 'content'}
    <form action="" method="post">
        {$form->render()}

        <button type="submit" class="button height expand">
            Login
        </button>
    </form>
{/block}