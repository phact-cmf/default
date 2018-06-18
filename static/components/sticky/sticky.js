(function ($) {
  var psticky = function () {
    return psticky.init.apply(this, arguments);
  };
  $.extend(psticky, {
    options: {
      top: undefined,
      bottom: undefined,
      parent: 'parent',
      width: undefined,
      dimension: 'top',
      offset: false,
      fixParentHeight: false,
    },
    element: undefined,
    initOffset: 0,
    init(element, options) {
      if (element === undefined || !element.length) return;
      this.element = $(element);
      this.options = $.extend(this.options, options, this.element.data());
      this.options.width = this.options.width ? this.options.width : this.element.width();
      this.parent = this.options.parent == 'parent' ? this.element.parent() : this.element.closest(this.options.parent);
      this.element.css({ width: this.options.width });
      this.element.addClass(`psticky-dimension-${this.options.dimension}`);
      if (this.options.fixParentHeight) {
        const parent = this.element.parent();
        parent.css({ height: parent.height() });
      }
      this.initOffset = this.element.offset().top - this.parent.offset().top;
      this.bind();
      $(window).trigger('scroll');
      return this;
    },
    bind() {
      const me = this;

      const stickyBottom = this.element.offset().top + this.element.height();
      const parentBottom = this.parent.offset().top + this.parent.height();

      if (stickyBottom < parentBottom) {
        $(window).on('scroll', (e) => {
          me.handle();
        });
      }
    },
    handle() {
      const top = $(window).scrollTop();
      const height = $(window).height();
      const offset = this.parent.offset().top;
      const parentHeight = this.parent.outerHeight();
      const elementHeight = this.element.outerHeight();
      const elementOffset = this.options.top;
      let totalOffset = offset - elementOffset;
      if (this.options.offset) {
        totalOffset += this.initOffset;
      }

      if (this.options.dimension == 'top') {
        if (top > totalOffset) {
          console.log(elementHeight);
          if (offset + parentHeight > top + elementOffset + elementHeight) {
            // Sticky
            this.setStickyT();
          } else {
            // bottom
            this.setBottomT();
          }
        } else {
          this.setTopT();
        }
      } else if (top + height < offset + parentHeight) {
        if (top + height > offset + elementHeight) {
          this.setStickyB();
        } else {
          this.setTopB();
        }
      } else {
        this.setBottomB();
      }
    },
    setStickyT() {
      if (!this.element.hasClass('psticky-sticky')) {
        this.clean();
        this.element.addClass('psticky-sticky');
        this.element.css({
          top: this.options.top,
        });
      }
    },
    setTopT() {
      if (!this.element.hasClass('psticky-top')) {
        this.clean();
        this.element.addClass('psticky-top');
      }
    },
    setBottomT() {
      if (!this.element.hasClass('psticky-bottom')) {
        this.clean();
        this.element.addClass('psticky-bottom');
      }
    },
    setStickyB() {
      if (!this.element.hasClass('psticky-sticky')) {
        this.clean();
        this.element.addClass('psticky-sticky');
        this.element.css({
          bottom: this.options.bottom,
        });
      }
    },
    setTopB() {
      if (!this.element.hasClass('psticky-top')) {
        this.clean();
        this.element.addClass('psticky-top');
      }
    },
    setBottomB() {
      if (!this.element.hasClass('psticky-bottom')) {
        this.clean();
        this.element.addClass('psticky-bottom');
      }
    },
    clean() {
      this.element.removeClass('psticky-sticky psticky-bottom psticky-top');
      this.element.css({
        position: '',
        top: '',
        bottom: '',
      });
    },
  });

  return $.fn.psticky = function (options) {
    return psticky.init(this, options);
  };
}($));
