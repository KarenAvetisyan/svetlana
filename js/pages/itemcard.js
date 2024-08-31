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
    const initialCost = parseFloat(select('.js-size-input:checked').getAttribute('data-size-cost'));
    price.value = initialCost;
    // price input autowidth
    function resizeInput() {
        price.style.width = price.value.length + "ch";
    }resizeInput()
    // size and frame cost to price with currency change
    let sizeCheckedValue = initialCost ? initialCost : null;
    let frameCheckedValue = null;
    function calc(){
        var crntValue = select('#crnt').options[select('#crnt').selectedIndex].getAttribute("data-value");
        var crncy = select('#crnt').options[select('#crnt').selectedIndex].attributes[1].value;
        const currency = document.getElementById('currency');
        var result = sizeCheckedValue + frameCheckedValue;
        price.value = result * number.value;
        if(crncy == 'usd'){
            currency.innerHTML = '$';
            price.value = result * number.value;
        }
        if(crncy == 'rub'){
            currency.innerHTML = '₽';
            price.value = (price.value * parseFloat(crntValue)).toFixed(0);
        }
        if(crncy == 'eur'){
            currency.innerHTML = '€';
            price.value = (price.value / parseFloat(crntValue)).toFixed(0);
        }
        resizeInput();
    }
    select('select').addEventListener('change', calc);
    // size cost to price 
    on('change', '.js-size-input', function(e){
        var sizeVal = parseFloat(e.target.getAttribute('data-size-cost'));
        if(e.target.checked == true){
            sizeCheckedValue = parseFloat(sizeVal);
            calc();
            resizeInput();
        }
    }, true);
    // frame cost to price 
    on('change', '.js-frame-input', function(e){
        var frameVal = parseFloat(e.target.getAttribute('data-frame-cost'));
        if(e.target.checked == true){
            frameCheckedValue = parseFloat(frameVal);
            calc();
            resizeInput();
        }
        else {
            frameCheckedValue = parseFloat(frameVal - frameVal);
            calc();
            resizeInput();
        }
    }, true);
   
    // increase and deacrease
    var initial = number.value;
    document.addEventListener('click', function(e){
        if(e.target.matches('.js-increase')){
            number.value++;
            price.value = parseFloat(price.value) * parseFloat(number.value);
            calc();
            resizeInput();
        }
        else if(e.target.matches('.js-decrease')){
                number.value--;
                if(number.value == 0) {
                    number.value = initial;
                }
                price.value = parseFloat(price.value) - parseFloat(price.value);
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