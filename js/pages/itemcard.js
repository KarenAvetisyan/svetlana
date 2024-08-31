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
    const initialCost = parseFloat(select('.js-size-input:checked').getAttribute('data-size-cost')) * parseFloat(select("#number").value);
    price.value = initialCost;
    // price input autowidth
    function resizeInput() {
        price.style.width = price.value.length + "ch";
    }resizeInput()
    // size and frame cost to price with currency change
    let size__checkedValue = initialCost ? initialCost : null;
    let frame__checkedValue = null;
    function calc(){
        var selected__currencyValue = select('#crnt').options[select('#crnt').selectedIndex].getAttribute("data-value");
        var selected__currency = select('#crnt').options[select('#crnt').selectedIndex].attributes[1].value;
        const currency__text = document.getElementById('currency');
        var result = size__checkedValue + frame__checkedValue;
        price.value = result * number.value;
        if(selected__currency == 'usd'){
            currency__text.innerHTML = '$';
            price.value = result * number.value;
        }
        if(selected__currency == 'rub'){
            currency__text.innerHTML = '₽';
            price.value = (price.value * parseFloat(selected__currencyValue)).toFixed(0);
        }
        if(selected__currency == 'eur'){
            currency__text.innerHTML = '€';
            price.value = (price.value / parseFloat(selected__currencyValue)).toFixed(0);
        }
        resizeInput();
    }
    select('select').addEventListener('change', calc);
    // size cost to price 
    on('change', '.js-size-input', function(e){
        var sizeVal = parseFloat(e.target.getAttribute('data-size-cost'));
        if(e.target.checked == true){
            size__checkedValue = parseFloat(sizeVal);
            calc();
            resizeInput();
        }
    }, true);
    // frame cost to price 
    on('change', '.js-frame-input', function(e){
        var frameVal = parseFloat(e.target.getAttribute('data-frame-cost'));
        if(e.target.checked == true){
            frame__checkedValue = parseFloat(frameVal);
            calc();
            resizeInput();
        }
        else {
            frame__checkedValue = parseFloat(frameVal - frameVal);
            calc();
            resizeInput();
        }
    }, true);
   
    // increase and deacrease
    document.addEventListener('click', function(e){
        if(e.target.matches('.js-increase')){
            number.value++;
            calc();
            resizeInput();
        }
        else if(e.target.matches('.js-decrease')){
                number.value--;
                if(number.value == 0) {
                    number.value = 1;
                }
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