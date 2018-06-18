(function modal($) {
  const Modal = (element, options) => {
    return this.init(element, options);
  };

  Modal.prototype = {
    element: undefined,
    background: undefined,
    container: undefined,
    content: undefined,
    closer: undefined,

    escHandler: undefined,

    init(element, options) {
      const defaultOptions = {
        /*
                 animation: {
                 classIn: 'animation-in',
                 classOut: 'animation-out',
                 timeoutOut: 1000
                 },
                 */
        animation: null,
        preloader: true,
        theme: 'default',
        closerText: '×',

        fixWidth: true,
        width: undefined,

        closeOnClickBg: true,
        closeKeys: [27],

        closeOnSuccess: false,
        closeOnSuccessDelay: 2000,

        handleForm: true,
        useAjaxForm: false,

        onBeforeStart: $.noop,
        onAfterStart: $.noop,

        afterFormSubmit: $.noop,
        onFormSuccess: $.noop,
        onFormError: $.noop,
        onSubmit: 'default',

        onBeforeOpen: $.noop,
        onAfterOpen: $.noop,

        onBeforeClose: $.noop,
        onAfterClose: $.noop,

        classes: {
          content: 'modal-content',
          container: 'modal-container',
          background: 'modal-modal-bg',
          closer: 'modal-closer',
          body: 'modal-opened',
          loading: 'modal-loading',
          loader: 'modal-loader',
        },
      };

      this.element = element instanceof Object ? element : $(element);

      this.options = $.extend(defaultOptions, options);

      if (this.options.preloader) {
        if (!$('body').hasClass(this.options.classes.loading)) {
          this.showPreloader();
        } else {
          return false;
        }
      }

      if (this.element.is('a')) {
        this.startLink(this.element.attr('href'));
      } else {
        this.start(this.element.clone(true));
      }
      return this;
    },
    showPreloader() {
      const $preloader = $('<div/>').addClass(this.options.classes.loader);
      $('body').addClass(this.options.classes.loading).append($preloader);
    },
    hidePreloader() {
      $('body').removeClass(this.options.classes.loading).find(`.${this.options.classes.loader}`).remove();
    },
    setContent($html) {
      const $content = this.content;

      $content.html($html);
      if (this.options.handleForm && $content.find('form').not('[data-modal-handle-off]').length > 0) {
        const me = this;
        $content.find('form').not('[data-modal-handle-off]').off('submit').on('submit', function (e) {
          e.preventDefault();
          me.submit(this);
          return false;
        });
      }
    },
    render() {
      this.content = $('<div/>')
        .addClass(this.options.classes.content);

      this.closer = $('<a href="javascript:void(0)"/>')
        .html(this.options.closerText)
        .addClass(this.options.classes.closer);

      this.container = $('<div/>')
        .addClass(this.options.classes.container)
        .addClass(this.options.theme);

      this.container.append(this.closer)
        .append(this.content);

      this.background = $('<div/>')
        .addClass(this.options.classes.background)
        .addClass(this.options.theme)
        .append(this.container)
        .appendTo('body');
    },
    startLink(link) {
      const me = this;
      if (link.match(/^#/)) {
        this.start($(link).clone(true));
      } else {
        $.ajax({
          url: link,
          cache: false,
          success(data, textStatus, jqXHR) {
            me.start(data);
          },
          error(jqXHR, textStatus, errorThrown) {
            me.start(jqXHR.responseText);
          },
        });
      }
    },
    submit(form) {
      if (typeof this.options.onSubmit === 'function') {
        this.options.onSubmit.call(this, form);
      } else {
        this.onSubmitDefault(form);
      }
    },
    onSubmitDefault(form) {
      const $form = $(form);
      let type = $form.attr('method');
      if (!type) {
        type = 'post';
      }

      if (this.options.useAjaxForm) {
        $form.ajaxSubmit({
          type,
          success: this.getHandleFormResponse(),
        });
      } else if ($form.find("input[type='file']").length > 0) {
        const formData = new FormData();
        $.each($form.find("input[type='file']"), (i, tag) => {
          $.each($(tag)[0].files, (i, file) => {
            formData.append(tag.name, file);
          });
        });
        const params = $form.serializeArray();
        $.each(params, (i, val) => {
          formData.append(val.name, val.value);
        });
        $.ajax({
          url: $form.attr('action'),
          type,
          data: formData,
          success: this.getHandleFormResponse(),
          processData: false,
          cache: false,
          contentType: false,
        });
      } else {
        $.ajax({
          url: $form.attr('action'),
          type,
          data: $form.serialize(),
          success: this.getHandleFormResponse(),
        });
      }
    },
    getHandleFormResponse() {
      const me = this;
      const opts = this.options;

      return (data, textStatus, jqXHR) => {
        if (!data) {
          me.close();
        }

        let response = data;
        let jsonResponse = false;
        let success = false;

        if (typeof data === 'object') {
          jsonResponse = true;
        } else {
          try {
            response = $.parseJSON(response);
            jsonResponse = true;
          } catch (e) {
            jsonResponse = false;
          }
        }

        opts.afterFormSubmit.call(this, data, textStatus, jqXHR);

        if (jsonResponse) {
          if (response.close) {
            return me.close();
          }
          if (response.content) {
            me.setContent(response.content);
          }
          if (response.status === 'success') {
            success = true;
          }
        } else {
          me.setContent(response);
          success = me.content.find('form').length === 0 || me.content.find('[data-modal-success]').length > 0;
        }

        if (success) {
          opts.onFormSuccess.call(this, data, textStatus, jqXHR);

          if (opts.closeOnSuccess !== false) {
            setTimeout(() => me.close(), opts.closeOnSuccessDelay);
          }
        } else {
          opts.onFormError.call(this, data, textStatus, jqXHR);
        }
      };
    },
    hasAnotherModal() {
      return $(`.${this.options.classes.background}`).not(this.background).length > 0;
    },
    isLastModal() {
      return this.background;
    },
    start(html) {
      this.options.onBeforeStart();
      this.render();
      this.setContent(html);
      this.bindEvents();
      this.open();
      this.options.onAfterStart();
    },
    open() {
      const $body = $('body');
      const before = $body.outerWidth();

      this.options.onBeforeOpen();
      if (this.options.preloader) {
        this.hidePreloader();
      }
      this.background.show();
      if (this.options.fixWidth) {
        this.container.css('width', this.options.width || this.container.width());
      }
      this.container.show();

      if (!this.hasAnotherModal()) {
        $body.css({
          overflow: 'hidden',
          'padding-right': $body.outerWidth() - before,
        }).addClass(this.options.classes.body);
      }

      this.options.onAfterOpen();
    },
    close() {
      this.unbindEvents();
      this.options.onBeforeClose();

      if (this.options.animation) {
        this.container.addClass(this.options.animation.classOut);
        const me = this;
        setTimeout(() => {
          me.background.remove();
        }, this.options.animation.timeoutOut);
      } else {
        this.background.remove();
      }

      if (!this.hasAnotherModal()) {
        $('body').css({
          overflow: '',
          'padding-right': '',
        }).removeClass(this.options.classes.body);
      }

      this.options.onAfterClose();
    },
    bindEvents() {
      const me = this;
      const opts = this.options;

      this.closer.on('click', (e) => {
        e.preventDefault();
        me.close();
        return false;
      });

      if (opts.closeOnClickBg === true) {
        this.background.on('click', (e) => {
          // Close only if bg == target element
          if (e.target === this) {
            e.preventDefault();
            me.close();
            return false;
          }
          return e;
        });
      }

      if (opts.closeKeys.length > 0) {
        this.escHandler = function (e) {
          if ($.inArray(e.which, opts.closeKeys) !== -1) {
            if ($(`.${me.options.classes.background}:last`).is(me.background)) {
              me.close();
            }
          }
        };
        $(document).on('keyup', this.escHandler);
      }
    },
    unbindEvents() {
      this.closer.off('click');
      this.background.off('click');

      if (this.options.closeKeys.length > 0) {
        $(document).off('keyup', this.escHandler);
      }
    },
  };

  $.fn.modal = (options) => {
    return new Modal(this, options);
  };
})(jQuery);
