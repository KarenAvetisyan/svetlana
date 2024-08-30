document.addEventListener('DOMContentLoaded', function(){
    var swiper = new Swiper(".homeSwiper", {
      effect: "fade",
      loop: true,
      autoplay: {
          delay: 4000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
    
});