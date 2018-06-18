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

import { validatorValidateForm, validatorCleanErrors } from '../components/forms/validation';

$(() => {
  $(document).on('submit', '[data-ajax-form]', (e) => {
    e.preventDefault();
    const $form = $(this);
    const classes = $form.data('ajax-form').split(',');
    const successSelector = $form.data('success-selector');
    const $success = successSelector ? $(successSelector) : $form;
    const successTrigger = $form.data('success-trigger');

    $.ajax({
      url: $form.attr('action'),
      data: $form.serialize(),
      type: $form.attr('method'),
      dataType: 'json',
      success(data) {
        let errorsList = {};
        if (data.errors) {
          errorsList = data.errors;
        }
        Object.keys(classes).forEach((i) => {
          const cls = classes[i];
          if (errorsList[cls]) {
            validatorValidateForm(cls, errorsList[cls]);
          } else {
            validatorCleanErrors(cls);
          }
        });
        if (data.state === 'success') {
          $success.addClass('success');
          if (successTrigger) {
            $(document).trigger('success');
          }
        }
      },
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
