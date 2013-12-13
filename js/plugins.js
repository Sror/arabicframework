// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
//Lightweight Scroll Animation Plugin
function goToByScroll(id, speed){
    //Set default speed if not set
      if (speed == null) {
        speed = 'slow';
    }
    // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        speed);
  }

  $("a[data-id]").click(function(e) { 
        // Prevent a page reload when a link is pressed
      e.preventDefault(); 
      //Remove Body classes that for the responsive right nav layout, don't worry much about those
        $('body').removeClass('menu-push');
        $('body').removeClass('menu-slide');
        // Call the scroll function
      goToByScroll($(this).data("id"), $(this).data("speed"));

  });

//Menu toggle in mobile 
$(document).ready(function() {
    $('.menu-toggle').click(function(e) {
        e.preventDefault();
        if ($(this).data('layout') == "push"){
            $('body').toggleClass('menu-push');
        }
        else if ($(this).data('layout') == "slide"){
            $('body').toggleClass('menu-slide');
        }
    });

    $('.remove-class').click(function() {
        $('body').removeClass('menu-push');
        $('body').removeClass('menu-slide');
    });

});

//Cool Sidebar plugin

$('nav.horizontal-nav > ul > li > a').click(function(e) {
    e.preventDefault();
    var child = $('ul',this);
    var anchor = $(this).parent('li');
    if (anchor.hasClass('active')) {
        anchor.removeClass('active');
        child.animate({
            height: "auto"
        }, 500, function() {

        })
    } else{
        anchor.addClass('active');
        anchor.siblings().removeClass('active');
        child.animate({
            height: "0"
        }, 500, function() {

        })
    };

});

$('.close-panel').click(function(e) {
    e.preventDefault();
    $(this).closest('.panel').fadeOut("slow", function() {});
});




//Codrops nav
(function($){
    $('#menu').prepend('<button type="button" id="menutoggle" class="navtoogle" aria-hidden="true"><i aria-hidden="true" class="icomoon-menu-3"> </i> القـائمـة</button>');
    $('#menutoggle').on('click', function(e) {
        var mobileMenu = $('.js .nav ul');
        if(!$('ul').hasClass('menuClicked')) {
            mobileMenu.animate({'max-height' : '30em'}, 500),
            $('ul').addClass('menuClicked');
        }
        else{
        mobileMenu.animate({'max-height' : '0em'}, 500),
        $('ul').removeClass('menuClicked');
    }
    
    });

})(jQuery); 

//Tabulous.js
/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    var pluginName = "tabulous",
        defaults = {
            effect: 'scale'
        };


    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var links = this.$elem.find('a');
            var firstchild = this.$elem.find('li:first-child').find('a');
            var lastchild = this.$elem.find('li:last-child').after('<span class="tabulousclear"></span>');

            if (this.options.effect == 'scale') {
             tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hidescale');
            } else if (this.options.effect == 'slideLeft') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hideleft');
            } else if (this.options.effect == 'scaleUp') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hidescaleup');
            } else if (this.options.effect == 'flip') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hideflip');
            }

            var firstdiv = this.$elem.find('.tabs-container');
            var firstdivheight = firstdiv.find('div:first').height();

            var alldivs = this.$elem.find('div:first').find('div');

            alldivs.css({'position': 'absolute'});

            firstdiv.css('height',firstdivheight+ 40 +'px');

            firstchild.addClass('tabulous_active');

            links.bind('click', {myOptions: this.options}, function(e) {
                e.preventDefault();

                var $options = e.data.myOptions;
                var effect = firstdiv.data('effect');

                var mythis = $(this);
                var thisform = mythis.parent().parent().parent();
                var thislink = mythis.attr('href');


                firstdiv.addClass('transition');

                links.removeClass('tabulous_active');
                mythis.addClass('tabulous_active');
                thisdivwidth = thisform.find('div'+thislink).height();

                if (effect == 'scale') {
                    alldivs.removeClass('showscale').addClass('make_transist').addClass('hidescale');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showscale');
                } else if (effect == 'slideLeft') {
                    alldivs.removeClass('showleft').addClass('make_transist').addClass('hideleft');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showleft');
                } else if (effect == 'scaleUp') {
                    alldivs.removeClass('showscaleup').addClass('make_transist').addClass('hidescaleup');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showscaleup');
                } else if (effect == 'flip') {
                    alldivs.removeClass('showflip').addClass('make_transist').addClass('hideflip');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showflip');
                }


                firstdiv.css('height',thisdivwidth + 40 +'px');

                


            });

           


         
            
        },

        yourOtherFunction: function(el, options) {
            // some logic
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            new Plugin( this, options );
        });
    };

})( jQuery, window, document );