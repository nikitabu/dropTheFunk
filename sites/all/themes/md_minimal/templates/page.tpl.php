<div id="page" class="<?php print $classes; ?>"<?php print $attributes; ?>>

  <!-- ______________________ HEADER _______________________ -->

  <div id="header">
    <div id="logo">
      <?php if ($logo): ?>
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>"/>
        </a>
      <?php else: ?>
      	<a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><?php print $site_name; ?></a>
      <?php endif; ?>
    </div>

		<?php if ($main_menu): ?>
      <div id="navigation" class="menu <?php if (!empty($main_menu)) {print "with-primary";} if (!empty($secondary_menu)) {print " with-secondary";} ?>">
        <?php print theme('links', array('links' => $main_menu, 'attributes' => array('id' => 'main-menu', 'class' => array('links', 'clearfix', 'main-menu')))); ?>
      </div>
    <?php endif; ?>
    
  </div> <!-- /header -->

  <!-- ______________________ MAIN _______________________ -->

  <div id="main" class="clearfix">
    <div id="content">
			<?php if ($breadcrumb || $title|| $messages || $tabs || $action_links): ?>
        <div id="content-header">

          <?php if ($page['highlight']): ?>
            <div id="highlight"><?php print render($page['highlight']) ?></div>
          <?php endif; ?>

          <?php if ($title): ?>
            <h1 class="title"><?php print $title; ?></h1>
          <?php endif; ?>

          <?php print $messages; ?>
          <?php print render($page['help']); ?>

          <?php if ($tabs): ?>
            <div class="tabs"><?php print render($tabs); ?></div>
          <?php endif; ?>

          <?php if ($action_links): ?>
            <ul class="action-links"><?php print render($action_links); ?></ul>
          <?php endif; ?>
          
        </div> <!-- /#content-header -->
      <?php endif; ?>

      <div id="content-area">
        <?php print render($page['content']) ?>
      </div>
    </div>
  </div> <!-- /main -->

  <!-- ______________________ FOOTER _______________________ -->

  <?php if ($page['footer']): ?>
    <div id="footer" class="clearfix">
      <div class="copyright">&copy; <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><?php print $site_name; ?></a> <?php print date('Y');?></div>
      <div class="credits">Powered by <a href="http://drupal.org">Drupal</a>. Theme by <a href="http://megadrupal.com">MegaDrupal</a></div>
    </div> <!-- /footer -->
  <?php endif; ?>

