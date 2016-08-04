{extends 'base.tpl'}

{block 'content'}
    <div class="error-page">
        <div class="error-code">
            {$code}
        </div>
        <div class="message">
            {$exception->getMessage()}
        </div>
    </div>
{/block}