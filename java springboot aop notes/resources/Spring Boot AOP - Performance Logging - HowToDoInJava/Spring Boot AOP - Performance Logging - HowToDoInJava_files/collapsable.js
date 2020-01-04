jQuery.noConflict();
jQuery(document).ready(function($){
$(document).on('click','.nbox-close',function(){
    $(this).parent().fadeTo(300,0,function(){
          $(this).remove();
    });
});
 
});