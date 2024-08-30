document.addEventListener('DOMContentLoaded', function(){
        /*Easy selector helper function */
        const select = (el, all = false) => {
                el = el.trim()
                if (all) {
                return [...document.querySelectorAll(el)]
                } else {
                return document.querySelector(el)
                }
        }
        /* Easy event listener function */
        const on = (type, el, listener, all = false) => {
                let selectEl = select(el, all)
                if (selectEl) {
                if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                selectEl.addEventListener(type, listener)
                }
                }
        }

        // бургер
        on('click', '.js-burger', function(e){
                select('.js-burger').classList.toggle('clicked');
                select('nav').classList.toggle('show');
        })
       
        // swiper 
        var parallaxSwiper = document.querySelectorAll(".parallaxSwiper");
        parallaxSwiper.forEach(p=>{
                var swiper = new Swiper(p, {
                        speed: 1000,
                        parallax: true,
                        loop: true,
                        autoplay: p.classList.contains('autoplay-observer') ?  {
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                        } : false,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        grabCursor: true,
                        pagination: {
                                el: ".swiper-pagination",
                                clickable: false
                        },
                        navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                        },
                        
                        on: {
                        init: function() {
                                let swiper = this;
                                for (let i = 0; i < swiper.slides.length; i++) {
                                        if((swiper.slides[i]).querySelector(".slide__item-bg")){
                                                (swiper.slides[i]).querySelector(".slide__item-bg").setAttribute("data-swiper-parallax", `${0.75 * swiper.width}`);
                                        }
                                        if((swiper.slides[i]).querySelector(".slide__item-text")){
                                                (swiper.slides[i]).querySelector(".slide__item-text").setAttribute("data-swiper-parallax", `${0.5 * swiper.width}`);
                                        }
                                }
                                this.update();
                                },
                                resize: function() {
                                        this.update();
                                },
                        },
                        
                })
                swiper.autoplay.stop();
                new IntersectionObserver((entries, observer) => {
                        if (entries[0].isIntersecting && entries[0].target.classList.contains('autoplay-observer')) {
                                observer.disconnect();
                                swiper.autoplay.start();
                        }
                }).observe(p);	
        })
      
        // find from in footer 
        var find = select('.js-find');
        if(find){
                on('click', '.js-find', function(event){
                event.preventDefault();
                event.target.classList.toggle('active');
                select('.find__varients').classList.toggle('active');
                })
        }
       
        // observer, анимация на скролле 
        const inViewport = (element, observer) => {
        element.forEach(entry => {
                entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
                element.forEach(item => {
                if(item.target.classList.contains('is-inViewport') && !item.target.classList.contains('watched')){
                item.target.classList.add("watched");
                }
                })
        });
        };
        let ioConfiguration = {
        rootMargin: '0% 0% 0% 0%',
        threshold: 0.2
        };
        const Obs = new IntersectionObserver(inViewport, ioConfiguration);
        const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
        const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
        ELs_inViewport.forEach(EL => {
        Obs.observe(EL, obsOptions);
        });
})
