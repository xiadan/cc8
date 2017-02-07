//TABS
$(document).ready(function() {

    $('ul.ele-lottery-ranking-tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.ele-lottery-ranking-tabs li').removeClass('current-tab');
        $('.ele-lottery-game-card').removeClass('current-card');

        $(this).addClass('current-tab');
        $("#" + tab_id).addClass('current-card');
    })
})

// 輪播
$(document).ready(function() {
    $("#ele-lottery-slider").owlCarousel({
        autoPlay: 6000,
        stopOnHover: true,
        navigation: true,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true,
        transitionStyle: "fade" // 1.fade 2.backSlide 3.goDown 4.fadeUp//
    });
});