<!-- Stratus-->

	<div id="stratus">

		<div id="drawer">
			<div id="artwork"><img/></div>
			<ul id="tracks"></ul>
		</div>

		<div id="player">

			<div id="controls">
				<span class="prev">Previous</span>
				<span class="toggle">
					<span class="play">Play</span>
					<span class="play">Play</span>
					<span class="pause">Pause</span>
				</span>
				<span class="next">Next</span>
			</div>
			
			<div id="time">
				<div class="played"></div>
				<canvas id="waveform"></canvas>
				<div class="loaded"></div>
				<div class="position"></div>
			</div>
			
			<div class="track"></div>
			
			<ul id="buttons"></ul>
			
			<ul id="stats"></ul>

			<div id="share"></div>

			<div id="comment">
				<img id="avatar"/>
				<div id="add">
					<input type="text" placeholder="Add your comment"/>
				</div>
				<span class="close commenting">Close</span>
			</div>
		
		</div>
	
	</div>
	
	<!-- Templates (made with iCanHaz.js)  -->

	<script id='track' type='text/html'>
	  {{#user}}
		<span class='user'>{{username}}</span>
	  {{/user}}
	  <span class='title'>{{title}}</span>
	  <span class='duration'>{{timecode}}</span>
	</script>

	<script id='current' type='text/html'>
	  {{#user}}
		<a href='{{permalink_url}}' class='user' target='_blank'>{{username}}</a>
	  {{/user}}
	  <a href='{{permalink_url}}' class='title' target='_blank'>{{title}}</a>
	  <span class='duration'>{{timecode}}</span>
	</script>
	
	<script id="buttons" type="text/html">
	  <li class='share'>
		<span>Share</span>
	  </li>
	  <li class='button comment'>
		<span>Comment</span>
	  </li>
	  <li class='button love'>
		<span>Love</span>
	  </li>
	  {{#downloadable}} <!-- if downloadable is true, show the download button -->
		  <li class='button download'>
			<a href='{{permalink_url}}/download' target='_blank'>Download</a>
		  </li>
	  {{/downloadable}}
	  {{#purchase_url}}
		  <li class='button purchase'>
			<a href='{{purchase_url}}' target='_blank'>Purchase</a>
		  </li>
	  {{/purchase_url}}
	  <li class='button popup'>
		<span>Popup</span>
	  </li>
	  <li class='soundcloud'>
		<a href='http://stratus.sc' target='_blank'>Stratus</a>  <!-- _blank opens in a new tab -->
	  </li>
	</script>
	
	<script id='stats' type='text/html'>
	  <li class='plays'>
		  <span>Plays</span>
		  {{playback_count}}
	  </li>
	  <li class='comments'>
		  <span>Comments</span> 
		  {{comment_count}}
	  </li>
	  <li class='favorites'>
		  <span>Favoritings</span> 
		  {{favoritings_count}}
	  </li>
	</script>
	
	<script id='share' type='text/html'>
	
		<ul id='social'>
			<li><a href='http://facebook.com/sharer.php?u={{permalink_url}}' class='facebook' target='_blank'>Facebook</a></li>
			<li><a href='http://twitter.com/intent/tweet?url={{permalink_url}}' class='twitter' target='_blank'>Twitter</a></li>
			<li><a href='https://m.google.com/app/plus/x/?v=compose&amp;content={{permalink_url}}' class='google' target='_blank'>Google+</a></li>
			<li><a href='mailto:?subject={{title}}{{#user}} by {{username}}{{/user}}%20-%20SoundCloud&amp;body={{permalink_url}}' class='email'>Email</a></li>
			<li><a href='http://www.tumblr.com/share/audio?externally_hosted_url={{permalink_url}}' class='tumblr' target='_blank'>Tumblr</a></li>
			<li><a href='http://www.reddit.com/submit?url={{permalink_url}}' class='reddit' target='_blank'>Reddit</a></li>
			<li><a href='http://www.blogger.com/blog-this.g?n={{title}}{{#user}} by {{username}}{{/user}}&amp;u={{permalink_url}}' class='blogger' target='_blank'>Blogger</a></li>
			<li><a href='http://www.stumbleupon.com/submit?url={{permalink_url}}&amp;title=${share}' class='stumble' target='_blank'>StumbleUpon</a></li>
		</ul>	
		  
		<div id='embed'>
			Embed: <input type='text' value='&lt;iframe width=&quot;100%&quot; height=&quot;166&quot; scrolling=&quot;no&quot; src=&quot;http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F{{id}}&amp;auto_play=false&amp;show_artwork=true&quot; frameborder=&quot;0&quot; &gt;&lt;/iframe&gt;'>
		</div>
		<span class='close sharing'>Close</span>
		
	</script>
	
	<script id='theme' type='text/html'>
		<style>
			{{#color}}
				#stratus .toggle, #stratus .played{ background: {{ base }} !important; }
				#stratus .toggle:hover{ background-color: {{ dark }} !important; }
				#stratus .position{ background-color: {{ light }} !important; }
				#stratus .loaded{ border-color: {{ light }} !important; }
				#stratus #tracks li.current{ background-color: {{light }} !important; }
			{{/color}}
			
			{{#top}}
				#stratus #player{ top: 0; }
				#stratus #drawer{ top: 32px; border-width: 0 0 1px 0; }
			{{/top}}
			
			{{^user}} <!-- if user is false, don't display user, set to unimportant -->
				#stratus .user{ display: none !important; }
			{{/user}}	
			
			{{^download}}
				#stratus .download{ display: none !important; }
			{{/download}}	
			
			{{^buying}}
				#stratus .purchase{ display: none !important; }
			{{/buying}}	
			
			{{^stats}}
				#stratus #stats{ display: none !important; }
			{{/stats}}
			
			{{^redirect}}
				#stratus .love, #stratus .comment{ display: none !important; }
			{{/redirect}}
		</style>
	</script>
  

</div> <!-- /page -->
