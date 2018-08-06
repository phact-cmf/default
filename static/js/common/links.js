$(() => {
  $(document).on('click', '[data-scroll-link], .scroll-link', function scrollLink(e) {
    e.preventDefault();
    const $link = $(this);
    let $target = null;
    if ($link.data('selector')) {
      $target = $($link.data('selector'));
    } else {
      const id = $link.attr('href');
      $target = $(id);
    }
    let offset = $link.data('offset');
    offset = offset || 0;
    if ($target.length) {
      $('body, html').animate({
        scrollTop: $target.offset().top - offset,
      }, 500);
    }
    return false;
  });

  $(document).on('click', '[data-toggle-link], .toggle-link', function toggleLink(e) {
    e.preventDefault();
    const $this = $(this);
    $($this.data('selector')).toggleClass($this.data('toggle'));
    return false;
  });
});
