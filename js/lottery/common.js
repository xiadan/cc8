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
        'Upper' : '密碼須為小寫，大寫鎖定啟用中',
        'Short' : '密码长度不能少于6个字元',
        'Long'  : '密码长度不能多于12个字元',
        'False' : '密码须符合0~9、a~z及A~Z字元'
    };
    Def = $.extend(Def, s);

    if(self.attr('maxlength') != 13) self.attr('maxlength', 13);

    self.keyup(function() {
        // 特殊字元
        if(/[^a-zA-Z0-9]/g.test(this.value)) {
            alert(Def.False);
            this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
        }
        // 密碼過長
        if(this.value.length > 12) {
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
        'Opacity' : 0.5,
        'MS'      : 300,
        'next'    : false
    };
    $.extend(o, _o);

    return this.each(function() {
        var label = $(this);
        var input = o.next ? $(this).next('input[name=' + $(this).attr('name') + ']') : $('input[name=' + $(this).attr('name') + ']');
        var show = true;

        // 預防瀏覽器記帳密機制
        setTimeout(function() {
            this.opacity = (input.val() == "") ? 1.0 : 0;
            label.css('opacity' , this.opacity);
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
                    label.css({opacity: 0.0}).show();
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
            label.stop().animate({'opacity': opacity }, o.MS);
            show = (opacity > 0.0);
        };
    });
};
