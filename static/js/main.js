$(() => {
  $(document).on('click', 'a.modal', function openModal(e) {
    e.preventDefault();
    $(this).modal();
    return false;
  });
});
