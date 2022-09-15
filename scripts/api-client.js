//All API calls (basically validation API & google sheets API)

const API_Client = {
    isEmailValid : false,
    
    Validation(mail_id){

        let params = new URLSearchParams({
            api_key: SECRET.API_KEY,
            email: mail_id,
          });
          
        const promise = fetch(`https://emailvalidation.abstractapi.com/v1/?${params}`);

        promise.then(response => {
            response.json().then(result =>{
                console.log('Result is ', result.deliverability);

                if(result.deliverability == 'DELIVERABLE'){
                    this.isEmailValid = true;
                }else{
                    this.isEmailValid = false;
                }
                console.log(this.isEmailValid);

            }).catch(err =>{
                console.log("Error in json parsing ", err);
            })
        }).catch(err => {
            console.log("Error in API call ",err);
        })
    },

    Submission(formDataObj){
        const scriptURL = SECRET.SCRIPT_URL;
        const form = document.forms['google-sheet']
        const promise = fetch(scriptURL, {
            method: 'POST',
            headers: {
                
            },
            body: new FormData(form) })
        
        form.addEventListener('submit', onsubmitSuccess => {
            onsubmitSuccess.preventDefault();
            console.log("form submission success");
            promise
                .catch(error => console.error('Error!', error.message))
        })
        

    },
}