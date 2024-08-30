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
    /* */

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
    /* */

    // frame one checked only
    var frameInput = document.querySelectorAll(".js-frame-input");
    for (let i = 0; i < frameInput.length; i++) {
        frameInput[i].addEventListener("change", function(){
            for (let o = 0; o < frameInput.length; o++) {
                var frame = this;
                if(frame.checked == true){
                    frameInput[o].checked = false;
                    frame.checked = true;
                }
                else {
                    frame.checked = false;
                }
            }
        })
    }

    const price = document.getElementById('price');
    const number = document.getElementById('number');
    
    // price initial value
    const initialCost = Math.floor(select('.js-size-input:checked').getAttribute('data-size-cost'));
    price.value = initialCost;
    // price input autowidth
    function resizeInput() {
        price.style.width = price.value.length + "ch";
    }resizeInput()
    // size and frame cost to price
    let sizeCheckedValue = initialCost ? initialCost : null;
    let frameCheckedValue = null;
    function calc(){
        var result = sizeCheckedValue + frameCheckedValue;
        price.value = result * number.value;
    }
    // size cost to price 
    on('change', '.js-size-input', function(e){
        var sizeVal = Math.floor(e.target.getAttribute('data-size-cost'));
        if(e.target.checked == true){
            sizeCheckedValue = Math.floor(sizeVal);
            calc();
            resizeInput();
        }
    }, true);
    // frame cost to price 
    on('change', '.js-frame-input', function(e){
        var frameVal = Math.floor(e.target.getAttribute('data-frame-cost'));
        if(e.target.checked == true){
            frameCheckedValue = Math.floor(frameVal);
            calc();
            resizeInput();
        }
        else {
            frameCheckedValue = Math.floor(frameVal - frameVal);
            calc();
            resizeInput();
        }
    }, true);
    // currency $ ₽ €
    // var currency = document.getElementById('currency');
    // function convertCurrency(e) {
    //     var crntValue = e.target.options[e.target.selectedIndex].getAttribute("data-value");
    //     calc(); 
    //     resizeInput();
    //     if(e.target.value == 'usd'){
    //         currency.innerHTML = '$';
    //     }
    //     if(e.target.value == 'rub'){
    //         currency.innerHTML = '₽';
    //         price.value = Math.floor(price.value * crntValue);
    //     }
    //     if(e.target.value == 'eur'){
    //         currency.innerHTML = '€';
    //         price.value = Math.floor(price.value / crntValue);
    //     }
    // }
    // select('select').addEventListener('change', convertCurrency);
    // increase and deacrease
    var initial = number.value;
    document.addEventListener('click', function(e){
        if(e.target.matches('.js-increase')){
            number.value++;
            price.value = Math.floor(price.value) * Math.floor(number.value);
            calc();
            resizeInput();
        }
        else if(e.target.matches('.js-decrease')){
                number.value--;
                if(number.value == 0) {
                    number.value = initial;
                }
                price.value = Math.floor(price.value) - Math.floor(price.value);
                calc()
                resizeInput();
        }
        resizeInput()
    })



    // frames preview modal 
    document.addEventListener('click', function (e) {
        if (!e.target.matches('[data-show-modal]')) return;
        else{
        e.preventDefault();
        var modal = document.querySelectorAll('#'+e.target.dataset.id);
        Array.prototype.forEach.call(modal, function (el) {
                el.classList.add('active');
        });
        }
    });
    document.addEventListener('click', function (e) {
        if (!e.target.matches('[data-close-modal]')) return;
        else{
            e.target.closest('.modal').classList.remove('active');
        }
    });
});