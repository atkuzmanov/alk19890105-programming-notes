jQuery(function() {

    jQuery(".search-btn").click(function() {
        jQuery(".search_popup").toggleClass("active");
    });

    jQuery(".close-btn").click(function() {
        jQuery(".search_popup").removeClass("active");
    });

    jQuery(window).scroll(function() {
        100 < jQuery(this).scrollTop() ? jQuery(".float-bar").addClass("open") : jQuery(".float-bar").removeClass("open")
    });


    jQuery('.form-subscribe .mo-optin-form-submit-button').addClass('material-icons');
    jQuery('.form-subscribe .mo-optin-form-submit-button').val('arrow_forward');


    jQuery(".nav__toggle").click(function() {
        jQuery(".header__navigation").toggleClass('is-active');
    });

    if (jQuery(window).width() < 1199) {
        jQuery(".header__navigation li.menu-item-has-children").click(function() {
            console.log("click");
            jQuery(this).toggleClass('active');
        });
    }

    if (jQuery('body').hasClass('single-post')) {

        var categoryName = jQuery(".blog-header .entry-title").text();


        jQuery(".popular-post ul > li a:contains('" + categoryName + "')").css({
            "background-color": "#e3f2fd",
            "color": "#2196f3"
        });
    }

    jQuery('.search-btn').on('click', function() {
        jQuery('#ajaxsearchlite1 input[type="search"]').focus();
    });

});