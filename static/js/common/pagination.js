import LiveEvent from "../../components/live/live";
import Jax from "../../components/jax/jax";

new LiveEvent('click', '[data-endless-action]', function (e) {
  e.preventDefault();
  let key = this.closest('[data-pagination-nav]').dataset.paginationNav;
  if (!this.dataset.loading) {
    this.dataset.loading = "true";
    let jax = new Jax(this.getAttribute('href'));
    jax.send().then((html) => {
      let page = document.createElement('div');
      page.innerHTML = html;
      let newData = page.querySelector(`[data-pagination-data="${key}"]`);
      let currentData = document.querySelector(`[data-pagination-data="${key}"]`);

      Array.from(newData.children).forEach((child) => {
        currentData.appendChild(child);
      });

      this.dataset.loading = "";

      let newPagination = page.querySelector(`[data-pagination-nav="${key}"]`);
      let currentPagination = document.querySelector(`[data-pagination-nav="${key}"]`);

      currentPagination.parentNode.replaceChild(newPagination, currentPagination);

      let event = new Event('DOMContentMutated');
      document.dispatchEvent(event);
    })
  }
});