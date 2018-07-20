/*!
 * Additional enhancements for Select2 widget extension for Yii 2.0.
 */
var initS2ToggleAll = function () {
}, initS2Order = function () {
}, initS2Loading = function () {
}, initS2Change = function () {
}, initS2Unselect = function () {
};
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";
    initS2ToggleAll = function (id) {
        var $el = $('#' + id), togId = '#' + 's2-togall-' + id, $tog = $(togId);
        if (!$el.attr('multiple')) {
            return;
        }

        $el.on('select2:open.onixs2', function () {
            if ($tog.parent().attr('id') === 'parent-' + togId || !$el.attr('multiple')) {
                return;
            }
            $('#select2-' + id + '-results').closest('.select2-dropdown').prepend($tog);
            $('#parent-' + togId).remove();
        }).on('change.onixselect2', function () {
            if (!$el.attr('multiple')) {
                return;
            }
            var tot = 0, sel = $el.val() ? $el.val().length : 0;
            $tog.removeClass('s2-togall-select s2-togall-unselect');
            $el.find('option:enabled').each(function () {
                if ($(this).val().length) {
                    tot++;
                }
            });
            if (tot === 0 || sel !== tot) {
                $tog.addClass('s2-togall-select');
            } else {
                $tog.addClass('s2-togall-unselect');
            }
        });

        $tog.off('.onixs2').on('click.onixs2', function () {
            var isSelect = $tog.hasClass('s2-togall-select'), flag = true, ev = 'selectall';
            if (!isSelect) {
                flag = false;
                ev = 'unselectall';
            }

            $('#select2-' + id + '-results').find('[role="treeitem"]').each(function (k,v) {
                var elemData = $(v).data('data'),
                    optElem = typeof elemData.element !== "undefined" ? $(elemData.element) : [];
                if(optElem.length) optElem.prop('selected', flag);
            });

            $el.select2('close').trigger('onixselect2:' + ev).trigger('change');
        });
    };

    initS2Change = function ($el) {
        $el = $el || $(this);
        var $drop = $(".select2-container--open"), cssClasses, i, $src = $el.parents("[class*='has-']");
        if ($src.length) {
            cssClasses = $src[0].className.split(/\s+/);
            for (i = 0; i < cssClasses.length; i++) {
                if (cssClasses[i].match("has-")) {
                    $drop.removeClass("has-success has-error has-warning").addClass(cssClasses[i]);
                }
            }
        }
    };

    initS2Unselect = function () {
        var $el = $(this), opts = $el.data('select2').options;
        opts.set('disabled', true);
        setTimeout(function() {
            opts.set('disabled', false);
            $el.trigger('onixselect2:cleared');
        }, 1);
    };

    initS2Order = function (id, val) {
        var $el = $('#' + id);
        if (val && val.length) {
            $.each(val, function (k, v) {
                $el.find('option[value="' + v + '"]').appendTo($el);
            });
            $el.find('option:not(:selected)').appendTo($el);
        }
    };

    initS2Loading = function (id, optVar) {
        /**
         * @namespace opts.id
         * @namespace opts.themeCss
         * @namespace opts.sizeCss
         * @namespace opts.doReset
         * @namespace opts.doToggle
         * @namespace opts.doOrder
         */
        var opts = window[optVar] || {}, themeCss = opts.themeCss, sizeCss = opts.sizeCss, doOrder = opts.doOrder,
            doReset = opts.doReset, doToggle = opts.doToggle, $el = $('#' + id), $container = $(themeCss),
            $loading = $('.onix-plugin-loading.loading-' + id), $group = $('.group-' + id);
        $el.off('.onixs2');
        if (!$container.length) {
            $el.show();
        }

        if ($group.length) {
            $group.removeClass('onix-input-group-hide').removeClass('.group-' + id);
        }

        if ($loading.length) {
            $loading.remove();
        }

        if (sizeCss) {
            $el.next(themeCss).removeClass(sizeCss).addClass(sizeCss);
        }

        if (doReset) {
            $el.closest("form").off('.onixs2').on("reset.onixs2", function () {
                setTimeout(function () {
                    $el.trigger("change").trigger("onixselect2:reset");
                }, 100);
            });
        }

        if (doToggle) {
            initS2ToggleAll(id);
        }

        if (doOrder) {
            $el.on('select2:select.onixs2 select2:unselect.onixs2', function (evt) {
                var $selected = $(evt.params.data.element);
                if (!$selected || !$selected.length) {
                    return;
                }
                $selected.detach();
                $el.append($selected).find('option:not(:selected)').appendTo($el);
            });
        }

        $el.on('change.onixs2', function () {
            setTimeout(initS2Change, 500);
        }).on('select2:unselecting.onixs2', initS2Unselect);
    };
}));
