var $ = jQuery;
jQuery(document).ready(function($) {
    $("pre code").prepend("<div class='re_clip-board' style='display: none;'></div>");
    // jQuery('.re_clip-board').addClass('material-icons');
    // jQuery('.re_clip-board').text('file_copy');
    jQuery('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
        $(".entry-content pre").show();
    });

    jQuery('.entry-content pre code').mouseenter(function(e) {
        var t = jQuery(this);
        t.children('.re_clip-board').removeClass('addText');
        t.children(".re_clip-board").slideDown(100);
        jQuery(e.target).mouseleave(function() {
            t.children(".re_clip-board").slideUp(200);
            t.children('.re_clip-board').removeClass('addText');

        });
    });

    jQuery('.entry-content pre code .re_clip-board').click(function(e) {
        console.log(jQuery(this));
        re_copyToClipboard(jQuery(this));
        jQuery(this).addClass('addText');
        // $(this).css({
        //     "width": "85px",
        //     "font-family": "var(--font-family--content)",
        //     "font-size": "14px"
        // });

    });
});

function re_copyToClipboard(element) {
    var elements = element.parent();
    var $temp = $("<textarea>");
    $("body").append($temp);
    var text = $(elements).text().replace(/Copy/g, "");
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}

/*Starting expand widget jquery codes */
var rotation = 0;
jQuery.fn.plus_rotate = function(degrees) {
    $(this).css({
        "-webkit-transform": "rotate(" + degrees + "deg)",
        "-moz-transform": "rotate(" + degrees + "deg)",
        "-ms-transform": "rotate(" + degrees + "deg)",
        "transform": "rotate(" + degrees + "deg)"
    });
    return $(this);
};

/*$(document).ready(function(){ */
jQuery(document).ready(function($) {
    $(".expand_widget_title").click(function() {
        if (!$(this).parent().children("ul").is(":visible")) {
            rotation += 360;
            $(this).children(".widget_plus_icon").removeClass("zero_six_rotate");
            $(this).children(".widget_plus_icon").addClass("tree_six_rotate");
            $(this).parent().children("ul").slideDown(390);

            var t = $(this);
            setTimeout(function() {
                t.children(".widget_plus_icon").removeClass("plus_icon");
                t.children(".widget_plus_icon").addClass("minus_icon");
            }, 400);
        } else {
            rotation -= 360;
            $(this).children(".widget_plus_icon").removeClass("tree_six_rotate");
            $(this).children(".widget_plus_icon").addClass("zero_six_rotate");
            $(this).parent().children("ul").slideUp(390);

            var t = $(this);
            setTimeout(function() {
                t.children(".widget_plus_icon").removeClass("minus_icon");
                t.children(".widget_plus_icon").addClass("plus_icon");
            }, 400);
        }
    });
});