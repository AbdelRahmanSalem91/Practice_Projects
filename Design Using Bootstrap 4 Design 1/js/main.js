// Start Slider

$(function(){
    let windowHeight    = $(window).height(),
        uppernavHeight  = $('.upper-nav').innerHeight(),
        navbarHeight    = $('.navbar').innerHeight();

    $('.slider, .carousel-item').height(windowHeight - (uppernavHeight + navbarHeight));
});

$(".feat-work ul li").on("click", function(){
    $(this).addClass("active").siblings().removeClass("active");
    if($(this).data("class") === "all"){
        $(".feat-work .col-md").css("opacity", "1")
    }else{
        $(".feat-work .col-md").css("opacity", ".1")
        $($(this).data("class")).parent().css("opacity", "1")
    }
})

// End Slider

