document.addEventListener('DOMContentLoaded', function(){
    // input field holder when active 
    var input = document.querySelectorAll('.js-input');
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('input', function(e) {
            var fieldHolder = e.target.closest(".field").querySelector('.field__holder')
            input[i].style.paddingRight = fieldHolder.clientWidth + 'px';
            if(input[i].value.length <= 0){
                input[i].classList.remove('active')
            }
            else {
                input[i].classList.add('active')
            }
        })
    }
    // custom select 
    var selectContainer = document.querySelectorAll(".select-container");
    selectContainer.forEach(s=>{
      var select = s.querySelector(".select");
      var input = s.querySelector(".select-input");
      var options = s.querySelectorAll(".option");
      var search = s.querySelector(".search");
      select.onclick = (event) => {
        selectContainer.forEach(f=>{
            var isClickInside = f.contains(event.target)
            if (!isClickInside) {
                f.classList.remove('active')
            }
        })
        s.classList.toggle('active');
      };
      if(search){
        search.addEventListener('input', function(e){
            var filter = e.target.value.toUpperCase();
            var div = s.querySelector(".option-container");
            var opt = div.querySelectorAll(".option");
            for (let i = 0; i < opt.length; i++) {
                txtValue = opt[i].textContent || opt[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    opt[i].style.display = "";
                } else {
                    opt[i].style.display = "none";
                }
            }
        })
      }
      options.forEach((e) => {
          e.addEventListener("click", () => {
              input.value = e.innerText;
              var fieldHolder = select.querySelector('.field__holder')
              input.style.paddingRight = fieldHolder.clientWidth - 20 + 'px';
              s.classList.remove("active");
              options.forEach((e) => {
                  e.classList.remove("selected");
              });
              e.classList.add("selected");
              if(e.classList.contains('selected')) {
                s.classList.add('selected');
              }
          });
      });

    })
});