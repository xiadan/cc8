"use strict"; //strict mode

(function() {
    //================ NEW START==================
    var newCasino = {

        tag: {
            $layout: $('.elenew-game-layout'),
            $space: $('#elenew-game-space')
        },
        param: {
            //存group
            originGameAry: ["5001", "5002", "5003", "5004", "5005", "5006", "5007", "5008", "5009", "5011", "5012", "5013", "5014", "5015", "5016", "5017", "5018", "5019", "5020", "5025", "5026", "5027", "5028", "5029", "5030", "5034", "5035", "5039", "5040", "5041", "5047", "5048", "5049", "5050", "5057", "5058", "5059", "5060", "5061", "5062", "5070", "5073", "5076", "5077", "5078", "5079", "5080", "5083", "5084", "5088", "5089", "5091", "5092", "5093", "5094", "5095", "5101", "5102", "5103", "5104", "5106", "5115", "5116", "5117", "5118", "5131", "5201", "5202", "5203", "5204", "5401", "5402", "5403", "5404", "5405", "5406", "5407", "5601", "5701", "5703", "5704", "5705", "5706", "5707", "5708", "5801", "5802", "5803", "5804", "5805", "5806", "5808", "5809", "5810", "5811", "5821", "5823", "5824", "5825", "5826", "5827", "5828", "5831", "5832", "5833", "5835", "5836", "5837", "5901", "5902", "15006", "15016", "15018", "15019", "15021", "15022", "15024"],
            //存group + filter
            lastGameAry: [],
            //給search判斷是否為有使用過群組搜尋
            firstGameSort: true,
            //判斷有無使用過群組搜尋
            dCGameGroupFilterSort: true,
            //電子業banner所佔格數[行,列]
            bannerBlock: [0, 0],
            //一列幾個
            rowNum: 4,
            //存座標用陣列
            offsetAry: [],
            offsetAry2: [],
            offsetAry3: [],
            listH: 131,
            miniH: 68,
            comingGame: '',
            gameHall: '5',
            jpMaxNum: 0
        },
        init: function() {
            var _self = this,
                offsetXY = [],
                _key,
                _rowNum = newCasino.param.rowNum,
                //前兩排原數量 - 被輪播占掉的數量
                exNum = _rowNum * newCasino.param.bannerBlock[1] - newCasino.param.bannerBlock[0] * newCasino.param.bannerBlock[1],
                blockW = newCasino.tag.$layout.eq(0).outerWidth() + parseInt(newCasino.tag.$layout.eq(0).css('margin-right').match(/\d+/g)) + parseInt(newCasino.tag.$layout.eq(0).css('margin-left').match(/\d+/g)),
                blockH = newCasino.tag.$layout.eq(0).outerHeight() + parseInt(newCasino.tag.$layout.eq(0).css('margin-top').match(/\d+/g)) + parseInt(newCasino.tag.$layout.eq(0).css('margin-bottom').match(/\d+/g));

            //依照上次顯示樣式顯示
            if ($.cookie('liveListStyle')) {
                _self.tag.$space
                    .removeClass('elenew-view-block')
                    .removeClass('elenew-view-list')
                    .removeClass('elenew-view-mini')
                    .addClass('elenew-view-' + $.cookie('liveListStyle'));

                $('.elenew-live-view a').removeClass('view-active');
                $('.elenew-viewbtn-' + $.cookie('liveListStyle')).addClass('view-active');

            }

            for (var i = 0; i < _self.param.originGameAry.length; i++) {
                var j = i * newCasino.param.bannerBlock[i];
                //有banner
                if (i < exNum) {
                    offsetXY = [newCasino.param.bannerBlock[0] * blockW + i % (_rowNum - newCasino.param.bannerBlock[0]) * blockW, parseInt(i / (_rowNum - newCasino.param.bannerBlock[0])) * blockH];
                } else {
                    offsetXY = [(i - exNum) % _rowNum * blockW, parseInt((i - exNum) / _rowNum) * blockH + newCasino.param.bannerBlock[1] * blockH];
                }
                newCasino.param.offsetAry.push(offsetXY);

                /* list */
                //offsetXY = ['50%', i * 140];
                offsetXY = [0, i * newCasino.param.listH];
                newCasino.param.offsetAry2.push(offsetXY);

                /* mini */
                offsetXY = [i % 2 * 50 + '%', parseInt(i / 2) * newCasino.param.miniH];
                newCasino.param.offsetAry3.push(offsetXY);

            }
            //座標儲存完畢

            //覆寫jQuery contains方法，使大小寫均可搜尋到
            jQuery.expr[':'].contains = function(a, i, m) {
                return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
            };

            // 綁定事件
            for (_key in _self.eventBind) {
                $(document).on(_self.eventBind[_key][0], _self.eventBind[_key][1], _self.eventFunction[_key]);
            }
            $(window).scroll(_self.eventFunction.windowScroll); //window分出來綁
            //顯示目前圖片
            //_self.eventFunction.windowScroll();
            _self.scrollImgLoading();

            //抓出搶先看的id
            $('.elenew-coming-layout').each(function(i) {
                _self.param.comingGame += ($(this).data('id') + ',');
            });

            //首次進入顯示熱門遊戲,若無則顯示全部
            _self.tag.$space.addClass("elenew-no-animate");
            if ($('#gm-no-2').length !== 0) {
                $('#gm-no-2').trigger('click');
            } else {
                $('#gm-no-84').trigger('click');
            }
            _self.tag.$space.removeClass("elenew-no-animate");

            //MG遊戲小彩金
            if (newCasino.param.gameHall == '23') newCasino.updateMgjp();
        },
        updateMgjp: function() {
            setTimeout(function() {
                newCasino.param.jpMaxNum += 1;

                var mgjpArr = {},
                    i,
                    _this,
                    jpCode,
                    mgjpList = $('#progressiveTickerall').find('.progressiveInput'),
                    mgjpListSize = mgjpList.length,
                    mgGame,
                    mgGameSize,
                    re = /(\d{1,3})(?=(\d{3})+$)/g;

                for (i = 0; i < mgjpListSize; i++) {
                    _this = mgjpList[i];
                    mgjpArr[_this.id.replace('progressive', '')] = _this.value.replace(re, '$1,');
                }

                if ($.isEmptyObject(mgjpArr) && newCasino.param.jpMaxNum < 6) {
                    newCasino.updateMgjp();
                    return;
                }

                mgGame = $('#elenew-game-space .JPMG[data-jpcode]');
                mgGameSize = mgGame.length;

                for (i = 0; i < mgGameSize; i++) {
                    _this = $(mgGame[i]);
                    jpCode = _this.data('jpcode');

                    if (jpCode in mgjpArr) {
                        _this.fadeOut('fast').text(mgjpArr[jpCode]).fadeIn();
                    }
                }
            }, 2000);
        },
        eventBind: {
            viewChange: ['click', '.elenew-live-view a'],
            groupSort: ['click', '.elenew-gm-1, .elenew-gm-2'],
            searchChange: ['change', '#elenew-search-game'],
            searchKeyup: ['keyup input propertychange', '#elenew-search-game']
        },
        eventFunction: {
            //改顯示模式
            viewChange: function() {
                var _self = newCasino,
                    _viewStyle = $(this).data('view');

                //記住顯示樣式
                $.cookie('liveListStyle', _viewStyle);

                $('.elenew-live-view a').removeClass('view-active');
                $(this).addClass('view-active');

                _self.tag.$space
                    .removeClass('elenew-view-block')
                    .removeClass('elenew-view-list')
                    .removeClass('elenew-view-mini')
                    .addClass('elenew-view-' + _viewStyle);

                if (_self.param.firstGameSort) {
                    _self.groupGameSort(_self.param.originGameAry.join(','));
                    return;
                }
                _self.groupGameSort(_self.param.lastGameAry.join(','));
            },
            //遊戲群組排序
            groupSort: function() {
                if ("gm-no-35" !== $(this).attr("id") || $(this).hasClass("gm-active") || "#" !== $(this).attr("data-games")) {
                    var a = newCasino;
                    a.param.dCGameGroupFilterSort = !1;
                    $(".elenew-trace-sub").hide();
                    $(".gamenew-trace-total").find(".gm-name").html($("#gm-no-84").find(".gm-name").html());
                    $(".gamenew-trace-num-0").html($("#gm-no-84").attr("data-num"));
                    "gm-no-84" == $(this).attr("id") ? ($(".trace-1").hide(), $(".trace-2").hide()) : $(this).hasClass("elenew-gm-1") ? ($(".gamenew-trace-1").find(".gamenew-trace-current").html($(this).find(".gm-name").html()), $(".gamenew-trace-num-1").html($(this).attr("data-num")), $(".trace-1").show(), $(".trace-2").hide()) : $(this).hasClass("elenew-gm-2") && ($(".gamenew-trace-1").find(".gamenew-trace-current").html(a.param.S_TigerName), $(".gamenew-trace-num-1").html($("#gm-no-3").attr("data-num")), $(".gamenew-trace-2").find(".gamenew-trace-current").html($(this).find(".gm-name").html()), $(".gamenew-trace-num-2").html($(this).find(".gm-num").html()), $(".trace-1").show(), $(".trace-2").show());
                    $(".elenew-trace-sub").show();
                    $(".gm-active").removeClass("gm-active");
                    $(this).addClass("gm-active");
                    $("#elenew-search-game").val("");
                    a.tag.$layout.removeClass("gamenew-filter-hide");
                    a.groupGameSort($(this).attr("data-games"), "group");
                    "gm-no-35" === $(this).attr("id") && "#" === $(this).attr("data-games") && alert(a.param.S_NoFavorite)
                } else alert(newCasino.param.S_NoFavorite)
            },
            //文字搜尋
            searchChange: function() {
                function a(a) {
                    $(".gm-active").removeClass("gm-active");
                    $("#gm-no-84").addClass("gm-active");
                    $(".trace-1").hide();
                    $(".trace-2").hide();
                    $(".gamenew-trace-num-0").text(a)
                }
                var c = newCasino,
                    b = [],
                    d = $(this).val();
                if ("" === d) c.tag.$layout.removeClass("gamenew-filter-hide"),
                    $(this).removeClass("elenew-serch-noresult"),
                    c.groupGameSort(c.param.originGameAry.join(",")),
                    a(c.param.originGameAry.length);
                else {
                    c.groupGameSort($("#gm-no-84").data("games"), "group");
                    c.tag.$layout.addClass("gamenew-filter-hide");
                    for (var e = 0; e < c.param.originGameAry.length; e++) $("#game_" + c.param.originGameAry[e]).find('h3:contains("' + d + '")').closest(".elenew-game-layout").removeClass("gamenew-filter-hide").each(function() {
                        b.push($(this).data("id"))
                    });
                    0 == b.length ? (c.tag.$layout.removeClass("gamenew-filter-hide"), c.groupGameSort(c.param.originGameAry.join(",")), $(this).addClass("elenew-serch-noresult"), $("#elenew-search-wrap").addClass("gamenew-filter-empty"), a(c.param.originGameAry.length)) : ($(this).removeClass("elenew-serch-noresult"), $("#elenew-search-wrap").removeClass("gamenew-filter-empty"), c.groupGameSort(b.join(",")), a(b.length))
                }
            },
            //文字搜尋
            searchKeyup: function() {
                $(this).change();
                setTimeout(function() {
                    newCasino.scrollImgLoading();
                }, 500);
            },
            //捲動顯示圖片
            windowScroll: function() {
                newCasino.scrollImgLoading();
            }
        },
        //依照取得的陣列順序，做顯示與否，並給予定位值
        groupGameSort: function(gameArrStr, type) {
            var _self = newCasino,
                _showGameAry,
                _oAry = [],
                noGameCount = 0;

            //若為menu搜尋，將搶先看無條件加在最前面
            if (type === 'group') {
                gameArrStr = _self.param.comingGame + gameArrStr;
            }

            _showGameAry = gameArrStr.split(',');
            if (_showGameAry[0] === '') {
                return;
            } //<-?

            _self.param.lastGameAry = _showGameAry;
            //判斷應取用的座標組
            if (_self.tag.$space.hasClass('elenew-view-list')) {
                _oAry = _self.param.offsetAry2;
            } else if (_self.tag.$space.hasClass('elenew-view-mini')) {
                _oAry = _self.param.offsetAry3;
            } else {
                _oAry = _self.param.offsetAry;
            }
            //第一次使用要先給座標
            if (_self.param.firstGameSort) {
                var i = 0;
                _self.tag.$layout.each(function() {
                    //給座標
                    $(this).css({
                        'left': _self.param.offsetAry[i][0],
                        'top': _self.param.offsetAry[i][1]
                    });
                    i++;
                });
                _self.param.firstGameSort = false;
            }
            //先將高度固定住
            _self.tag.$space
                .height(_self.tag.$space.height())
                .css('position', 'relative');

            _self.tag.$layout.css('position', 'absolute');
            //此上下2行不可調換(for IE10)
            if (type === 'group') {
                _self.param.originGameAry = _showGameAry;
                _self.tag.$layout
                    .addClass('gamenew-group-hide');
                //list模式IE11超框bug
                if (_self.tag.$space.hasClass('elenew-view-list') || _self.tag.$space.hasClass('elenew-view-mini')) {
                    _self.tag.$layout.css('left', '0');
                }
            }

            for (var i = 0; i < _showGameAry.length; i++) {
                if (type === 'group') {
                    $('#game_' + _showGameAry[i])
                        .removeClass('gamenew-group-hide');
                }
                //避免無選單遊戲時造成的空白與跑版
                if ($('#game_' + _showGameAry[i]).length != 0) {
                    $('#game_' + _showGameAry[i])
                        //將須顯示者賦予定位值，但先設置成static以撐開parent來取得高度
                        .css({
                            'left': _oAry[i - noGameCount][0],
                            'top': _oAry[i - noGameCount][1],
                            'position': 'static'
                        });
                } else {
                    noGameCount++;
                }

            };
            //以auto取得應得高度後賦予
            _self.tag.$space.height('auto').height(_self.tag.$space.height());

            //賦予高度後再轉成絕對定位
            _self.tag.$layout.css('position', 'absolute');

            setTimeout(function() {
                //被隱藏的於動畫做完後移至頂端
                $('.gamenew-group-hide').css('top', '0');
                if (_self.tag.$space.hasClass('elenew-view-list')) {
                    $('.gamenew-group-hide').css('left', '0');
                }
                newCasino.scrollImgLoading();
            }, 500);
        },
        //圖片先顯示前16筆
        initImgLoading: function() {
            for (var i = 0; i < newCasino.tag.$layout.length; i++) {
                var newImg = new Image;
                var $lg = newCasino.tag.$layout.eq(i).find('img');
                if (i <= 15) {
                    $lg[0].src = $lg.data('img');
                }
            }
        },
        //捲動顯示圖片
        scrollImgLoading: function() {
            newCasino.tag.$layout.find('img').each(function() {
                if ($(this).data('imgloaded') !== 'Y' && $(this).isOnScreen()) {
                    $(this)[0].src = $(this).data('img');
                    $(this).data('imgloaded', 'Y');
                }
            });
        }
    }

    /* 超出底部改往上長 */
    $('.elenew-game-layout').on('mouseenter', function() {
        var popupH = parseInt($(this).find('.elenew-img-innerwrap').height()) + 92;
        if (parseInt($(this).offset().top) + popupH > parseInt($('body').height())) {
            $(this).addClass('trans-over');
        }
    }).on('mouseleave', function() {
        $(this).removeClass('trans-over');
    });

    $(function() {
        newCasino.init();
    });

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

    //mini-img
    $('body')
        .on('mouseenter', '.elenew-view-mini .elenew-game-name', function() {
            $(this).closest('.elenew-game-layout').css('z-index', '2').find('.elenew-img-wrap').addClass('mini-img-show');
        })
        .on('mouseleave', '.elenew-view-mini .elenew-game-name', function() {
            $(this).closest('.elenew-game-layout').css('z-index', '1').find('.elenew-img-wrap').removeClass('mini-img-show');
        });

    //favorite
    var checkFavorCookie = function() {
        var _cookie_favor = JSON.parse($.cookie('favorGames'));
        _cookie_favor = _cookie_favor.split(',');
        var diff1 = $(_cookie_favor).not(favorGamesArr).get(),
            diff2 = $(favorGamesArr).not(_cookie_favor).get(),
            diff3 = [];

        if (diff2.length > 0) {
            diff3 = diff1.concat(diff2);
        } else {
            diff3 = diff1;
        }

        if (diff3.length > 0) {
            var _url = "/cl/?module=MGetIPLCasino&method=ChangeLoveStatus&kind=5&code=" + diff3.join(',');
            $.ajax({
                url: _url,
                type: "GET",
                async: false,
                dataType: 'json',
                success: function(obj) {
                    if (obj.status == "Y") {
                        var _tmp = favorGamesArr.join(',');
                        $.cookie('favorGames', JSON.stringify(_tmp));
                    }
                }
            });
        }
    };


    $("#elenew-game-wrap")
        //add favorite
        .on('click', '.tool-btn-favorite', function() {
            var _game_code = $(this).data('code').toString(),
                _this = $(this),
                _id = _this.parents('.elenew-game-layout').attr("id"),
                _inArray = $.inArray(_game_code, favorGamesArr);

            if (_inArray == -1) {
                favorGamesArr.push(_game_code);
            } else {
                favorGamesArr.splice(_inArray, 1);
            }
            var _tmp = $('#gm-no-35').attr('data-games'),
                trainindIdArray = [],
                _game_index;

            if (_tmp != '#') {
                trainindIdArray = _tmp.split(',');
            }
            _game_index = $.inArray(_game_code, trainindIdArray);

            if (_this.hasClass('favorite-icon-N')) {
                if (_game_index == -1) {
                    trainindIdArray.push(_game_code);
                }
                $('.tool-btn-favorite[data-code=' + _game_code + ']').removeClass('favorite-icon-N').addClass('favorite-icon-Y').attr("title", ('移除我的最愛'));
            } else {
                if (_game_index != -1) {
                    trainindIdArray.splice(_game_index, 1);
                }
                $('.tool-btn-favorite[data-code=' + _game_code + ']').removeClass('favorite-icon-Y').addClass('favorite-icon-N').attr("title", ('加入我的最愛'));
            }
            _tmp = trainindIdArray.join(',');
            if (_tmp === '') {
                _tmp = '#';
            }
            $('#gm-no-35').attr('data-games', _tmp).attr('data-num', trainindIdArray.length);

            if ($('#gm-no-35').hasClass('gm-active')) {
                $('#gm-no-35').trigger('click');
            }
        });
}());

