$(() => {
  $(document).on('click', 'a.modal', (e) => {
    e.preventDefault();
    $(this).modal();
    return false;
  });
});
