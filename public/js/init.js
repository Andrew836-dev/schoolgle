(function($) {
  $(() => {
    $(".sidenav").sidenav();
    $(".parallax").parallax();
    $("select").formSelect();
  });

  // this makes an arrow picture in main.handlebars fade in and out when you scroll down
  $(window).scroll(() => {
    const scrollPosition = $(window).scrollTop();
    if (scrollPosition > 100) {
      $("#to-top").fadeIn(500);
    } else {
      $("#to-top").fadeOut(500);
    }
  });

  // This bit of code makes it so $.put and $.delete works, instead of doing a full $.ajax
  jQuery.each(["put", "delete"], (i, method) => {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
})(jQuery);
// end of jQuery name space
