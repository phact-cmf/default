require('./filesfield.scss');
let Flow = require('@flowjs/flow.js/dist/flow.js');

(function ($) {

    "use strict";

    var filesField = {
        options: {
            url: undefined,
            uploadUrl: undefined,
            sortUrl: undefined,
            deleteUrl: undefined,
            
            flowData: {},
            sortData: {},
            deleteData: {},
            
            limit: 20,
            limitMessage: 'Извините, единовременно можно загрузить до 20 файлов',
            maxSizeMessage: 'Извините, превышен размер загружаемого файла',
            notAllowedMessage: 'Извините, можно загрузить только указанные типы файлов',
            accept: '*', // For images: 'image/*'
            types: [], // For images: ["image/gif", "image/jpeg", "image/png"],

            /* 5 mb */
            maxFileSize: 5242880
        },
        element: undefined,
        counter: 0,
        init: function (element, options) {
            if (element === undefined) return;

            this.element = element;
            this.options = $.extend(this.options, options);

            this.bind();
            this.initUploader();
            this.initList();

            return this;
        },

        bind: function () {
            var me = this;
            $(document).on('click', '#' + $(this.element).attr('id') + ' .remove-link', function(e){
                e.preventDefault();
                var $item = $(this).closest('li');
                if ($item.data('pk')) {
                    me.remove($item.data('pk'));
                }
                return false;
            });
        },

        initUploader: function () {
            var me = this;

            var flow = new Flow({
                target: me.options.uploadUrl,
                testChunks: false,
                query: me.options.flowData,
                allowDuplicateUploads: true
            });

            flow.assignBrowse(this.element.find('.files-drop')[0], false, false, this.options.accepts);
            flow.assignDrop(this.element.find('.files-drop')[0]);

            flow.on('filesSubmitted', function(){
                me.counter = 0;
                flow.upload();
            });

            flow.on('fileAdded', function(file, event){
                var fileObject = file.file;

                if (me.options.types && me.options.types.length && $.inArray(fileObject.type, me.options.types) < 0){
                    $.mnotify(me.options.notAllowedMessage);
                    return false;
                }


                if (me.options.maxFileSize < fileObject.size){
                    $.mnotify(me.options.maxSizeMessage);
                    return false;
                }
                
                if (me.counter < me.options.limit) {
                    me.counter++;

                    if (me.counter == me.options.limit) {
                        $.mnotify(me.options.limitMessage);
                    }
                } else {
                    return false;
                }
            });

            flow.on('uploadStart', function(){
                $(me.element).find('.progress_bar').css({
                    'width': 0
                });
            });

            flow.on('progress', function(){
                var width = flow.progress() * 100 + '%';
                $(me.element).find('.progress_bar').css({
                    'width': width
                });
            });

            flow.on('complete', function(){
                $(me.element).find('.progress_bar').css({
                    'width': '0'
                });
                me.updateList();
            });
        },
        checkEmpty: function() {
            var $list = $(this.element.find('.files-list'));
            var $empty = $list.next('.empty-info');
            if ($list.find('li').length > 0) {
                $empty.addClass('hide');
            } else {
                $empty.removeClass('hide');
            }
        },
        updateList: function () {
            var me = this;
            $.ajax({
                'url': me.options.url,
                'dataType': 'html',
                'success': function (data) {
                    var wrapped_data = $('<div/>').append(data);
                    var selector = '#' + $(me.element).attr('id') + ' .files-content';
                    $(selector).replaceWith(wrapped_data.find(selector));
                    me.initList();
                    me.checkEmpty();
                }
            });
        },
        initList: function() {
            var me = this;
            if (me.options.sortUrl) {
                var $list = $(this.element).find('.files-list');

                $list.sortable({
                    axis: $list.data('axis') ? $list.data('axis') : false,
                    placeholder: "highlight",
                    start: function(e, ui){
                        ui.placeholder.height(ui.item.height());
                    },
                    update: function (event, ui) {
                        var pkList = $(this).sortable('toArray', {
                            attribute: 'data-pk'
                        });

                        me.sort(pkList)
                    }
                });
            }
        },
        sort: function(pkList) {
            var me = this;
            var data = me.options.sortData;
            data['pkList'] = pkList;
            $.ajax({
                'type': 'post',
                'url': me.options.sortUrl,
                'data': data
            });
        },
        remove: function(pk) {
            var me = this;
            var data = me.options.deleteData;
            data['deletePk'] = pk;
            $.ajax({
                'type': 'post',
                'url': me.options.deleteUrl,
                'data': data,
                'success': function(){
                    $(me.element).find('[data-pk="'+pk+'"]').fadeOut(300, function(){
                        $(this).remove();
                        me.checkEmpty();
                    });
                }
            });
        }
    };

    /**
     * Инициализация функции объекта для jQuery
     */
    return $.fn.filesField = function (options) {
        return $.extend(true, {}, filesField).init(this, options);
    };

})($);