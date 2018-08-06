let XHRListener = {
  orig_send: XMLHttpRequest.prototype.send
};

XMLHttpRequest.prototype.send = function(data) {
  if (XHRListener.onXHRComplete) {
    let orig_cb = this.onreadystatechange;
    this.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE) {
        XHRListener.onXHRComplete(this.response, this);
      }
      if (orig_cb) {
        orig_cb();
      }
    }
  }
  XHRListener.orig_send.apply(this, arguments);
};

XHRListener.onXHRComplete = function (data, xhr) {
  if (xhr.status == 278) {
    let location = xhr.getResponseHeader("Location");
    if (location) {
      window.location.href = xhr.getResponseHeader("Location");
    }
  }

  try {
    xhr.responseJSON = JSON.parse(data);
  } catch (e) {}

  if (xhr.responseJSON && xhr.responseJSON.redirect) {
    window.location.href = xhr.responseJSON.redirect;
  }
};