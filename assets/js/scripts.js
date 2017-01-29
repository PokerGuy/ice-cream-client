/*

◄------------------------------------------------------------► 
This file includes all cusomized javascript and all plugins libraries options 
◄------------------------------------------------------------►

*/

(function ()
{
  //-- Enable Use Strict Mode --
  "use strict";

  //--Preloaing Effect --
  jQuery(window).load(function(){
    jQuery('.loading-container').css({'opacity' : 0 , 'display' : 'none'});
    jQuery('.all-wrapper').css({'opacity' : 1 , 'visibility' : 'visible'});
    jQuery('.switcher').css({'opacity' : 1 , 'visibility' : 'visible'});
    jQuery('.back-to-top').css({'opacity' : 1 , 'visibility' : 'visible'});
  });

  //--------------------------------------------------------------------------------------------


  //-- customizing position of loading container --
  var jQueryloadingContainer = jQuery('.loading-container');

  jQueryloadingContainer.resize(function(){
    jQuery('.loading-container').css({ 
      'margin-left' : - jQueryloadingContainer.width() / 2 , 
      'margin-top' : - jQueryloadingContainer.height()  / 2
    });
  });

  jQueryloadingContainer.trigger('resize');
  //--------------------------------------------------------------------------------------------



  //-- customizing homeslider slide width --
  // var jQueryallWrapper = jQuery('.all-wrapper');

  // jQueryallWrapper.resize(function(){
  //   jQuery('.slider-home .slide').css({
  //     'width' : jQueryallWrapper.width()
  //   });
  // });

  // jQueryallWrapper.trigger('resize');
  //--------------------------------------------------------------------------------------------


  //-- Tooltip --
  jQuery(document).ready(function(){
    jQuery('.tooltip-h').tooltip();
  });
  //--------------------------------------------------------------------------------------------


  //-- Alert Custom closing effect --
  jQuery('.alert-general .close').click(function () {
    jQuery('.alert-general').slideToggle(500);
  });

  jQuery('.alert-success .close').click(function () {
    jQuery('.alert-success').slideToggle(500);
  });

  jQuery('.alert-warning .close').click(function () {
    jQuery('.alert-warning').slideToggle(500);
  });


  jQuery('.alert-info .close').click(function () {
    jQuery('.alert-info').slideToggle(500);
  });

  jQuery('.alert-error .close').click(function () {
    jQuery('.alert-error').slideToggle(500);
  });

  jQuery('.alert-attention .close').click(function () {
    jQuery('.alert-attention').slideToggle(500);
  });
  //--------------------------------------------------------------------------------------------



  /* ◄------ All Carousels Init al over the template -------------------------------► */

  //-- Slider --
  jQuery(document).ready(function() {

    //Init the carousel
    jQuery(".slider").owlCarousel({
      animateIn: 'owl-fadeUp-in',
      animateOut: 'owl-fadeUp-out',
      items:1,
      margin:0,
      loop:true,
      autoplay:true,
      autoplayTimeout:6000,
      autoplayHoverPause:false,
      nav: true,
      dots: true,
      stagePadding:0,
      smartSpeed:1000,
      mouseDrag: true,
      touchDrag: true,
      responsive:{
        0:{
          items:1,
          slideBy: 1
        }
      }
    });

  });
  //--------------------------------------------------------------------------------------------

  //-- carousel-col-1  --
  jQuery(document).ready(function() {

    var owl = jQuery(".carousel-col-1");

    owl.owlCarousel({
      nav : true,
      dots : true,
      loop:true,
      autoplay : true,
      autoplayHoverPause: true,
      items : 1, 
      responsive:{
        0:{
            items:1,
            slideBy: 1
        }
      }
    });
  });
  //--------------------------------------------------------------------------------------------

  //-- carousel-col-3  --
  jQuery(document).ready(function() {

    var owl = jQuery(".carousel-col-2");

    owl.owlCarousel({
      nav : true,
      dots : true,
      loop:true,
      autoplay : true,
      autoplayHoverPause: true,
      items : 2, 
      responsive:{
        0:{
            items:1,
            slideBy: 1
        },
        768:{
            items:1,
            slideBy: 1
        },
        1000:{
            items:2,
            slideBy: 2
        }
      }
    });
  });
  //--------------------------------------------------------------------------------------------

  //-- carousel-col-3  --
  jQuery(document).ready(function() {

    var owl = jQuery(".carousel-col-3");

    owl.owlCarousel({
      nav : true,
      dots : true,
      loop:true,
      autoplay : true,
      autoplayHoverPause: true,
      items : 3, 
      responsive:{
        0:{
            items:1,
            slideBy: 1
        },
        992:{
            items:2,
            slideBy: 2
        },
        1200:{
            items:3,
            slideBy: 3
        }
      }
    });
  });
  //--------------------------------------------------------------------------------------------


  //-- carousel-col-4  --
  jQuery(document).ready(function() {

    var owl = jQuery(".carousel-col-4");

    owl.owlCarousel({
      nav : true,
      dots : true,
      loop:true,
      autoplay : true,
      autoplayHoverPause: true,
      items:4,
      responsive:{
        0:{
            items:1,
            slideBy: 1
        },
        768:{
            items:2,
            slideBy: 2
        },
        992:{
            items:3,
            slideBy: 3
        },
        1200:{
            items:4,
            slideBy: 4
        }
      }
    });
  });
  //--------------------------------------------------------------------------------------------



  /* ◄------ Foucs and Blur for textarea -------------------------------► */
  jQuery(document).ready(function() {
    
    var watermark = jQuery('textarea').attr('data-placeholder');
    
    //init, set watermark text and class
    jQuery('.contact-message , .comment-message , .order-message').val(watermark).addClass('input-bar');
    
    //if blur and no value inside, set watermark text and class again.
    jQuery('.contact-message , .comment-message , .order-message').blur(function(){
        if (jQuery(this).val().length == 0){
          jQuery(this).val(watermark).addClass('input-bar');
      }
    });

    //if focus and text is watermrk, set it to empty and remove the watermark class
    jQuery('.contact-message , .comment-message , .order-message').focus(function(){
        if (jQuery(this).val() == watermark){
          jQuery(this).val('').removeClass('input-bar');
      }
    });
    
  });
  //--------------------------------------------------------------------------------------------

  /* ◄------ Language filter (facny select) -------------------------------► */
  jQuery(document).ready(function() {
    jQuery('#language').fancySelect();
  });
  //--------------------------------------------------------------------------------------------
  
  /* ◄------ Pretty Social -------------------------------► */
  jQuery(document).ready(function() {
    $('.pretty-social').prettySocial();
  });


  /* ◄------ Ticker -------------------------------► */
  jQuery(document).ready(function() {
    var nt_example1 = jQuery('.ticker').newsTicker({
      row_height: 103,
      max_rows: 3,
      duration: 4000
    });
  });
  //--------------------------------------------------------------------------------------------


  /* ◄------ Nice Scroll -------------------------------► */

  //-- The whole page --
  jQuery("html").niceScroll({
    cursorborder: 0,
    cursorcolor: '#171717',
    autohidemode: true,
    zindex: 9999999,
    scrollspeed: 60,
    mousescrollstep: 100,
    cursorwidth: 6,
    horizrailenabled: false,
    cursorborderradius: 3
  });
  //--------------------------------------------------------------------------------------------

  /* ◄------ Scroll To Top -------------------------------► */
  //-- scroll to top --
  jQuery(document).ready(function() {
    var duration = 1500;

    jQuery('.back-to-top').click(function(e) {
        e.stopPropagation();
        jQuery('body,html').animate({
        scrollTop: 0
    }, duration);
        return false;
    })
  });
  //--------------------------------------------------------------------------------------------


  /* ◄------ Accordion & Toggle -------------------------------► */

  //-- Accordion 1 --
  jQuery(document).ready(function(){
    jQuery(".accordian-shortCode .accordion-row > .title").on("click", function(e){
      if(jQuery(this).parent().has("ul")) {
        e.preventDefault();
      }
      
      if(!jQuery(this).hasClass("activeLine")) {
        // hide any open menus and remove all other classes
        jQuery(".accordian-shortCode .accordion-row > .title").removeClass("activeLine");
        jQuery(".accordian-shortCode .accordion-row > .accordion-content").removeClass("opened");
        jQuery(".accordian-shortCode .accordion-row > .accordion-content").slideUp(500);
        
        // open our new menu and add the activeLine class
        jQuery(this).addClass("activeLine");
        jQuery(".accordian-shortCode .accordion-row > .accordion-content").addClass("opened");
        jQuery(this).next(".accordion-content").slideDown(500);
      }
      
      else if(jQuery(this).hasClass("activeLine")) {
        jQuery(this).removeClass("activeLine");
        jQuery(".accordian-shortCode .accordion-row > .accordion-content").removeClass("opened");
        jQuery(this).next(".accordion-content").slideUp(500);
      }
    });
  });
  //--------------------------------------------------------------------------------------------


  /* ◄------ Responsive Nav -------------------------------► */
 
  jQuery(document).ready(function () {

    //-- Including the main nav contents in responsive main nav DIV --
    jQuery('.main-nav .nav-links').clone().appendTo('.responsive-main-nav');

    //-- Show and Hide responsive nav --
    jQuery('#responsive-main-nav-toggler').click(function(event){
      event.preventDefault();
      jQuery('#responsive-main-nav-toggler').toggleClass('opened');
      jQuery('.responsive-main-nav').slideToggle(500);


      if ( jQuery('#responsive-main-nav-toggler i').hasClass('fa-bars') )
      {   
          jQuery('#responsive-main-nav-toggler i').removeClass('fa-bars');
          jQuery('#responsive-main-nav-toggler i').addClass('fa-close');
      }else
      {  
          jQuery('#responsive-main-nav-toggler i').removeClass('fa-close');
          jQuery('#responsive-main-nav-toggler i').addClass('fa-bars');
      }

    });

    // dropdown level 1
    if(jQuery(".responsive-main-nav .nav-links > li > a").parent().has("ul")) {
      jQuery(".responsive-main-nav .nav-links > li > a:first-child").addClass("toggle-responsive");
      jQuery(".responsive-main-nav .nav-links > li > a:last-child").removeClass("toggle-responsive");
    }

    jQuery(".responsive-main-nav .nav-links > li > .toggle-responsive").on("click", function(e){
      if(jQuery(this).parent().has("ul")) {
        e.preventDefault();
      }
      
      if(!jQuery(this).hasClass("activeLine")) {
        // hide any open menus and remove all other classes
        jQuery(".responsive-main-nav .nav-links > li > .toggle-responsive").removeClass("activeLine");
        jQuery(".responsive-main-nav .nav-links > li > .dropdown").slideUp(500);
        
        // open our new menu and add the activeLine class
        jQuery(this).addClass("activeLine");
        jQuery(this).next(".responsive-main-nav .nav-links > li > .dropdown").slideDown(500);
      }
      
      else if(jQuery(this).hasClass("activeLine")) {
        jQuery(this).removeClass("activeLine");
        jQuery(this).next(".responsive-main-nav .nav-links > li > .dropdown").slideUp(500);
      }
    });


    // dropdown level 2
    if(jQuery(".responsive-main-nav .nav-links > li > .dropdown > li > a").parent().has("ul")) {
      jQuery(".responsive-main-nav .nav-links > li > .dropdown > li > a:first-child").addClass("toggle-responsive");
      jQuery(".responsive-main-nav .nav-links > li > .dropdown > li > a:last-child").removeClass("toggle-responsive");
    }


    jQuery(".responsive-main-nav .nav-links > li > .dropdown > li > .toggle-responsive").on("click", function(e){
      if(jQuery(this).parent().has("ul")) {
        e.preventDefault();
      }

      if(!jQuery(this).hasClass("activeLine")) {
        // hide any open menus and remove all other classes
        jQuery(".responsive-main-nav .nav-links > li > .dropdown > li > .toggle-responsive").removeClass("activeLine");
        jQuery(".responsive-main-nav .nav-links > li > .dropdown li .dropdown").slideUp(500);
        
        // open our new menu and add the activeLine class
        jQuery(this).addClass("activeLine");
        jQuery(this).next(".responsive-main-nav .nav-links > li > .dropdown li .dropdown").slideDown(500);
      }
      
      else if(jQuery(this).hasClass("activeLine")) {
        jQuery(this).removeClass("activeLine");
        jQuery(this).next(".responsive-main-nav .nav-links > li > .dropdown li .dropdown").slideUp(500);
      }
    });

  });
  //--------------------------------------------------------------------------------------------

  /*jQuery(document).ready(function () {
     $('.responsive-menu-wrapper .responsive-main-nav .nav-links').children('.fl').each(function() {
        $(this).appendTo(".responsive-menu-wrapper .responsive-main-nav .nav-links");
    });
    $('.responsive-menu-wrapper .responsive-main-nav .nav-links').children('.fr').each(function() {
        $(this).appendTo(".responsive-menu-wrapper .responsive-main-nav .nav-links");
    });

    $('.responsive-menu-wrapper .responsive-main-nav .nav-links').children().each(function() {
      $('.responsive-menu-wrapper .responsive-main-nav .nav-links').find('li:nth-child(3)').after($(this));
    });
  });*/



})();//end of use strict
    
