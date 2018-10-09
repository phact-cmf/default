window.respond = function (name, direction) {
  direction = direction ? direction : 'only';

  let detector = document.createElement('div');
  detector.classList.add(name +'-' + direction + '-show');
  detector.style.position = 'absolute';
  detector.style.left = '-9999px';
  detector.style.top = '-9999px';
  detector.style.width = '1px';
  detector.style.height = '1px';
  document.body.appendChild(detector);

  let visible = el.offsetParent !== null;
  document.body.removeChild(detector);

  return visible;
};