{var $fieldsets = $admin->getFormFieldsets()}
{if $fieldsets}
    {foreach $fieldsets as $name => $fieldsNames}
        <fieldset>
            <div class="fieldset-title">
                {$name}
            </div>
            {foreach $fieldsNames as $fieldName}
                <div class="form-field {$fieldName}">
                    {var $field = $form->getField($fieldName)}
                    {raw $field->render()}
                </div>
            {/foreach}
        </fieldset>
    {/foreach}
{else}
    <fieldset>
        <div class="fieldset-title">
            Тестовый филдсет
        </div>
        {var $fields = $form->getInitFields()}
        {foreach $fields as $field}
            <div class="form-field {$field->name}">
                {raw $field->render()}
            </div>
        {/foreach}
    </fieldset>
{/if}