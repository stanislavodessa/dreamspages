/*!
 * Main js
 * Version: 1.01
 *
 *
 */

(function($){


//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        var $distant = $($anchor.attr('href')).offset().top;
        var $navHeight = $('.navbar').outerHeight();
        $distant = $distant - $navHeight;

        $('html, body').stop().animate({
            scrollTop: $distant
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$(window).load(function () {
    $(".loader").fadeOut();
    $(".preloader").delay(1000).fadeOut("slow");
});

	
})(jQuery);