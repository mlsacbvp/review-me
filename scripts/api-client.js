//All API calls (basically validation API & google sheets API)

const API_Client = {
    isEmailValid : false,
    
    async Validation(mail_id){

        const api_key = SECRET.API_KEY;
          
        const promise = fetch(`https://sleepy-wildwood-70687.herokuapp.com/https://api.quickemailverification.com/v1/verify?email=${mail_id}&apikey=${api_key}`);

        return promise;
    },

    async Submission(formDataObj){
        
        const scriptURL = SECRET.SCRIPT_URL;

        const promise = fetch(scriptURL, { method: 'POST', body: formDataObj });

        return promise;
    },
}