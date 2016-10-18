$(function () {
    var flashOutTime = 5000;

    var $flashList = $('.flash-messages-block .flash-list');

    $(document).on('click', '.close-flash', function (e) {
        e.preventDefault();
        $(this).closest('li').fadeOut(400, function () {
            $(this).remove();
        });
        return false;
    });

    window.addFlashMessage = function (message, type) {
        type = type ? type : 'success';

        var $item = $('<li/>').addClass(type);
        var $closer = $('<a class="close-flash right"><i class="icon-delete_in_filter"></i></a>');
        var $text = $('<span/>').addClass('message').text(message);

        $item.append([$closer, $text]);
        $flashList.append($item);

        setTimeout(function () {
            if ($item && $item.length > 0) {
                $item.fadeOut(400, function () {
                    $(this).remove();
                });
            }
        }, flashOutTime);
    };
});