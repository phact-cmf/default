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

import { validatorValidateForm, validatorCleanErrors } from '../../components/forms/validation';
import LiveEvent from "../../components/live/live";
import Jax from "../../components/jax/jax";

new LiveEvent('submit', '[data-ajax-form]', function submitAjax(e) {
  e.preventDefault();
  const classes = this.dataset.ajaxForm.split(',');
  const successSelector = this.dataset.successSelector;
  const success = successSelector ? document.querySelector(successSelector) : this;
  const successTrigger = this.dataset.successTrigger;

  const jax = new Jax(this.getAttribute('action'), this.getAttribute('method'), true);
  jax.send(new FormData(this)).then((data, xhr) => {
    let errorsList = {};
    if (data.errors) {
      errorsList = data.errors;
    }
    Object.keys(classes).forEach((i) => {
      const cls = classes[i];
      if (errorsList[cls]) {
        validatorValidateForm(this, cls, errorsList[cls]);
      } else {
        validatorCleanErrors(this, cls);
      }
    });
    if (data.state === 'success') {
      success.classList.add('success');
      if (successTrigger) {
        document.dispatchEvent(new CustomEvent('ajax-form-success', {'detail': {'form': this}}));
      }
      if (this.dataset.goal) {
        window.goal(this.dataset.goal);
      }
      setTimeout(() => {
        this.reset();
        document.dispatchEvent(new CustomEvent('success', {'detail': {'form': this}}));
        success.classList.remove('success');
      }, 3000);
    }
  })
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
