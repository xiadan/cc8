"use strict"; //strict mode
$(document).ready(function() {

    $(".elenew-gn-wrap").show().height($(".elenew-gn-wrap").height()).hide();
    $(".elenew-gn-innerwrap").css({
        position: "absolute",
        bottom: "0"
    });
    var b = $(".elenew-game-nav");
    b.mouseenter(function() {
        b.addClass("gn-active");
        $(".elenew-gn-wrap").stop(true, true).delay(200).slideDown()
    }).mouseleave(function() {
        b.removeClass("gn-active");
        $(".elenew-gn-wrap").stop(true, true).delay(300).slideUp()
    }).on("click", ".elenew-gm-1, .elenew-gm-2",
        function() {
            b.removeClass("gn-active");
            $(".elenew-gn-wrap").stop().slideUp()
        });
    var c = $(".elenew-search-input"),
        a = 268;
    $(".elenew-search-btn").click(function() {
        if (c.width() === 0) {
            c.stop().animate({
                    width: a,
                    "padding-left": 15
                },
                function() {
                    $("#elenew-search-game").focus()
                });
            $(this).addClass("search-active");
            return
        }
        c.stop().animate({
            width: 0,
            "padding-left": 0
        });
        $(this).removeClass("search-active")
    });
    $(".gamenew-trace-1, .gamenew-trace-2").mouseenter(function() {
        $(this).find(".gamenew-trace-option").stop(true, true).slideDown()
    }).mouseleave(function() {
        $(this).find(".gamenew-trace-option").stop(true, true).slideUp()
    });
    $(".gamenew-trace-0").find(".gamenew-trace-total").find("a").click(function() {
        $("#gm-no-" + $(this).data("id")).trigger("click")
    });
    $(".gamenew-trace-1").find(".gamenew-trace-option").find("a").click(function() {
        $("#gm-no-" + $(this).data("id")).trigger("click")
    });
    $(".gamenew-trace-2").find(".gamenew-trace-option").find("a").click(function() {
        $("#gm-subno-" + $(this).data("id")).trigger("click")
    })

    $('body').mouseover(function(event) {
        if (!$(event.target).closest('.gamenew-trace-1').length) {
            if ($('.gamenew-trace-1 .gamenew-trace-option').is(":visible")) {
                $('.gamenew-trace-1 .gamenew-trace-option').slideUp();
            }
        }
        if (!$(event.target).closest('.gamenew-trace-2').length) {
            if ($('.gamenew-trace-2 .gamenew-trace-option').is(":visible")) {
                $('.gamenew-trace-2 .gamenew-trace-option').slideUp();
            }
        }
    });

    //game menu fix
    $.fn.gameNavFixed = function(setting) {
        var _o = this,
            conf = {
                fixedClass: 'fixed',
                fixedTop: 0
            };

        $.extend(conf, setting);

        return this.each(function() {
            var $target = $(_o),
                targetTop = $target.offset().top,
                fixedTop = parseInt(conf.fixedTop, 10) || 0,
                criticalTop = targetTop - fixedTop,
                _docW = $(document).width();
            $(window).scroll(function() {
                var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
                    scrollLeft = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;
                if (scrollTop > criticalTop) {
                    if (!$target.hasClass(conf.fixedClass)) {
                        $target.addClass(conf.fixedClass);
                        if (parseInt($(window).width()) < _docW) {
                            $(".gamenew-menu-fixed").css('min-width', _docW);
                        }
                    }
                    $target.children().css({
                        left: -scrollLeft
                    });
                } else {
                    if ($target.hasClass(conf.fixedClass)) {
                        $target.removeClass(conf.fixedClass);
                        $(".gamenew-menu-fixed").css('min-width', 0);
                    }
                }
            });
            $(window).resize(function() {
                _docW = $(document).width();
                if ($target.hasClass(conf.fixedClass)) {
                    if ($(window).width() < _docW) {
                        $(".gamenew-menu-fixed").css('min-width', _docW);
                    } else {
                        $(".gamenew-menu-fixed").css('min-width', 0);
                    }
                }
            });
        });
    }

    $('.gamenew-menu-bgcolor').width($('.gamenew-menu-bgcolor').width());
    $("#gamenew-menu-placeholder").gameNavFixed({
        fixedTop: 0
    }); //主选单也fixed才加fixedTop设定(css也要加)
});


//LOGIN
//common method object
var f_com = {};

/**
 * 密碼判別
 * @param s object {
 *     False : 特殊字元顯示訊息
 *     Long  : 過長顯示訊息
 *   }
 */
