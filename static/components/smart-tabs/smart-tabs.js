import LiveEvent from "../live/live";

new LiveEvent('click', '.smart-tabs li a', function smartTab(e) {
  let button = this;
  if (button.tagName === 'A') {
    e.preventDefault();
  }

  let selector = button.dataset.tab;
  if (!selector && button.getAttribute('href')) {
    selector = button.getAttribute('href');
  }

  let tab = document.querySelector(selector);
  if (tab) {
    tab.parentNode.querySelectorAll(".smart-content").forEach((item) => { item.classList.remove('active') });
    tab.classList.add('active');
  }
  button.closest('.smart-tabs').querySelectorAll('li').forEach((item) => { item.classList.remove('active') });
  button.closest('li').classList.add('active');

  let event = new CustomEvent('smart-tabs-handle', {'detail': {'button': button, 'tab': tab}});
  document.dispatchEvent(event);
});