function gameLoginCheck() {
    if (document.GameLoginForm.username.value == "") {
        alert("請輸入帳號!!");
        document.GameLoginForm.username.focus();
        return false;
    } else if (document.GameLoginForm.passwd.value == "") {
        alert("請輸入密碼!!");
        document.GameLoginForm.passwd.focus();
        return false;
    } else if (document.GameLoginForm.passwd.value.length > 0 && document.GameLoginForm.passwd.value.length < 6) {
        alert("密碼長度不能少於6個字元");
        document.GameLoginForm.passwd.focus();
        return false;
    } else if (document.GameLoginForm.rmNum.value == "") {
        alert("請輸入驗證碼!!");
        document.GameLoginForm.rmNum.focus();
        return false;
    }
    return true;
}

//判斷圖片是否進入可視範圍
$.fn.isOnScreen = function() {
    var win = $(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

//驗證碼 for Game
function getGameLoginKey() {
    $.get('/app/member/verify/mkCode.php?_=' + Math.random() + (new Date).getTime(), function(data) {
        var spl = data.split(";");
        $("#GameLoginForm [name='SS']").val(spl[0]);
        $("#GameLoginForm [name='SR']").val(spl[1]);
        $("#GameLoginForm [name='TS']").val(spl[2]);
        $("#vPic-game").attr("src", "/tpl/commonFile/images/gdpic/macpic.php?SR=" + spl[1]).css("visibility", "visible");
        $("#GameLoginForm [name='rmNum']").val("");
    });
}
