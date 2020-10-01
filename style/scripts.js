$("#cartbtn").click(function() {
  var cart2 = $('#cartcnt');
  var imgtodrag = $(this).parent('#logo').find("img").eq(0);
  if (imgtodrag) {
    var imgclone = imgtodrag.clone()
      .offset({
        top: imgtodrag.offset().top,
        left: imgtodrag.offset().left
      }).animate({
        'opacity':'0.5',
        'margin-top':'-70px',
        'z-index': '100'
      }, 1000).css({
        'position': 'absolute',
        'height': '100px',
        'width': '100px',
        'z-index': '10000'
      }, 1000).appendTo($('body'));
      
    setTimeout(function() {
      cart2.effect("shake", {
        times: 2
      }, 200);
    }, 1500);
    imgclone.animate({
      'width': 0,
      'height': 0
    }, function() {
      $(this).detach()
    });
  }
});