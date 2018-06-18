function validatorCleanErrors(formname) {
  $(`.errors[id^='${formname}']`).html('').css({ display: 'none' });
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

function validatorValidateForm(formname, errors) {
  validatorCleanErrors(formname);
  const errorsList = validatorCollectErrors(formname, errors);
  Object.keys(errorsList).forEach((name) => {
    const errorsName = name.replace(/\[/g, '_').replace(/\]/g, '');
    const $errors = $(`#${errorsName}_errors`);
    const errorsItems = errorsList[name];
    errorsItems.forEach((error) => {
      $errors.css({ display: '' });
      $errors.append($('<li/>').text(error));
    });
  });
}

export {
  validatorValidateForm,
  validatorCollectErrors,
  validatorCleanErrors,
};
