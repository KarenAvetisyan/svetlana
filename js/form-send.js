"use strict"
document.addEventListener('DOMContentLoaded', function (){
    const form = document.querySelectorAll('.mail--send-form');
    if(form){
        form.forEach(f=>{
            f.addEventListener('submit', formSend);
            async function formSend(e) {
                e.preventDefault();
                let formData = new FormData(f);
                let response = await fetch('mail.php', {
                    method: 'POST',
                    body: formData
                });
                f.querySelector('.form-pending').classList.add('pending');
                if (response.ok) {
                    if(f.classList.contains('subscribeForm')){
                        f.classList.add('subscribed');
                    }
                    f.querySelector('.form-pending').classList.remove('pending');
                    f.querySelector('.successfully-sent').classList.add('sent');
                    f.reset();
                }else {
                    alert('Ошибка!');
                    f.querySelector('.form-pending').classList.remove('pending');
                }
            }
        })
        
    }
});