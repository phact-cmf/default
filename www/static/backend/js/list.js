$(function () {
    var list = {
        options: {
            url: undefined
        },
        id: undefined,
        currentUrl: undefined,
        $listBlock: undefined,
        init: function (options) {
            this.options = $.extend(this.options, options);
            this.currentUrl = this.options.url;
            this.id = this.$listBlock.data('id')
        },
        setUrl: function (url) {
            this.currentUrl = url;
            this.update();
        },
        setListBlock: function ($listBlock) {
            this.$listBlock = $listBlock;
        },
        getListSelector: function () {
            return '[data-id="' + this.id + '"]';
        },
        getUpdateBlockSelector: function () {
            return this.getListSelector() + ' .list-update-block';
        },
        update: function () {
            var me = this;
            me.$listBlock.addClass('loading');

            $.ajax({
                url: this.currentUrl,
                success: function (page) {
                    var $page = $('<div/>').append(page);
                    var ubSelector = me.getUpdateBlockSelector();
                    $(ubSelector).replaceWith($page.find(ubSelector));
                    me.$listBlock.removeClass('loading');
                }
            });
        }
    };

    $.fn.adminList = function(options) {
        var item = $.extend(true, {}, list);
        item.setListBlock(this);
        this.data('object', item);
        item.init(options);
    };


    function getListBlock($element)
    {
        return $element.closest('.list-block');
    }

    function getList($element)
    {
        var $listBlock = getListBlock($element);
        return $listBlock.data('object');
    }

    $(document).on('click', '.list-block .pagination-block a', function (e) {
        e.preventDefault();
        var $this = $(this);
        var list = getList($this);
        list.setUrl($this.attr('href'));
        return false;
    });

    $(document).on('click', '.list-block table thead a.title', function (e) {
        e.preventDefault();
        var $this = $(this);
        var list = getList($this);
        list.setUrl($this.attr('href'));
        return false;
    });

    $(document).on('change', '.list-block .pagination-block [data-pagesize]', function (e) {
        e.preventDefault();
        var $this = $(this);
        var url = $this.val();
        var list = getList($this);
        list.setUrl(url);
        return false;
    });

    $(document).on('list-update', function (e, $element) {
        console.log($element);
        var list = getList($element);
        list.update();
    });
});