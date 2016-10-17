{if $messages|length > 0}
    <div class="flash-messages-block">
        <ul class="flash-list">
            {foreach $messages as $item}
                <li class="{$item['type']}">
                    <a href="#" class="close-flash right">
                        <i class="icon-delete_in_filter"></i>
                    </a>

                    <span class="message">
                        {$item['message']}
                    </span>
                </li>
            {/foreach}
        </ul>
    </div>
{/if}