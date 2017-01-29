/**
 *  Можно указать селектор к которому применится класс 'success' после успешной обработки формы
 *  По-умолчанию класс 'success' добавится непосредственно форме
 *
 *  data-success-selector=".success-holder"
 *
 *  <form action="{% url 'namespace:route' %}" method="post" data-ajax-form="ContactForm">
 *      ...
 *  </form>
 */
$(function(){
    $(document).on('submit', '[data-ajax-form]', function(e){
        e.preventDefault();
        var $form = $(this);
        var classes = $form.data('ajax-form').split(',');
        var successSelector = $form.data('success-selector');
        var $success = successSelector ? $(successSelector) : $form;
        var successFunc = $form.data('success');

        $.ajax({
            url: $form.attr('action'),
            data: $form.serialize(),
            type: $form.attr('method'),
            dataType: 'json',
            success: function(data) {
                var errors = {};
                if (data.errors) {
                    errors = data.errors;
                }
                for(var i in classes) {
                    var cls = classes[i];
                    if (errors[cls]) {
                        validator_validate_form(cls, data.errors[cls]);
                    } else {
                        validator_clean_errors(cls);
                    }
                }
                if (data.state == 'success') {
                    $success.addClass('success');
                    if (successFunc) {
                        eval(successFunc);
                    }
                }
            }
        });

        return false;
    });
});

/**
 Пример action:

 public function contact()
 {
     if (!$this->request->getIsAjax() || !$this->request->getIsPost()) {
            $this->error(404);
        }
        $form = new RequestForm();
        $data = [
            'state' => 'success'
        ];
        if (!($form->fill($_POST) && $form->valid && $form->send())) {
            $data = [
                'state' => 'error',
                'errors' => [
                    $form->classNameShort() => $form->getErrors()
                ]
            ];
        }
        echo json_encode($data);
 }

 */