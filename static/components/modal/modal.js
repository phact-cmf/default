(function ($) {
  let modal = function (element, options) {
    return this.init(element, options);
  };

  modal.prototype = {
    element: undefined,
    background: undefined,
    layout: undefined,
    container: undefined,
    content: undefined,
    closer: undefined,

    escHandler: undefined,

    init: function (element, options) {
      let defaultOptions = {
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

      this.element = element instanceof Object ? element : $(element);

      this.options = $.extend(defaultOptions, options);

      if (this.options.preloader) {
        if (!$('body').hasClass(this.options.classes.loading)) {
          this.showPreloader();
        } else {
          return false;
        }
      }

      if (this.element.is("a")) {
        this.startLink(this.element.attr('href'));
      } else {
        this.start(this.element.clone(true));
      }
      return this;
    },
    showPreloader: function(){
      let $preloader = $('<div/>').addClass(this.options.classes.loader);
      $('body').addClass(this.options.classes.loading).append($preloader);
    },
    hidePreloader: function(){
      $('body').removeClass(this.options.classes.loading).find('.' + this.options.classes.loader).remove();
    },
    setContent: function ($html) {
      let $content = this.content;

      $content.html($html);
      if (this.options.handleForm && $content.find('form').not('[data-modal-handle-off]').length > 0) {
        let me = this;
        $content.find("form").not('[data-modal-handle-off]').off("submit").on("submit", function (e) {
          e.preventDefault();
          me.submit(this);
          return false;
        });
      }
    },
    render: function () {
      this.content = $('<div/>')
        .addClass(this.options.classes.content);

      this.layout = $('<div/>')
        .addClass(this.options.classes.layout);

      this.closer = $('<a href="javascript:void(0)"/>')
        .html(this.options.closerText)
        .addClass(this.options.classes.closer);

      this.container = $('<div/>')
        .addClass(this.options.classes.container)
        .addClass(this.options.theme);

      this.container
        .append(this.closer)
        .append(this.content);

      this.layout.append(this.container);

      this.background = $("<div/>")
        .addClass(this.options.classes.background)
        .addClass(this.options.theme)
        .append(this.layout)
        .appendTo('body');
    },
    startLink: function (link) {
      let me = this;
      if (link.match(/^#/)) {
        this.start($(link).clone(true));
      } else {
        $.ajax({
          url: link,
          cache: false,
          success: function (data, textStatus, jqXHR) {
            me.start(data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            me.start(jqXHR.responseText);
          }
        });
      }
    },
    submit: function (form) {
      if (typeof this.options.onSubmit == 'function') {
        this.options.onSubmit.call(this, form);
      } else {
        this.onSubmitDefault(form);
      }
    },
    onSubmitDefault: function (form) {
      let $form = $(form);
      let options = this.options;
      let type = $form.attr('method');
      if (!type) {
        type = 'post';
      }

      if (this.options.useAjaxForm) {
        $form.ajaxSubmit({
          type: type,
          success: this.getHandleFormResponse()
        });
      } else {
        $.ajax({
          url: $form.attr('action'),
          type: type,
          data: $form.serialize(),
          success: this.getHandleFormResponse()
        })
      }
    },
    getHandleFormResponse: function() {
      let me = this,
        options = this.options;

      return function(data, textStatus, jqXHR) {
        if (!data) {
          me.close();
        }

        let jsonResponse = false;
        let success = false;

        if (typeof data === "object") {
          jsonResponse = true;
        } else {
          try {
            data = $.parseJSON(data);
            jsonResponse = true;
          } catch (e) {}
        }

        options.afterFormSubmit.call(this, data, textStatus, jqXHR);

        if (jsonResponse) {
          if (data.close){
            return me.close();
          }
          if (data.content) {
            me.setContent(data.content);
          }
          if (data.status === 'success') {
            success = true;
          }
        } else {
          me.setContent(data);
          success = me.content.find('form').length == 0 || me.content.find('[data-modal-success]').length > 0;
        }

        if (success) {
          options.onFormSuccess.call(this, data, textStatus, jqXHR);

          if (options.closeOnSuccess !== false) {
            setTimeout(function () {
              return me.close();
            }, options.closeOnSuccessDelay);
          }
        } else {
          options.onFormError.call(this, data, textStatus, jqXHR);
        }
      }
    },
    hasAnotherModal: function () {
      return $('.' + this.options.classes.background).not(this.background).length > 0;
    },
    isLastModal: function () {
      return this.background;
    },
    start: function (html) {
      this.options.onBeforeStart();
      this.render();
      this.setContent(html);
      this.bindEvents();
      this.open();
      this.options.onAfterStart();
    },
    open: function () {
      let $body = $('body'),
        before = $body.outerWidth();

      this.options.onBeforeOpen();
      if (this.options.preloader) {
        this.hidePreloader();
      }
      this.background.addClass('opened');
      if (this.options.fixWidth) {
        this.layout.css('width', this.options.width || this.layout.width());
      }
      this.layout.addClass('opened');

      if (!this.hasAnotherModal()) {
        $body.css({
          'overflow': 'hidden',
          'padding-right': $body.outerWidth() - before
        }).addClass(this.options.classes.body);
      }

      this.options.onAfterOpen();
    },
    close: function () {
      this.unbindEvents();
      this.options.onBeforeClose();

      if (this.options.animation) {
        this.container.addClass(this.options.animation.classOut);
        let me = this;
        setTimeout(function () {
          me.background.remove();
        }, this.options.animation.timeoutOut);
      } else {
        this.background.remove();
      }

      if (!this.hasAnotherModal()) {
        $('body').css({
          'overflow': '',
          'padding-right': ''
        }).removeClass(this.options.classes.body);
      }

      this.options.onAfterClose();
    },
    bindEvents: function () {
      let me = this, options = this.options;

      this.closer.on('click', function (e) {
        e.preventDefault();
        me.close();
        return false;
      });

      if (options.closeOnClickBg == true) {
        this.background.on('click', function (e) {
          // Close only if bg == target element
          if (e.target === this) {
            e.preventDefault();
            me.close();
            return false;
          }
        });
      }

      if (options.closeKeys.length > 0) {
        this.escHandler = function (e) {
          if ($.inArray(e.which, options.closeKeys) !== -1) {
            if ($('.' + me.options.classes.background + ':last').is(me.background)) {
              me.close();
            }
          }
        };
        $(document).on('keyup', this.escHandler);
      }
    },
    unbindEvents: function() {
      this.closer.off('click');
      this.background.off('click');

      if (this.options.closeKeys.length > 0) {
        $(document).off('keyup', this.escHandler);
      }
    }
  };

  $.fn.modal = function (options) {
    return new modal(this, options);
  };
})(jQuery);