/***
 * 
 * Summary: Chooses which images to show based on device screen size.
 * 
 * 
 * breakpoint attribute names:
 * data-minscreenwidth
 * data-maxscreenwidth
 * data-minscreenheight
 * data-maxscreenheight
 * 
 * 
 * usage: 
 * add responsive-image class to the parent element
 * add the data-*screen* attributes to IMGs inside(they don't have to be direct descendents)
 * ????
 * profit
 * 
 * Example:
  
  <a class="responsive-image no-underline" href="/">
   <img data-minscreenwidth="800px" src="images/logos/logos_small.png" alt="Tigerware" />
   <img data-maxscreenwidth="799px" src="images/logos/logos_large.png" alt="Tigerware" />
  </a>


  responsiveimage will choose either the first or the second image based on the screen size
 * 
 * 
 */

var $ = require('vendor/jquery.min');
module.exports = function() {

    var classname = '.responsive-image',
	    px = 'px',
	    minwidthattr = 'data-minscreenwidth',
	    maxwidthattr = 'data-maxscreenwidth',
	    minheightattr = 'data-minscreenheight',
	    maxheightattr = 'data-maxscreenheight',
        oldDisplayAttr = 'data-olddisplay',
	    viewPortWidth = $(window).width(),
	    viewPortHeight = $(window).height()
	    ;

    $(classname).each(function(index,imagegroup) {
        $(imagegroup).find('img').each(function(imgindex,img) {

            var $img = $(img),
            	minwidth = parsePx($img.attr(minwidthattr)),
            	maxwidth = parsePx($img.attr(maxwidthattr)),
            	minheight = parsePx($img.attr(minheightattr)),
                maxheight = parsePx($img.attr(maxheightattr))
            	;

            //if an attribute is not defined, set a sensible default because null pointers
            minwidth = minwidth ? minwidth : 0;
            minheight = minheight ? minheight : 0;
            maxwidth = maxwidth ? maxwidth : Infinity;
            maxheight = maxheight ? maxheight : Infinity;

            
            if (hideWidth(viewPortWidth, minwidth, maxwidth) ||hideHeight(viewPortHeight, minheight, maxheight)) {
                /** 
                 *gets the old display property and sets it 
                 * as an attribute so we can remember in case we need to show this again
                 **/
                $img.attr({ oldDisplayAttr: $img[0].style.display });
                
                $img
                    .addClass('hidden')
                    .css({ display: 'none' });
            } else {
                var displaysetting = $img.attr(oldDisplayAttr);
                displaysetting = displaysetting ? displaysetting : '';
                $img
                    .removeClass('hidden')
                    .css({display:displaysetting});
            }

        });


    });


    //parses '800px' or '800' to the integer 800
    function parsePx(pxstr) {
        if (!pxstr) {
            return null;
        }
        //does pxstr contain 'px'?
        if (pxstr.indexOf(px) > -1) {
            return parseInt(pxstr.split(px).shift());
        } else {
            return parseInt(pxstr);
        }
    }


    //returns true if the screenwidth is too small or too large
    function hideWidth(screenWidth, minwidth, maxwidth) {
        return !(screenWidth > minwidth && screenWidth < maxwidth);
    };
    //returns true if the screenheight is too small or too large
    function hideHeight(screenHeight,minheight,maxheight) {
        return !(screenHeight > minheight && screenHeight < maxheight);
    }
};