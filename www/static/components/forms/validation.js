function validator_validate_form(formname, errors) {
    validator_clean_errors(formname);
    var errorsList = validator_collect_errors(formname, errors);
    for (var name in errorsList) {
        var errorsName = name.replace(/\[/g, "_").replace(/\]/g, "");
        var $errors = $('#' + errorsName + '_errors');
        var errorsItems = errorsList[name];
        errorsItems.forEach(function(error){
            $errors.css({'display': ''});
            $errors.append($('<li/>').text(error));
        });
    }
}

function validator_collect_errors(namespace, errors)
{
    var result = {};
    for (var name in errors) {
        var joined = namespace + "[" + name + "]";
        if (errors[name] instanceof Array) {
            result[joined] = errors[name];
        } else {
            var innerResult = validator_collect_errors(joined, errors[name]);
            for (var innerName in innerResult) {
                var innerErrors = innerResult[innerName];
                result[innerName] = innerErrors;
            }
        }
    }
    return result;
}

function validator_clean_errors(formname) {
    $( ".errors[id^='" + formname + "']" ).html("").css({'display': 'none'});
}