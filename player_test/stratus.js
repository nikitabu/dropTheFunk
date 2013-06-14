(function() {
  
  var $;
  $ = jQuery;
  
  
  // this is just a copy of the jQuery postMessage plugin.  enables cross-domain communication. (to get player from stratus.sc)
  //(function(){}(jQuery)) invokes the function with jQuery as the argument
  (function($){var g,d,j=1,a,b=this,f=!1,h="postMessage",e="addEventListener",c,i=b[h]&&!$.browser.opera;$[h]=function(k,l,m){if(!l){return}k=typeof k==="string"?k:$.param(k);m=m||parent;if(i){m[h](k,l.replace(/([^:]+:\/\/[^\/]+).*/,"$1"))}else{if(l){m.location=l.replace(/#.*$/,"")+"#"+(+new Date)+(j++)+"&"+k}}};$.receiveMessage=c=function(l,m,k){if(i){if(l){a&&c();a=function(n){if((typeof m==="string"&&n.origin!==m)||($.isFunction(m)&&m(n.origin)===f)){return f}l(n)}}if(b[e]){b[l?e:"removeEventListener"]("message",a,f)}else{b[l?"attachEvent":"detachEvent"]("onmessage",a)}}else{g&&clearInterval(g);g=null;if(l){k=typeof m==="number"?m:typeof k==="number"?k:100;g=setInterval(function(){var o=document.location.hash,n=/^#?\d+&/;if(o!==d&&n.test(o)){d=o;l({data:o.replace(n,"")})}},k)}}}})(jQuery);;
  
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
    
	//display the links with id=stratus
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
    
	//seems to be returning the info recieved from either stratus.sc or directly from soundcloud on the next song to play
	//receiveMessage registers a single callback for a postMessage call
	//$.receiveMessage( callback, source_origin ] );
	/* return $.receiveMessage(function(e) {
      return $('#stratus').toggleClass('open'); //toggle the 'open' class
    }, root_url); */
	
	return $.receiveMessage(function(e) {
      return $('#stratus').toggleClass('open'); //toggle the 'open' class
    }, root_url);
  };
  
  
  
}).call(this); //define the function and immediatelly call itself 