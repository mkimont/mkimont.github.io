 	
var offsetBooks, offsetBook, widthBooks, xBook, bookContainer, bookBox;

jQuery(document).ready(function($){

// PLACEHOLDER POLYFILL
	$('input, textarea').placeholder();
// MASONARY FOR NEWS
	var grid;
	grid = $('.news').masonry({
	  columnWidth: '.item',
	  itemSelector: '.item',
	  percentPosition: true,
	  gutter: '.gutter-sizer',
	});

	grid.imagesLoaded().progress( function() {
	  grid.masonry('layout');
	});
 // CONTACT FORM
	$('.contact').on('click', function() {
		$('body').toggleClass('show-form');
	})
// MOBILE MENU
	$('.mobile-menu').on('click', function() {
		$('body').toggleClass('show-menu');
	})
// SLIDER HOME HEADER 
	$('.slideshow-container').bxSlider(); 

// BOOK TAMPLATE JS ###################
	 function setBookSize() {
		$('.book-box').each(function(i) { // set book-box width/height for animation
	 		$(this).width($(this).children('.book').width()).height($(this).children('.book').height());
	 	})
	}

	bookContainer = $('body');
	bookBox = $('.books-container .book-box');

	var url = window.location.hash ;
    url = url.substr(1, url.length);
    // if( url.length >= 0 ) {
    // 	bookContainer.removeClass('hide-book-box');
    // }
    if( url.length > 0 && $('.book-box.' + url).length > 0 ) {
    	$('.book-box.' + url).addClass('active-book-box');
    	$('body').addClass('active-book'); 
	    $('.book-box.' + url).trigger('click');
	}
				

 	$('.btn-detail').on('click', function() {
 		var url = window.location.hash ;
    	url = url.substr(1, url.length);
 		bookContainer.removeClass('active-book').addClass('details-active');
 		bookBox.removeClass('active-book-box');
		fullWidth = bookContainer.width() - 22; // book-box margin + menu nav border-left
		fullWidth = ( fullWidth > 1300 ) ? 1300 : fullWidth;
		if( url.length >= 0 ) {
			setTimeout(function() {
				var scrollBox = $('.book-box.' + url).offset();
				$('body').animate({scrollTop: scrollBox.top }, 700);
			},500);
		}
		if( !$('.btn-detail').hasClass('active-btn') ) {
		 	bookBox.each(function(i) { // set book-box width/height for animation
		 		$(this).width($(this).children('.book').width()).height($(this).children('.book').height());
		 	})
			$(this).addClass('active-btn').siblings().removeClass('active-btn');
			bookContainer.addClass('details-active').removeClass('overview-active');
			bookBox.each(function( i ) {
			 	$(this).css({ top: 0 }).width(fullWidth);
			});
		}
		else {
			$('.books-container .book-box').each(function( i ) {
			 	$(this).css({ top: 0 }).width(fullWidth);
			});
		}		
	}); 

	$('.btn-overview').on('click', function() {
		$(this).addClass('active-btn').siblings().removeClass('active-btn');
		$('.active-book-box').removeClass('active-book-box')
		bookContainer.removeClass('active-book');
		bookBox.each(function(i) {
	 		$(this).width('auto').height('auto');
	 	}) 
		if( bookContainer.hasClass('details-active') ) {
			setBookSize();
			bookContainer.removeClass('details-active').addClass('overview-active');
		}
	})

	// $( window ).resize(function() {
	// 	if( !$('.books-container').hasClass('details-active') ) {
	// 		$('.book-box').each(function(i) {
	// 	 		$(this).width($(this).children('.book').width());
	// 	 		$(this).height($(this).children('.book').height());
	// 	 	})
	// 	}
	// })

	$('.book-slug').on('click', function(e) {
		e.preventDefault();
		hash = $('.book-slug').attr('href');
		if(history.pushState) {
	    	history.pushState(null, null, hash);
		} 
		else {
		    location.hash = hash;
		}
	}); 
 
	bookBox.on('click touch tap', function(e) {
		if ( $('body').hasClass('home')) {
			return;
		}
		e.preventDefault;
		$(this).addClass('active-book-box');
		bookContainer.removeClass('details-active');
		if( !bookContainer.hasClass('active-book') ) {
			if(history.pushState) {
			    history.pushState(null, null, '#' + $(this).data('id'));
			}
			else {
			    location.hash = '#' + $(this).data('id');
			}
			setBookSize();
		 	$(this).width($(this).children('.book').width()).height($(this).children('.book').height());
		 	fullWidth = $('body').width(); // book-box margin + menu nav border-left
		 	$(this).width(fullWidth);
		 	bookContainer.addClass('active-book'); 
		 	var detailHeight = $(this).children('.book-details').children('.book-post-details').height();
		 	$(this).height( 'auto');
		} 
		else {
		 	// $(this).css({'width':'auto', 'height':'auto'});
		 	// $('.book-box').each(function(i) {
		 	// 	$(this).width('auto').height('auto');
		 	// }) 
		 	// $('.books-container').removeClass('active-book');
		 	// $('.active-book-box').removeClass('active-book-box');
		}
	});

	$('.book-box .book').on('click touch tap', function(e) {
		if ( bookContainer.hasClass('active-book') || ($('.books-container').hasClass('active-book') && $('.btn-detail').hasClass('active-btn')) ) {
			e.preventDefault;
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
		if( $('.btn-detail').hasClass('active-btn') ) {
			$('.btn-detail').trigger('click');
			return;
		}
		else if( bookContainer.hasClass('active-book') ) {
		 	$(this).parent().css({'width':'auto', 'height':'auto'});
		 	bookContainer.removeClass('active-book');
		 	$('.active-book-box').removeClass('active-book-box');
		 	setTimeout(function() {
			 	bookBox.each(function(i) {
			 		$(this).width($(this).find('.book').width()).height($(this).find('.book').height());
			 	}) 
		 		
		 	}, 300);
		}	
	});

	$('.books-container .arrow').on('click', function() {
		$('body').animate({scrollTop: "1100px" }, 700);
	})


	$(window).on('scroll', function() {
		var mainPos = $('#main').offset();
		var scrollPos = $('body').scrollTop();
		var mainStart = mainPos.top - $('body').height();
		var move = scrollPos -mainStart;
		//alert(scrollPos  + ' > ' + mainStart);
		if( scrollPos >  (mainStart-30) ) {
			//alert(mainStart + ' scroll:' + scrollPos);
			$('.social-container').css('bottom', (move + 30) + 'px');
		}
		else {
			$('.social-container').css('bottom', 0);
		}
		if( scrollPos >  (mainStart) ) {
			//alert(mainStart + ' scroll:' + scrollPos);
			$('.image-fixed').css('bottom', move + 'px');
		}
		else {
			$('.image-fixed').css('bottom', 0);	
		}	
	})

});  
 
 // 	window.addEventListener("load",function() {
	// // Set a timeout...
	// setTimeout(function(){
	// 	// Hide the address bar!
	// 	window.scrollTo(0, 1);
	// }, 0);
//});