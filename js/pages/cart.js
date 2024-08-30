document.addEventListener('DOMContentLoaded', function(){
    // increase decrease +/- 
    document.addEventListener('click', function(e){
        if(e.target.matches('.js-increase')){
            var number = e.target.parentNode.querySelector('.js-number');
            number.value++;
        }
        else if(e.target.matches('.js-decrease')){
            var number = e.target.parentNode.querySelector('.js-number');
                number.value--;
                if(number.value == 0) {
                    number.value = initial;
                }
        }
    })
    // remove cart 
    document.addEventListener('click', function(e){
        if(!e.target.matches('.js-cart-remove')){}
        else {
            e.target.closest('.cart__item').remove();
        }
    })
});