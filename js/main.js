//語系滑動
$('.lang-wrap').click(function(){
    $('.lang-option').stop().slideToggle('fast');
});

//REMOVE INLINE-BLOCK NODE
$('.removeNodes').contents().filter(function() {
    return this.nodeType === 3;
}).remove();


// our products mouseover
var sourceSwap = function() {
    var $this = $(this);
    var newSource = $this.data('alt-src');
    $this.data('alt-src', $this.attr('src'));
    $this.attr('src', newSource);
}
$('img[data-alt-src]').each(function() {
    new Image().src = $(this).data('alt-src');
}).hover(sourceSwap, sourceSwap);

/**
 * 文字閃爍
 * @param id   jquery selecor
 * @param arr  ['#FFFFFF','#FF0000']
 * @param s    milliseconds
 */
function toggleColor(id, arr, s) {
    var self = this;
    self._i = 0;
    self._timer = null;

    self.run = function() {
        if(arr[self._i]) {
            $(id).css('color', arr[self._i]);
        }
        self._i == 0 ? self._i++ : self._i = 0;
        self._timer = setTimeout(function() {
            self.run(id, arr, s);
        }, s);
    }
    self.run();
}

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
    var date_div=document.getElementById("EST_reciprocal");
    var date_str=year+"/"+montharray[month]+"/"+daym+"-"+Hours+":"+Minutes+":"+Seconds
    date_div.innerHTML=date_str;

    setTimeout("show_now()",1000);
}
