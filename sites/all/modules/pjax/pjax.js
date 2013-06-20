(function($) {

/**
 * Handles click events on selected links and loads the corresponding pages 
 * through pjax.
 */
Drupal.behaviors.pjax = {
  attach: function(context) {
	
	console.log("Drupal Behaviors Attached");

	jQuery('a.stratus').click(function() {
			source = "http://stratus.sc/player?auto_play=false&links=https%3A%2F%2Fsoundcloud.com%2Fdillonfrancis%2Fcalvin-harris-dillon-francis&download=false&color=red&theme=http%3A%2F%2Fwww.evolutionsocial.com%2Fsupertopsecret%2FstratusThemeDark.css&link=http%3A%2F%2Fevolutionsocial.com%2Fsupertopsecret%2F"
			jQuery.postMessage(jQuery(this).attr('href'), source, jQuery('#stratus iframe')[0].contentWindow);
			console.log("stratus attached to links");
			return false;
		});

    // The defaults attribute is only available in browsers that support pjax.
    if (!$.pjax.defaults) {
      return;
    }

    // Set defaults.
    $.pjax.defaults.scrollTo = Drupal.settings.pjax.scrollto !== "" ? parseInt(Drupal.settings.pjax.scrollto) : false;
    $.pjax.defaults.timeout = Drupal.settings.pjax.timeout;

    // Only proceed if a content selector is defined.
    if (Drupal.settings.pjax.contentSelector) {
      // Run the behavior just once on the content selector.
      $(Drupal.settings.pjax.contentSelector, context).once("pjax", function() {
        var $content = $(this);
        var $pjaxLinks;

        // Enable pjax for selected links.
        // pjax() uses live(), so links that are removed and re-added will still work.
        if (Drupal.settings.pjax.linksSelector) {
          $pjaxLinks = $(Drupal.settings.pjax.linksSelector);
          //$pjaxLinks.pjax(null, Drupal.settings.pjax.contentSelector)

	  console.log("links selector set");
	  console.log(Drupal.settings.pjax.linksSelector);
	  console.log(Drupal.settings.pjax.contentSelector);

	  $(document).pjax(Drupal.settings.pjax.linksSelector, Drupal.settings.pjax.contentSelector);
            // Add 'loading' class.

	  console.log( $(document).pjax(Drupal.settings.pjax.linksSelector, Drupal.settings.pjax.contentSelector) );

          //$(document).live('click', function(e) {
          //  $(this).addClass("pjax-link-loading");
          // });

	  $(document).on('click', Drupal.settings.pjax.linksSelector, function(event) {
	     console.log("Clicked on Selector");
	     $(this).addClass("pjax-link-loading");
	  })
        }

        // Catch pjax start/end events.
        $content
          .bind('pjax:start', function() {
            // Detach JS behaviors when loading new content.
            Drupal.detachBehaviors($content, Drupal.settings);

            // Add 'loading' class.
            $content.addClass("pjax-loading");

	    console.log("pjax loading");

            // Remove 'active' class from links.
            if ($pjaxLinks) {
              $pjaxLinks.removeClass("active");            
            }
          })
          .bind('pjax:end', function() {
            // Re-attach JS behaviors when content has loaded.
            Drupal.attachBehaviors($content, Drupal.settings);

            // Remove 'loading' class.
            $content.removeClass("pjax-loading");

	    console.log("pjax loaded");

            // Update classes on the clicked link.
            if ($pjaxLinks) {
              $pjaxLinks.filter(".pjax-link-loading")
                .removeClass("pjax-link-loading")
                .addClass("active");
            }
          });

      });
    }
  }
}

})(jQuery);
