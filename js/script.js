$(document).ready(function(){

    // NAVIGATION DRAWER

    var navigationDrawerOpen = $('.drawerOpen');
    var navigationDrawerClose = $('.drawerClose');
    var navigationDrawer = $('.drawer');

    navigationDrawerClose.click(function() {
      toggleDrawer(-40);
    });

    navigationDrawerOpen.click(function() {
      toggleDrawer(0);
    });

    function toggleDrawer(value) {
      navigationDrawer.animate({left : value + 'vw'}, {
        duration : 500
      });
    }

    // CAROUSEL

    var duration = 500;
    var delay = 2000;
    var shift = 0;
    var slider = $('.slider');
    var size = $('.slider').children().length;
    var controllerLeft = $('.controllerLeft');
    var controllerRight = $('.controllerRight');

    slider.append(slider.children().first().clone());

    slider.children().each(function(){
        $(this).css({
            'background-image' : 'url(' + $(this).find('img').hide().attr('src') + ')',
            'background-repeat': 'no-repeat',
            'background-position' : 'center',
            'background-size' : 'cover'
        });
    });

    enableController();

    var timeout = setTimeout(shiftRight, delay);

    function shiftRight() {
        
        if (size === shift/-100) {
          shift = 0;
          slider.css({left : shift + '%'})
        }

        disableController();
        clearTimeout(timeout);

        shift -= 100;
        shiftSlider();
    }

    function shiftLeft() {

        if (shift === 0) {
          shift = -100*size;
          slider.css({left : shift + '%'})
        }

        disableController();
        clearTimeout(timeout);

        shift += 100;
        shiftSlider();
    }

    function shiftSlider() {
      slider.animate({left : shift + '%'}, {
        duration : duration,
        complete : onComplete,
      });
    }

    function onComplete() {
      enableController();
      timeout = setTimeout(shiftRight, delay);
    }

    function disableController() {
      controllerLeft.unbind('click');
      controllerRight.unbind('click');
    }

    function enableController() {
      controllerLeft.click(shiftLeft);
      controllerRight.click(shiftRight);
    }

});
