{foreach $form->getInitFields() as $name => $field}
    <div class="form-field {$name}">
        {raw $field->render()}
    </div>
{/foreach}