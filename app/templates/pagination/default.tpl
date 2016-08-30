{set $firstPage = $pagination->getFirstPage()}
{set $lastPage = $pagination->getLastPage()}

{if $firstPage != $lastPage}
    <div class="pagination-block">
        {set $activeSize = 2}
        {set $activeFrame = $activeSize * 2 + 1}

        {set $page = $pagination->fetchPage()}
        {set $firstPage = $pagination->getFirstPage()}
        {set $lastPage = $pagination->getLastPage()}

        {set $firstFramePage = $page - $activeSize}
        {if $firstFramePage > $lastPage - $activeSize * 2}
            {set $firstFramePage = $lastPage - $activeSize * 2}
        {/if}
        {if $firstFramePage < $firstPage}
            {set $firstFramePage = $firstPage}
        {/if}

        {set $lastFramePage = $firstFramePage + $activeSize * 2}
        {if $lastFramePage > $lastPage}
            {set $lastFramePage = $lastPage}
        {/if}

        {$firstFramePage}
        {$lastFramePage}

        <ul class="pagination-list">
            <li class="first {if $page == $firstPage}active{/if}">
                <a href="{$pagination->getUrl($firstPage)}">
                    {$firstPage}
                </a>
            </li>

            {if $firstFramePage > $firstPage + 1}
                <li class="dots">
                    {block 'dots'}
                        ...
                    {/block}
                </li>
            {/if}

            {foreach $firstFramePage..$lastFramePage as $item}
                {if $item != $firstPage and $item != $lastPage}
                    <li class="page {if $page == $item}active{/if}">
                        <a href="{$pagination->getUrl($item)}">
                            {$item}
                        </a>
                    </li>
                {/if}
            {/foreach}

            {if $lastFramePage < $lastPage - 1}
                <li class="dots">
                    {block 'dots'}
                        ...
                    {/block}
                </li>
            {/if}

            {if $lastPage > $firstPage}
                <li class="last {if $page == $lastPage}active{/if}">
                    <a href="{$pagination->getUrl($lastPage)}">
                        {$lastPage}
                    </a>
                </li>
            {/if}
        </ul>
    </div>
{/if}