document.addEventListener('DOMContentLoaded', function(){
    const cartList = document.querySelectorAll('.cart__list li');
    // remove cart 
    function removeCart(e){
            var cart__item = e.target.closest('.cart__item'); 
            var id = cart__item.id; 
            for (let i = 0; i < cartList.length; i++) {
                var cartListID = cartList[i].getAttribute('data-id');
                    if(id == cartListID) {
                        cart__item.remove();
                        cartList[i].remove();
                    }
            }        
    }
    document.addEventListener('click', function(e){
        if(!e.target.matches('.js-cart-remove')){}
        else {
            removeCart(e);
        }
    })
    // increase cartList price 
    function cartsTotal(cartID, quantity) {
        for (let i = 0; i < cartList.length; i++) {
            var qnt = cartList[i].querySelector('.qnt');
            var cartListID = cartList[i].getAttribute('data-id');
            if(cartID == cartListID) {
                if(quantity == 1){
                    qnt.innerHTML = ""
                }
                else {
                    qnt.innerHTML = `${"("+quantity+")"}`
                }
            }
        }
    }
    // increase decrease +/- 
    document.addEventListener('click', function(e){
        if(e.target.matches('.js-increase')){
            var cartID  = e.target.closest('.cart__item').id;
            var number = e.target.parentNode.querySelector('.js-number');
            number.value++;
            cartsTotal(cartID, number.value);
        }
        else if(e.target.matches('.js-decrease')){
            var cartID  = e.target.closest('.cart__item').id;
            var number = e.target.parentNode.querySelector('.js-number');
                number.value--;
                if(number.value == 0) {
                    number.value = 1;
                }
                cartsTotal(cartID, number.value);
        }
    })
});