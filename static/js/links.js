$(() => {
  $(document).on('click', '[data-scroll-link], .scroll-link', (e) => {
    e.preventDefault();
    const id = $(this).attr('href');
    const $target = $(id);
    let offset = $(this).data('offset');
    offset = offset || 0;
    if ($target.length) {
      $('body, html').animate({
        scrollTop: $target.offset().top - offset,
      }, 500);
    }
    return false;
  });

  $(document).on('click', '[data-toggle-link], .toggle-link', (e) => {
    e.preventDefault();
    const $this = $(this);
    $($this.data('selector')).toggleClass($this.data('toggle'));
    return false;
  });

  $(document).on('click', '[data-first-link-click], .first-link-click', (e) => {
    if ($(e.target).closest('a').length) {
      return e;
    }
    const $this = $(this);
    const $link = $this.find('a').first();

    if ($link.hasClass('mmodal')) {
      $link.click();
    } else {
      window.location.href = $link.attr('href');
    }
    return false;
  });
});
