function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        //VALIDACIJA

        var usernameV = document.getElementById('username').value;
        var firstNameV = document.getElementById('firstname').value;
        var lastNameV = document.getElementById('lastname').value;
        var emailV = document.getElementById('email').value;
        var passwordV = document.getElementById('password').value;

        if(usernameV == "" || usernameV.length < 3 || usernameV.length > 20){
            alert("Pogresan username!");
            return;
        }
        if(firstNameV == "" || firstNameV.length <3 || firstNameV.length > 15 || /\d/.test(firstNameV)){
            alert("Pogresno uneto ime!");
            return;
        }
        if(lastNameV == "" || lastNameV.length <3 || lastNameV.length > 15 || /\d/.test(lastNameV)){
            alert("Pogresno uneto prezime!");
            return;
        }
        if(emailV == "" || !emailV.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            alert("Pogresno unet email!");
            return;
        }
        if(passwordV == "" || passwordV.length < 3 || passwordV.length>15){
            alert("Pogresno unet password!");
            return;
        }

        //


        const rb = document.getElementById('moderator');
        const rb2 = document.getElementById('user');
        let type2;
        const pw = document.getElementById('password').value;
        const cpw = document.getElementById('confirmPassword').value;

        if(rb.checked){
            console.log("usao u moderator");
            type2 = rb.value;
        }else if(rb2.checked){
            console.log("usao u user");
            type2 = rb2.value;
        }

        if(pw != cpw){
            alert("Pogresno potvrdjen password");
            return;
        }

        const data = {
            username: document.getElementById('username').value,
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            type: type2
        };

        fetch('http://localhost:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.error){
                    window.location.reload();
                    alert(el.error);
                }else{
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = '/admin/index';
                }
                
            });
    });
}