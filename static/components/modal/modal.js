export default class Modal {
  constructor(element, options) {
    this.options = {
      animation: null,
      preloader: true,
      theme: 'default',
      closerText: '×',

      width: undefined,

      closeOnClickBg: true,
      closeKeys: [27],

      closeOnSuccess: true,
      closeOnSuccessDelay: 2000,

      handleForm: true,
      useAjaxForm: false,

      onBeforeStart: () => {
      },
      onAfterStart: () => {
      },

      afterFormSubmit: () => {
      },
      onFormSuccess: () => {
      },
      onFormError: () => {
      },
      onSubmit: 'default',

      onBeforeOpen: () => {
      },
      onAfterOpen: () => {
      },

      onBeforeClose: () => {
      },
      onAfterClose: () => {
      },

      classes: {
        layout: 'modal__layout',
        container: 'modal__container',
        content: 'modal__content',
        background: 'modal__bg',
        closer: 'modal__closer',
        loader: 'modal__loader',

        body: 'modal-opened',
        loading: 'modal-loading'
      }
    };

    this.escHandler = undefined;
    this.closerHandler = undefined;
    this.closeBgHandler = undefined;

    this.options = Object.assign({}, this.options, options);
    this.element = element;
    this.go();
    this.active = true;
    return this;
  }

  go() {
    if (this.options.preloader) {
      if (!document.body.classList.contains(this.options.classes.loading)) {
        this.showPreLoader();
      } else {
        return false;
      }
    }
    if (this.element.tagName === "A") {
      this.startLink(this.element.getAttribute('href'));
    } else {
      this.start(this.element.clone(true));
    }
    return this;
  }

  showPreLoader() {
    let preLoader = document.createElement('div');
    preLoader.classList.add(this.options.classes.loader);
    document.body.classList.add(this.options.classes.loading);
    document.body.appendChild(preLoader);
  }

  hidePreLoader() {
    document.body.classList.remove(this.options.classes.loading);
    document.querySelectorAll('.' + this.options.classes.loader).forEach((element) => {
      element.remove();
    });
  }

  setContent(html) {
    this.content.innerHTML = html;
    this.evalScripts();

    let event = new Event('DOMContentMutated');
    document.dispatchEvent(event);

    const forms = this.content.querySelectorAll('form:not([data-modal-handle-off])');
    if (this.options.handleForm && forms.length > 0) {
      forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.submit(form);
          return false;
        })
      });
    }
  }

  evalScripts() {
    this.content.querySelectorAll('script[type="text/javascript"], script:not([type])').forEach((script) => {
      let text = ( script.text || script.textContent || script.innerHTML || "" );
      const head = document.querySelector('head') || document.documentElement;

      let scriptNode = document.createElement("script");
      scriptNode.type = "text/javascript";
      scriptNode.appendChild(document.createTextNode(text));
      head.appendChild(scriptNode);
      head.removeChild(scriptNode);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
  }

  render() {
    this.content = document.createElement('div');
    this.content.classList.add(this.options.classes.content);

    this.closer = document.createElement('a');
    this.closer.setAttribute('href', 'javascript:void(0)');
    this.closer.innerHTML = this.options.closerText;
    this.closer.classList.add(this.options.classes.closer);

    this.container = document.createElement('div');
    this.container.classList.add(this.options.classes.container);
    this.container.classList.add(this.options.theme);
    this.container.appendChild(this.closer);
    this.container.appendChild(this.content);

    this.layout = document.createElement('div');
    this.layout.classList.add(this.options.classes.layout);
    this.layout.appendChild(this.container);

    this.background = document.createElement('div');
    this.background.classList.add(this.options.classes.background);
    this.background.classList.add(this.options.theme);
    this.background.appendChild(this.layout);

    document.body.appendChild(this.background);
  }

  startLink(link) {
    if (link.match(/^#/)) {
      const data = document.querySelector(link);
      if (data) {
        this.start(data.cloneNode(true));
      }
    } else {
      const request = new XMLHttpRequest();
      request.open('GET', link);
      request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      request.onload = () => {
        this.start(request.responseText);
      };
      request.send();
    }
  }

  submit(form) {
    if (typeof this.options.onSubmit === 'function') {
      this.options.onSubmit.call(this, form);
    } else {
      this.onSubmitDefault(form);
    }
  }

  onSubmitDefault(form) {
    let type = form.getAttribute('method');
    if (!type) {
      type = 'post';
    }
    type = type.toUpperCase();
    let formData = new FormData(form);
    let action = form.getAttribute('action');
    if (type === 'GET') {
      let query = [];
      for (let pair of formData.entries()) {
        query.push(encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]));
      }
      let queryString = query.join('&');
      if (queryString) {
        action += (action.includes('?') ? '': '?') + queryString;
      }
    }

    const request = new XMLHttpRequest();
    request.open(type, action);
    request.onload = () => {
      this.getHandleFormResponse(request);
    };
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.send(formData);
  }

  /**
   * @param request XMLHttpRequest
   */
  getHandleFormResponse(request) {
    let data = request.responseText;
    let jsonResponse = false;
    let success = false;

    if (typeof data === "object") {
      jsonResponse = true;
    } else {
      try {
        data = JSON.parse(data);
        jsonResponse = true;
      } catch (e) {
      }
    }

    this.options.afterFormSubmit.call(this, data, request);

    if (jsonResponse) {
      if (data.close) {
        return this.close();
      }
      if (data.content) {
        this.setContent(data.content);
      }
      if (data.status === 'success') {
        success = true;
      }
    } else {
      this.setContent(data);
      if (this.content.querySelectorAll('form').length === 0
        || this.content.querySelectorAll('[data-modal-success]').length > 0) {
        success = true
      }
    }

    if (success) {
      this.options.onFormSuccess.call(this, data, request);

      if (this.options.closeOnSuccess !== false) {
        setTimeout(() => {
          return this.close();
        }, this.options.closeOnSuccessDelay);
      }
    } else {
      this.options.onFormError.call(this, data, request);
    }
  }

  hasAnotherModal() {
    let modals = 0;
    document.querySelectorAll('.' + this.options.classes.background).forEach((item) => {
      if (item !== this.background) {
        modals++;
      }
    });
    return modals > 0;
  }

  isLastModal() {
    return this.background;
  }

  start(html) {
    this.options.onBeforeStart();
    this.render();
    this.setContent(html);
    this.bindEvents();
    this.open();
    this.options.onAfterStart();
  }

  open() {
    let bodyWidth = document.body.offsetWidth;

    this.options.onBeforeOpen();
    if (this.options.preloader) {
      this.hidePreLoader();
    }
    this.background.classList.add('opened');
    this.layout.classList.add('opened');

    if (!this.hasAnotherModal()) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = (document.body.offsetWidth - bodyWidth) + 'px';
      document.body.classList.add(this.options.classes.body);
    }

    this.options.onAfterOpen();
  }

  close() {
    if (!this.active) {
      return false;
    }
    this.unbindEvents();
    this.options.onBeforeClose();

    if (this.options.animation) {
      this.container.classList.add(this.options.animation.classOut);
      setTimeout(() => {
        this.background.parentNode.removeChild(this.background);
      }, this.options.animation.timeoutOut);
    } else {
      this.background.parentNode.removeChild(this.background);
    }

    if (!this.hasAnotherModal()) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.classList.remove(this.options.classes.body);
    }
    this.options.onAfterClose();
    this.active = false;
  }

  bindEvents() {
    this.closerHandler = (e) => {
      e.preventDefault();
      this.close();
      return false;
    };
    this.closer.addEventListener('click', this.closerHandler);
    if (this.options.closeOnClickBg === true) {
      this.closeBgHandler = (e) => {
        if (e.target === this.layout || e.target === this.background) {
          e.preventDefault();
          this.close();
          return false;
        }
      };
      this.background.addEventListener('click', this.closeBgHandler);
    }

    if (this.options.closeKeys.length > 0) {
      this.escHandler = (e) => {
        if (this.options.closeKeys.includes(e.which)) {
          if (document.querySelector('.' + this.options.classes.background + ':last-of-type') === this.background) {
            this.close();
          }
        }
      };
      document.addEventListener('keyup', this.escHandler);
    }
  }

  unbindEvents() {
    this.closer.removeEventListener('click', this.closerHandler);
    this.background.removeEventListener('click', this.closeBgHandler);

    if (this.options.closeKeys.length > 0) {
      document.removeEventListener('keyup', this.escHandler);
    }
  }
}