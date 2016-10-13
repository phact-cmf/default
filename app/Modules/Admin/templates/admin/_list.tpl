{var $id = $admin->getId()}

<div class="list-block" data-id="{$id}-list">
    <div class="list-top clearfix">
        <div class="top-buttons-block left">
            <a href="{$admin->getCreateUrl()}" class="button round upper pad">
                <span class="text">
                    Создать
                </span>
                <i class="icon-plus"></i>
            </a>
        </div>

        {if $search}
            <div class="top-search-block left">
                <input type="text" data-list-search placeholder="Поиск...">
            </div>
        {/if}
    </div>
    <div class="list-wrapper">
        <div class="list-update-block">
            <table>
                <thead>
                    {var $cols = 0}

                    <tr class="list-head">
                        <th class="checker full">
                            <input type="checkbox" id="{$id}-check-all" data-checkall-list>
                            <label for="{$id}-check-all" class="alone"></label>
                            {var $cols = $cols+1}
                        </th>

                        {if $admin->sort}
                            <th class="sort full">
                                <i class="icon-double_triangle"></i>
                                {var $cols = $cols+1}
                            </th>
                        {/if}

                        {foreach $columns['enabled'] as $column}
                            {var $config = $columns['config'][$column]}
                            <th class="col full">
                                {include 'admin/list/_th.tpl'}
                                {var $cols = $cols+1}
                            </th>
                        {/foreach}

                        <th class="actions">
                            <a href="#" class="button-appender">
                                <i class="icon-plus"></i>
                            </a>
                            {var $cols = $cols+1}
                        </th>
                    </tr>

                    <tr class="delimiter">
                        {foreach 1..$cols}
                            <th></th>
                        {/foreach}
                    </tr>
                </thead>
                <tbody>
                    {foreach $objects as $item}
                        {var $pk = $item->pk}
                        <tr data-pk="{$pk}">

                            <td class="checker">
                                <input type="checkbox" id="{$id}-{$pk}-check" name="ids[]" value="{$pk}">
                                <label for="{$id}-{$pk}-check" class="alone"></label>
                            </td>

                            {if $admin->sort}
                                <td class="sort">
                                    <a href="#" class="sort-handler">
                                        <i class="icon-double_triangle"></i>
                                    </a>
                                </td>
                            {/if}

                            {foreach $columns['enabled'] as $column}
                                {var $config = $columns['config'][$column]}
                                {var $template = $config['template']}

                                <td class="col">
                                    {include $template}
                                </td>
                            {/foreach}

                            <td class="actions">
                                {include $admin->listItemActionsTemplate}
                            </td>
                        </tr>
                    {foreachelse}
                        <tr class="empty">
                            <td colspan="{$cols}" class="text-center">
                                Пока здесь нет ни одной записи
                            </td>
                        </tr>
                    {/foreach}
                </tbody>
            </table>
            <div class="list-footer clearfix">
                <div class="list-footer-block v-align right total">
                    <div>
                        Всего записей: {$pagination->getTotal()}
                    </div>
                </div>

                <div class="list-footer-block v-align left group">
                    <div>
                        <div class="checker-wrapper">
                            <input type="checkbox" id="{$id}-check-all-bottom" data-checkall-list>
                            <label for="{$id}-check-all-bottom">
                                Для всех
                            </label>
                        </div>

                        {var $actions = $admin->getListGroupActions()}
                        {if ("update" in $actions) || ("remove" in $actions)}
                            <div class="group-buttons">
                                {if ("update" in $actions)}
                                    <a href="#" class="group-button">
                                        <i class="icon-edit"></i>
                                    </a>
                                {/if}

                                {if ("remove" in $actions)}
                                    <a href="#" class="group-button">
                                        <i class="icon-delete_in_table"></i>
                                    </a>
                                {/if}
                            </div>
                        {/if}

                        {var $dropdown = $admin->getListDropDownGroupActions()}
                        {if $dropdown}
                            <div class="dropdown-block">
                                <select name="" id="">
                                    <option value="" selected disabled>Выберите действие</option>
                                    {foreach $dropdown as $key => $item}
                                        <option value="{$key}">
                                            {$item['title']}
                                        </option>
                                    {/foreach}
                                </select>
                                <button class="button">
                                    <i class="icon-check_mark"></i>
                                </button>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>

            <div class="pagination-block">
                {raw $pagination->render($admin->listPaginationTemplate)}
            </div>
        </div>
    </div>
</div>

<script>
    $(function () {
        $('[data-id="{$id}-list"]').adminList({
            url: "{$.request->getUrl()}"
        });
    });
</script>