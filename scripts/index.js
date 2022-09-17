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


async function validateEmail(){
    mail_id = document.querySelector('#email').value;

    try {
        const result = await (await API_Client.Validation(mail_id)).json();
        //console.log(result.result);
        //console.log(API_Client.isEmailValid);

        if(result.result == 'valid'){
            API_Client.isEmailValid = true;
            document.getElementById('warn').innerText = '';
        }else{
            API_Client.isEmailValid = false;
            document.getElementById('warn').innerText = 'Invalid Email Provided';
        }
        
    }catch(err){
        window.alert('Weak Internet Connection ', err);
    }

}


function getData(){
    const formDataObj = {}
    const fields = ['name', 'email', 'college', 'rating', 'review'];

    fields.forEach(field => {
        formDataObj[field] = document.querySelector('#' + field).value;
    });

    if(API_Client.isEmailValid == true){
        document.getElementById('warn').innerText = '';
    }

    validateData(formDataObj);
   
}

function validateData(formDataObj){

    if(!formDataObj['name']){
        window.alert('Name field is required!')
    }else if(!formDataObj['college']){
        window.alert('College field is required!')
    }else if(API_Client.isEmailValid != true){
        window.alert('Invalid Email Provided!')
    }else{
        submitData(formDataObj);
    }

}

async function submitData(formDataObj){

    addLoading();
    //console.log(formDataObj);

    try{
        const result = await (await API_Client.Submission(formDataObj)).json();
        if(result.result == 'success'){
            //console.log(result.result);
            window.open("thanks_page/thanks.html", "_self");

        }else{
            window.alert("Error in form submission")
        }

    }catch(err){
        console.log('error is ',err);
        window.alert("Internal Server Error");
    }
    
}

function addLoading(){
    const img = document.createElement('img');
    img.className = 'loading';
    img.src = 'images/loading.gif';
    img.alt = 'loading';
    document.getElementById('box').appendChild(img);
}


