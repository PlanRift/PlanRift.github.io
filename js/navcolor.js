
$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 300) {
          $(".navbar-background").css("height" , "10vh");
        }
  
        else{
            $(".navbar-background").css("height" , "0vh");  	
        }
    })
  })