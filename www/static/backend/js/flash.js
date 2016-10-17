$(function () {
    var flashOutTime = 5000;

    $(document).on('click', '.close-flash', function (e) {
        e.preventDefault();
        $(this).closest('li').fadeOut(400, function () {
            $(this).remove();
        });
        return false;
    });

    setTimeout(function () {
        $('.flash-messages-block').fadeOut(400, function () {
            $(this).remove();
        });
    }, flashOutTime);
});