$.fn.LoginPW = function(s) {
    var self = $(this);
    var Def = {
        'Upper': '密碼須為小寫，大寫鎖定啟用中',
        'Short': '密码长度不能少于6个字元',
        'Long': '密码长度不能多于12个字元',
        'False': '密码须符合0~9、a~z及A~Z字元'
    };
    Def = $.extend(Def, s);

    if (self.attr('maxlength') != 13) self.attr('maxlength', 13);

    self.keyup(function() {
        // 特殊字元
        if (/[^a-zA-Z0-9]/g.test(this.value)) {
            alert(Def.False);
            this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
        }
        // 密碼過長
        if (this.value.length > 12) {
            alert(Def.Long);
            this.value = this.value.substring(0, 12);
        }
    });
}

/**
 * 登入表單效果
 * @param _o object {
 *     Opacity : 標題透明度
 *     MS      : 標題顯示速度
 *   }
 */
$.fn.InputLabels = function(_o) {
    var o = {
        'Opacity': 0.5,
        'MS': 300,
        'next': false
    };
    $.extend(o, _o);

    return this.each(function() {
        var label = $(this);
        var input = o.next ? $(this).next('input[name=' + $(this).attr('name') + ']') : $('input[name=' + $(this).attr('name') + ']');
        var show = true;

        // 預防瀏覽器記帳密機制
        setTimeout(function() {
            this.opacity = (input.val() == "") ? 1.0 : 0;
            label.css('opacity', this.opacity);
        }, 300);

        label.click(function() {
            input.trigger('focus');
        });

        input.focus(function() {
            if (input.val() == "") {
                setOpacity(o.Opacity);
            }
        }).blur(function() {
            if (input.val() == "") {
                if (!show) {
                    label.css({ opacity: 0.0 }).show();
                }
                setOpacity(1.0);
            } else {
                setOpacity(0.0);
            }
        }).keydown(function(e) {
            if ((e.keyCode == 16) || (e.keyCode == 9) || (e.keyCode == 13)) return;
            if (show) {
                label.hide();
                show = false;
            }
        });

        var setOpacity = function(opacity) {
            label.stop().animate({ 'opacity': opacity }, o.MS);
            show = (opacity > 0.0);
        };
    });
};


//登入前點進入遊戲，彈出登入區塊
$('#GameLoginForm').find('label').InputLabels();
$('.ctl-btn-enter').click(function() {
    $('.game-login-wrap').show();
});
$('.glogin-close').click(function() {
    $('.game-login-wrap').hide();
});
$('.game-login-wrap').click(function(event) {
    if (!$(event.target).closest('#GameLoginForm').length) {
        if ($('.game-login-wrap').is(":visible")) {
            $('.game-login-wrap').hide();
        }
    }
});


//移除INLINE BLOCK的空白
$('.removeNodes').contents().filter(function() {
    return this.nodeType === 3;
}).remove();


//JP說明
$('.elenew-jp-explain').click(function() {
    var $jpInfoWrap = $('<div class="jp-info-wrap"><div class="jp-info-top"><span class="jp-info-close"></span></div><div class="jp-info-text"></div><div class="jp-info-bot"></div></div>'),
        hall = $(this).data('hall');

    $jpInfoWrap.addClass('jp-info-' + hall);

    if (hall == 'bbin') {
        $jpInfoWrap.find('.jp-info-text').text("遊戲提供四層神秘彩金(GRAND-BBIN連線超級彩金、MAJOR-爭霸彩金、MINOR-雙龍彩金、MINI-獨贏彩金)，不定時送出高額大獎。其中MINI-獨贏彩金以1:1派發，其餘GRAND-BBIN連線超級彩金、MAJOR-爭霸彩金、MINOR-雙龍彩金則由系統隨機決定比例派發。 彩金金額統一以人民幣顯示，派發時將依照玩家所屬幣別自動做換算。");
    } else if (hall == '3d') {
        $jpInfoWrap.find('.jp-info-text').text("遊戲提供四層神秘彩金(GRAND-BBIN連線超級彩金、MAJOR-爭霸彩金、MINOR-雙龍彩金、MINI-獨贏彩金)，不定時送出高額大獎。其中MINI-獨贏彩金以1:1派發，其餘GRAND-BBIN連線超級彩金、MAJOR-爭霸彩金、MINOR-雙龍彩金則由系統隨機決定比例派發。 彩金金額統一以人民幣顯示，派發時將依照玩家所屬幣別自動做換算。");
    } else if (hall == 'mg') {
        $jpInfoWrap.find('.jp-info-text').text(hall);
    }
    $('#gamenew-menu').append($jpInfoWrap);
});

$(document).on('click', '.jp-info-close', function() {
    $('.jp-info-wrap').remove();
});
$('html').click(function(event) {
    if (!$(event.target).closest('.jp-info-wrap, .elenew-jp-explain').length) {
        $('.jp-info-wrap').remove();
    }
});


//自動計數器
var defaults = {
    value: 853901246,
    inc: 9,
    pace: 2000,
    auto: true
};
var c1 = new flipCounter('c1', defaults);
