document.addEventListener('DOMContentLoaded', function(){
    // share 
    document.addEventListener('click', function(e){
        if(!e.target.matches('.js-share')){}
        else {
            e.preventDefault();
            var elem = e.target.parentNode;
            elem.classList.toggle('active');
        }
    })
});