/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    // headline size is set in CSS (no resize after load, so no flash)


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    // stop below the fixed menu bar (desktop) so it doesn't cover the section
	    var navOffset = ($(window).width() > 767 && target !== '#home') ? $('#nav-wrap').outerHeight() : 0;

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top - navOffset
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   // one screen of photo, plus the fade strip that sits below the fold
   function sizeHeader() {
      var fade = parseInt(getComputedStyle(document.getElementById('home')).getPropertyValue('--hero-fade'), 10) || 0;
      // min-height (not height) so the content can make it taller on short screens
      $('header').css({ 'min-height': $(window).height() + fade });
   }
   sizeHeader();
   $(window).on('resize', sizeHeader);


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');
      // the bar comes back (solid) once the next section reaches it
      var showAt = h - nav.outerHeight() - 2;

	   if ( (y > h*.20) && (y < showAt) && ($(window).outerWidth() > 768 ) ) {
	      nav.stop(true, true).fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').stop(true, true).fadeIn('fast');
         }
         else {
            nav.addClass('opaque').stop(true, true).fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });



/*----------------------------------------------------*/
/*	contact form
/*  The site is static (GitHub Pages), so PHP can't run.
/*  Validate the form, then open the visitor's mail app
/*  with the message pre-filled.
------------------------------------------------------ */

   $('#contactForm').on('submit', function(e) {
      e.preventDefault();

      var name    = $.trim($('#contactName').val());
      var email   = $.trim($('#contactEmail').val());
      var subject = $.trim($('#contactSubject').val());
      var message = $.trim($('#contactMessage').val());
      var errors  = [];

      if (name.length < 2) errors.push('Please enter your name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
      if (!subject) errors.push('Please enter a subject.');
      if (message.length < 15) errors.push('Please enter your message. It should have at least 15 characters.');

      if (errors.length) {
         $('#message-warning').text(errors.join(' ')).fadeIn();
         return;
      }

      var body = message + '\n\n--\n' + name + ' <' + email + '>';
      window.location.href = 'mailto:behnam@maneshgar.com' +
         '?subject=' + encodeURIComponent(subject) +
         '&body=' + encodeURIComponent(body);

      $('#message-warning').hide();
      $('#message-success').fadeIn();
   });


/*----------------------------------------------------*/
/*	Publications: show the 2 most recent, expand on click
------------------------------------------------------ */

   var $pubs = $('.pub-list');
   var pubCount = $pubs.children('li').length;
   if (pubCount > 2) {
      var $toggle = $('<button type="button" class="pub-toggle" aria-expanded="false"></button>');
      var setLabel = function(open) {
         $toggle.html(open ? 'Show fewer<i class="fa fa-angle-up"></i>'
                           : 'Show all<i class="fa fa-angle-down"></i>')
                .attr('aria-expanded', open);
      };
      $pubs.addClass('is-collapsed').after($toggle);
      setLabel(false);
      $toggle.on('click', function() {
         var open = $pubs.toggleClass('is-collapsed').hasClass('is-collapsed') === false;
         setLabel(open);
         if (!open) $('html, body').animate({ scrollTop: $pubs.offset().top - 80 }, 300);
      });
   }


/*----------------------------------------------------*/
/*	Latest journal posts: staggered fade between groups of cards
------------------------------------------------------ */

   var $heroTrack = $('.hero-track');
   if ($heroTrack.length) {
      var $cards = $heroTrack.children('.hero-card');
      var $dots = $('<div class="hero-dots" role="tablist" aria-label="Latest journal pages"></div>').insertAfter($heroTrack);
      var perPage, pages, page = 0, timer = null, busy = false;
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var STAGGER = 110, FADE = 550, INTERVAL = 6000;

      function pageCards(i) { return $cards.slice(i * perPage, i * perPage + perPage); }

      function layout() {
         var w = $(window).width();
         perPage = w >= 1320 ? 3 : (w >= 880 ? 2 : 1);
         // at most 5 rotations, using only the most recent posts
         pages = Math.min(5, Math.ceil($cards.length / perPage));
         if (page >= pages) page = 0;
         $heroTrack.addClass('is-ready');
         $cards.addClass('is-hidden').removeClass('is-leaving is-arriving');
         pageCards(page).removeClass('is-hidden');
         $dots.empty().toggle(pages > 1);
         for (var i = 0; i < pages; i++) {
            $('<button type="button" role="tab"></button>')
               .attr('aria-label', 'Show page ' + (i + 1))
               .toggleClass('is-active', i === page)
               .data('page', i)
               .appendTo($dots);
         }
      }

      function show(next) {
         if (busy || next === page || pages < 2) return;
         busy = true;
         var $out = pageCards(page), $in = pageCards(next);
         $dots.children().removeClass('is-active').eq(next).addClass('is-active');
         if (reduce) { $out.addClass('is-hidden'); $in.removeClass('is-hidden'); page = next; busy = false; return; }

         // 1. current cards fade up, one after another
         $out.each(function (i, el) { setTimeout(function () { $(el).addClass('is-leaving'); }, i * STAGGER); });
         setTimeout(function () {
            $out.addClass('is-hidden').removeClass('is-leaving');
            // 2. next cards rise in, one after another
            $in.addClass('is-arriving').removeClass('is-hidden');
            $in[0] && $in[0].offsetWidth; // apply the start position before animating
            $in.each(function (i, el) { setTimeout(function () { $(el).removeClass('is-arriving'); }, 30 + i * STAGGER); });
            page = next;
            setTimeout(function () { busy = false; }, FADE + $in.length * STAGGER);
         }, FADE + ($out.length - 1) * STAGGER);
      }

      function start() { stop(); timer = setInterval(function () { show((page + 1) % pages); }, INTERVAL); }
      function stop() { if (timer) clearInterval(timer); timer = null; }

      $dots.on('click', 'button', function () { show($(this).data('page')); start(); });
      $('.hero-latest').on('mouseenter focusin', stop).on('mouseleave focusout', start);

      var resizeTimer;
      $(window).on('resize', function () {
         clearTimeout(resizeTimer);
         resizeTimer = setTimeout(function () { var before = perPage; layout(); if (perPage !== before) start(); }, 200);
      });

      layout();
      start();
   }


/*----------------------------------------------------*/
/*	Footer year
------------------------------------------------------ */

   $('#year').text(new Date().getFullYear());

});
