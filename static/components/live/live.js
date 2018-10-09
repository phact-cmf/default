export default class LiveEvent {
  static _eventRegistry = {};

  constructor(event, selector, handler) {
    if (!LiveEvent._eventRegistry[event]) {
      LiveEvent._eventRegistry[event] = [];
      document.documentElement.addEventListener(event, this.dispatchEvent, true);
    }
    LiveEvent._eventRegistry[event].push({
      selector: selector,
      handler: handler
    });
  }
  dispatchEvent(event) {
    let targetElement = event.target;

    LiveEvent._eventRegistry[event.type].forEach(function (entry) {
      let potentialElements = document.querySelectorAll(entry.selector);
      let hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
      if (!hasMatch) {
        for (let i = 0; i < potentialElements.length; ++i) {
          hasMatch = potentialElements[i].contains(targetElement);
          if (hasMatch) {
            targetElement = potentialElements[i];
            break;
          }
        }
      }
      if (hasMatch) {
        entry.handler.call(targetElement, event);
      }
    });
  }
}