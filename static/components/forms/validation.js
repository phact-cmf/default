function validatorCleanErrors(form, formname) {
  form.querySelectorAll(`.errors[id^='${formname}'], .errors[id*='_${formname}_']`).forEach((element) => {
    element.innerHTML = "";
    element.style.display = "none";
  });
}

function validatorCollectErrors(namespace, errors) {
  const result = {};
  Object.keys(errors).forEach((name) => {
    const joined = `${namespace}[${name}]`;
    if (errors[name] instanceof Array) {
      result[joined] = errors[name];
    } else {
      const innerResult = validatorCollectErrors(joined, errors[name]);
      Object.keys(innerResult).forEach((innerName) => {
        result[innerName] = innerResult[innerName];
      });
    }
  });
  return result;
}

function validatorValidateForm(form, formname, errors) {
  validatorCleanErrors(form, formname);
  const errorsList = validatorCollectErrors(formname, errors);
  Object.keys(errorsList).forEach((name) => {
    const errorsName = name.replace(/\[/g, '_').replace(/\]/g, '');
    const errors = form.querySelector(`[id$='${errorsName}_errors']`);
    const errorsItems = errorsList[name];
    errorsItems.forEach((error) => {
      errors.style.display = '';
      let listItem = document.createElement('li');
      listItem.innerText = error;
      errors.appendChild(listItem)
    });
  });
}

export {
  validatorValidateForm,
  validatorCollectErrors,
  validatorCleanErrors,
};