// 美東時間
function show_now() {
    var mydate=new Date();
    var year=mydate.getFullYear();
    var day=mydate.getDay();
    var month=mydate.getMonth();
    var daym=mydate.getDate();
    var Hours=mydate.getHours();
    var Minutes=mydate.getMinutes();
    var Seconds=mydate.getSeconds();
    if (daym<10){
    daym="0"+daym;}
    var dayarray=new Array("SUN","MON","TUE","WED","THU","FRI","STA")
    var montharray=new Array("1","2","3","4","5","6","7","8","9","10","11","12")
    var date_div=document.getElementById("js-est-reciprocal");
    var date_str=year+"/"+montharray[month]+"/"+daym+" "+Hours+":"+Minutes+":"+Seconds
    date_div.innerHTML=date_str;

    setTimeout("show_now()",1000);
}
show_now();


//最新賽果
$('.sport-game-ticker').newsTicker();


//SLIDER
$(function () {
    $("#sportGameSlider").responsiveSlides({
    });
});


//賽事牆
$(function(){
    var $block = $('#sportGameBox1'),
        $wall = $block.find('.sport-game-wall'),
        showIndex = 0,
        fadeOutSpeed = 500,
        fadeInSpeed = 500,
        defaultZ = 10,
        isHover = false,
        timer, speed = 15000;
    $wall.css({
        opacity: 0,
        zIndex: defaultZ - 1
    }).eq(showIndex).css({
        opacity: 1,
        zIndex: defaultZ
    });
    var str = '';
    for(var i=0;i<$wall.length;i++){
        str += '<a href="#">' + (i + 1) + '</a>';
    }
    var $controlA = $('#sportGameBox1').append($('<div class="control">' + str + '</div>').css('zIndex', defaultZ + 1)).find('.control a');
    $controlA.click(function(){
        showIndex = $(this).text() * 1 - 1;
        $wall.eq(showIndex).stop().fadeTo(fadeInSpeed, 1, function(){
            if(!isHover){
                timer = setTimeout(autoClick, speed + fadeInSpeed);
            }
        }).css('zIndex', defaultZ).siblings('.sport-game-wall').stop().fadeTo(fadeOutSpeed, 0).css('zIndex', defaultZ - 1);
        $(this).addClass('on').siblings().removeClass('on');
        return false;
    }).focus(function(){
        $(this).blur();
    }).eq(showIndex).addClass('on');

    $block.hover(function(){
        isHover = true;
        clearTimeout(timer);
    }, function(){
        isHover = false;
        timer = setTimeout(autoClick, speed);
    })
    function autoClick(){
        if(isHover) return;
        showIndex = (showIndex + 1) % $controlA.length;
        $controlA.eq(showIndex).click();
    }
    timer = setTimeout(autoClick, speed);
});
$(function(){
    var $block = $('#sportGameBox2'),
        $wall = $block.find('.sport-game-wall'),
        showIndex = 0,
        fadeOutSpeed = 500,
        fadeInSpeed = 500,
        defaultZ = 10,
        isHover = false,
        timer, speed = 15000;
    $wall.css({
        opacity: 0,
        zIndex: defaultZ - 1
    }).eq(showIndex).css({
        opacity: 1,
        zIndex: defaultZ
    });
    var str = '';
    for(var i=0;i<$wall.length;i++){
        str += '<a href="#">' + (i + 1) + '</a>';
    }
    var $controlA = $('#sportGameBox2').append($('<div class="control">' + str + '</div>').css('zIndex', defaultZ + 1)).find('.control a');
    $controlA.click(function(){
        showIndex = $(this).text() * 1 - 1;
        $wall.eq(showIndex).stop().fadeTo(fadeInSpeed, 1, function(){
            if(!isHover){
                timer = setTimeout(autoClick, speed + fadeInSpeed);
            }
        }).css('zIndex', defaultZ).siblings('.sport-game-wall').stop().fadeTo(fadeOutSpeed, 0).css('zIndex', defaultZ - 1);
        $(this).addClass('on').siblings().removeClass('on');
        return false;
    }).focus(function(){
        $(this).blur();
    }).eq(showIndex).addClass('on');

    $block.hover(function(){
        isHover = true;
        clearTimeout(timer);
    }, function(){
        isHover = false;
        timer = setTimeout(autoClick, speed);
    })
    function autoClick(){
        if(isHover) return;
        showIndex = (showIndex + 1) % $controlA.length;
        $controlA.eq(showIndex).click();
    }
    timer = setTimeout(autoClick, speed);
});

// (function() {
//     var dlgtrigger = document.querySelector( '[data-dialog]' ),
//         login_window = document.getElementById( dlgtrigger.getAttribute( 'data-dialog' ) ),
//         dlg = new DialogFx( login_window );
//     dlgtrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );
// })();
