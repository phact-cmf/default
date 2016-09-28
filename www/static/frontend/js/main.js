$(function() {
    $(document).on('click', 'a.modal', function(e){
        e.preventDefault();
        $(this).modal();
        return false;
    });
});