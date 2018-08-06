window.respond = function (name, direction) {
  direction = direction ? direction : 'only';
  let $detector = $('<div/>').addClass(name +'-' + direction + '-show').css({
    'position': 'absolute',
    'left': '-9999px',
    'top': '-9999px',
    'width': '1px',
    'height': '1px'
  });
  $('body').append($detector);
  let visible = $detector.is(':visible');
  $detector.remove();
  return visible;
};