
var enable_google_captcha = cfjv_obj.comment_enable_google_captcha;
var comment_form_recaptcha;

var nvcfjvOnloadCallback = function() {
	if(enable_google_captcha == 1){
		if ( jQuery('#comment_form_recaptcha').length ) {
		    comment_form_recaptcha = grecaptcha.render('comment_form_recaptcha', {
		      'sitekey' : cfjv_obj.google_captcha_site_key, /* Replace this with your Site key */
		      'theme' : 'light'
		    });
		}
	}
}

jQuery(document).ready(function($) {
	$('#commentform').validate({
		ignore: ".ignore",
		rules: {
			comment: {
				required: true
			},
			
			author: {
				required: true,
				minlength: 2
			},

			email: {
				required: true,
				email: true
			},

			hidden_recaptcha_comment: {
	                required: function () {
	                    if (grecaptcha.getResponse() == '') {
	                        return true;
	                    } else {
	                        return false;
	                    }
	                }
            	}
		},

		messages: {
			comment: cfjv_obj.comment_comment_msg,
			author: cfjv_obj.comment_name_msg,
			email: {
			    required: cfjv_obj.comment_email_msg,
				email: "Please enter a valid email address."
			},
			hidden_recaptcha_comment: {
				required: "Please check the box to prove that you are not a robot."
			}
		},

		errorElement: "div",
		errorPlacement: function(error, element) {
		  element.after(error);
		}

	});
});