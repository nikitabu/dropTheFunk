(function() {
  
  var $;
  $ = jQuery;
  
  //what is this doing?
  $.fn.stratus = function(settings) {
    return $.stratus(settings);
  };
  
  $.stratus = function(settings) {
    var root_url, src;
    
	//if in dev mode, load example.com
	root_url = settings.env === 'development' ? 'http://example.com:3000' : 'player';
    
	//add the stratus css to the header
	$('head').append("<link rel='stylesheet' href='" + root_url + "/stratus.css' type='text/css'/>");
	
	//these 4 lines are adding styling info to the html
    if (settings.align === 'top') {
      $('head').append("<style>#stratus{ top: 0; }</style>");
    }
    if (settings.position === 'absolute') {
      $('head').append("<style>#stratus{ position: absolute; }</style>");
    }
    if (settings.offset) {
      $('head').append("<style>#stratus{ " + settings.align + ": " + settings.offset + "px !important; }</style>");
    }
	
	//add the stratus iframe to the page
    $('body').append("<div id='stratus'><iframe allowtransparency='true' frameborder='0' scrolling='0'></div>");
	
	//prepare the query which will be postMessage'd to stratus.sc
	// src = root_url + 'player?' + serialized settings + current location 
    src = root_url + '/player?' + $.param(settings, true) + '&link=' + encodeURIComponent(document.location.href);
	
	//set the src of the stratus iframe to the above value
    $('#stratus iframe').attr({
      src: src
    });
	
	//loads into the iframe the player's css file and makes it visible
    $('#stratus iframe').load(function() {
      return $(this).css({
        visibility: 'visible'
      });
    });
    
	//display stratus
	$('#stratus').show();
    
	//sets all links on the page with id=stratus to send a message to stratus.src with info on the next song to play
	//this needs to be included on the end of every ajax'd page so that it properly triggers the player
	//unsure why the song info in the src doesn't need to match the song to be played (see code in Drupal)
	//unsure why it returns false, shouldn't make a difference
	//$.postMessage( message, target_url, frame )
	$('a.stratus').click(function() {
      //$.postMessage($(this).attr('href'), src, $('#stratus iframe')[0].contentWindow);
	  $.postMessage($(this).attr('href'), 'player', $('#stratus iframe')[0].contentWindow);
      return false;
    });
  
  
}).call(this); //define the function and immediatelly call itself 