require('../components/modal/modal.js');

$(document).on('click', '[data-modal]', function openModal(e) {
  e.preventDefault();
  let $link = $(this);
  $link.modal({
    closerText: '',
    onFormSuccess: function () {
      if ($link.data('goal')) {
        window.goal($link.data('goal'));
      }
    }
  });
  return false;
});