// 輪播
$(document).ready(function() {
  $("#ele-ball-slider").owlCarousel({
    autoPlay : 6000,
    stopOnHover : true,
    navigation:true,
    paginationSpeed : 1000,
    goToFirstSpeed : 2000,
    singleItem : true,
    autoHeight : true,
    transitionStyle:"fade" // 1.fade 2.backSlide 3.goDown 4.fadeUp//
  });
});

// 美東時間
var estObj = {
    now: 1464103503000 || 0,
    pre0: function(num){
        if (num < 10) {num = '0' + num;} return num;
    },
    // 即時時間顯示
    dispTime: function() {
        var nowNew = (estObj.now += 1000),
            dateObj = new Date(nowNew),
            p0 = estObj.pre0,
            Y  = dateObj.getFullYear(),
            Mh = dateObj.getMonth() + 1,
            D  = p0(dateObj.getDate()),
            H  = p0(dateObj.getHours()),
            M  = p0(dateObj.getMinutes()),
            S  = p0(dateObj.getSeconds());

        if(Mh > 12) {Mh = 01;}
        else if(Mh < 10) {Mh = '0'+Mh;}

        document.getElementById('js-est-reciprocal').innerHTML = Y+'/'+Mh+'/'+D+' - '+H+':'+M+':'+S;
    }
};
(function() {setInterval(estObj.dispTime, 1000);}() );

//跑馬燈

$('.latest-inner-box').newsTicker(); // sport - Latest Results