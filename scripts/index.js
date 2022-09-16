window.addEventListener('load', init);


function init(){
    document.getElementById('event_name').innerText = EVENT.NAME;
    document.getElementById('event_desc').innerText = EVENT.DESC;
    BindEvents();
}


function BindEvents(){
    document.querySelector('#email').addEventListener('change', validateEmail);
    document.querySelector('#submit').addEventListener('click', getData);
}


function validateEmail(){
    mail_id = document.querySelector('#email').value;
    API_Client.Validation(mail_id);

    // if(API_Client.isEmailValid == false){
    //     document.getElementById('warn').innerText = 'Invalid Email Provided';
    // }    
}


function getData(){
    const formDataObj = {}
    const fields = ['name', 'email', 'college', 'rating', 'review'];

    fields.forEach(field => {
        formDataObj[field] = document.querySelector('#' + field).value;
    });

    console.log(formDataObj);
    if (true) { //replace with below code 
        //API_Client.isEmailValid == true
        // TODO: check this function as api_key is not
        console.log('success');
        API_Client.Submission();
    }
}


