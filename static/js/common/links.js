import LiveEvent from "../../components/live/live";
import zenscroll from "zenscroll";
zenscroll.setup(null, 0);

new LiveEvent('click', '[data-scroll-link], .scroll-link', function scrollLink(e) {
  e.preventDefault();
  let target = null;
  if (this.dataset.selector) {
    target = document.querySelector(this.dataset.selector);
  } else {
    target = document.querySelector(this.getAttribute('href'));
  }
  let offset = this.dataset.offset || 0;
  if (target) {
    let viewportOffset = target.getBoundingClientRect();
    let top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
    zenscroll.toY(top + viewportOffset.top + offset, 500);
  }
});

new LiveEvent('click', '[data-toggle-link], .toggle-link', function toggleLink(e) {
  e.preventDefault();
  let target = document.querySelector(this.dataset.selector);
  target.classList.toggle(this.dataset.toggle);
});