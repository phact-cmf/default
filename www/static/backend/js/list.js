$(function () {
    var list = {
        options: {
            url: undefined,
            groupActionUrl: undefined
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
        setLoading: function () {
            this.$listBlock.addClass('loading');
        },
        unsetLoading: function () {
            this.$listBlock.removeClass('loading');
        },
        update: function () {
            var me = this;
            me.setLoading();

            $.ajax({
                url: this.currentUrl,
                success: function (page) {
                    var $page = $('<div/>').append(page);
                    var ubSelector = me.getUpdateBlockSelector();
                    $(ubSelector).replaceWith($page.find(ubSelector));
                    me.unsetLoading();
                }
            });
        },
        getPkList: function () {
            var pkList = [];
            this.$listBlock.find('input[type=checkbox][name="pk_list[]"]:checked').each(function () {
                var $checkbox = $(this);
                pkList.push($checkbox.val());
            });
            return pkList;
        },
        groupAction: function (action) {
            var me = this;
            me.setLoading();
            $.ajax({
                url: me.options.groupActionUrl,
                type: 'post',
                dataType: 'json',
                data: {
                    action: action,
                    pk_list: me.getPkList()
                },
                success: function (data) {
                    me.unsetLoading();
                    var type = 'success';
                    if (!data.success) {
                        type = 'error';
                    }
                    if (data.message) {
                        window.addFlashMessage(data.message, type);
                    }

                    if (data.success) {
                        me.update();
                    }
                }
            })
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
        var $this = $(this);
        var url = $this.val();
        var list = getList($this);
        list.setUrl(url);
    });

    $(document).on('click', '.list-block [data-group-remove]', function (e) {
        e.preventDefault();
        var $this = $(this);
        var url = $this.val();
        var list = getList($this);
        list.groupAction('remove');
        return false;
    });

    $(document).on('list-update', function (e, $element) {
        var list = getList($element);
        list.update();
    });
});