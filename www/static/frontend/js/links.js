$(function(){
    $(document).on('click', '[data-scroll-link], .scroll-link', function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        var $target = $(id);
        var offset = $(this).data('offset');
        offset = offset ? offset : 0;
        if ($target.length) {
            $('body, html').animate({
                scrollTop: $target.offset().top - offset
            }, 500);
        }
        return false;
    });

    $(document).on('click', '[data-toggle-link], .toggle-link', function(e){
        e.preventDefault();
        var $this = $(this);
        $($this.data('selector')).toggleClass($this.data('toggle'));
        return false;
    });

    $(document).on('click', '[data-first-link-click], .first-link-click', function(e){
        if ($(e.target).closest('a').length){
            return e;
        }else{
            var $this = $(this),
                $link = $this.find('a').first();

            if ($link.hasClass('mmodal')) {
                $link.click();
            } else {
                window.location.href = $link.attr('href');
            }
        }
    });
});