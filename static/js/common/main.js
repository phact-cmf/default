import LiveEvent from "../../components/live/live";
import Modal from "../../components/modal/modal";

new LiveEvent('click', '[data-modal]', function openModal(e) {
  e.preventDefault();
  let link = this;
  let modal = new Modal(this, {
    closerText: '',
    onFormSuccess: function () {
      if (link.dataset.goal) {
        window.goal(link.dataset.goal);
      }
    }
  });
  return false;
});