// Major Jackson Briggs forever in my heart

export default class Jax {
  constructor(action, type, json) {
    type = type || "GET";
    json = json || false;
    this.action = action || window.location.origin + window.location.pathname;
    this.type = type.toUpperCase();
    this.json = json;
    this.mutators = [];
  }

  mutate(mutator) {
    this.mutators.push(mutator);
  }

  send(formData) {
    return new Promise((resolve, reject) => {
      let action = this.action;
      if (this.type === 'GET') {
        if (formData) {
          let query = [];
          for (let pair of formData.entries()) {
            query.push(encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]));
          }
          let queryString = query.join('&');
          if (queryString) {
            action += (action.includes('?') ? '': '?') + queryString;
          }
        }
      }
      this.request = new XMLHttpRequest();
      this.request.open(this.type, action);
      this.mutators.forEach((mutator) => {
        mutator.call(this, this.request);
      });
      this.request.onload = () => {
        let data = this.request.responseText;
        if (this.json) {
          data = JSON.parse(data);
        }
        if (this.request.status >= 200 && this.request.status < 400) {
          resolve(data, this.request);
        } else {
          reject(data, this.request);
        }
      };
      this.request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      if (!(formData instanceof FormData) && typeof formData === 'object') {
        this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        formData = Object.keys(formData).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])
        }).join('&')
      }
      this.request.send(formData);
    });
  }
}