function init(){

    
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    

    fetch('http://localhost:10000/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById("usrLst");

            data.forEach( el => {
                lst.innerHTML += `<li class="lstUser" onclick="update(this)">ID: ${el.id}, Username: ${el.username},First Name: ${el.firstName}, Last name: ${el.lastName}, E-mail: ${el.email}, Type: ${el.type} <button class="liBtn" id="liBtn" onclick="obrisi(this)">X</button></li>`;
            });
        });

        document.getElementById("unesiBtn").addEventListener('click', e => {
            e.preventDefault();

            //VALIDACIJA

            var username = document.getElementById('username').value;
            var firstName = document.getElementById('firstname').value;
            var lastName = document.getElementById('lastname').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            if(username == "" || username.length < 3 || username.length > 20){
                alert("Pogresan username!");
                return;
            }
            if(firstName == "" || firstName.length <3 || firstName.length > 15 || /\d/.test(firstName)){
                alert("Pogresno uneto ime!");
                return;
            }
            if(lastName == "" || lastName.length <3 || lastName.length > 15 || /\d/.test(firstName)){
                alert("Pogresno uneto prezime!");
                return;
            }
            if(email == "" || !email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                alert("Pogresno unet email!");
                return;
            }
            if(password == "" || password.length < 3 || password.length>15){
                alert("Pogresno unet password!");
                return;
            }


            //


            console.log("Usao u event");

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
                alert("Niste lepo potvrdili password");
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
    
    
            fetch('http://localhost:10000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( el => {
                    if (el.error) {
                        window.location.reload();
                        alert(el.error);
                    } else {
                        window.location.reload();
                    }
                });

        });


        document.getElementById("unesiBtnU").addEventListener('click', e => {
            e.preventDefault();

            //VALIDACIJA

            var usernameV = document.getElementById('usernameU').value;
            var firstNameV = document.getElementById('firstnameU').value;
            var lastNameV = document.getElementById('lastnameU').value;
            var emailV = document.getElementById('emailU').value;

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



            //


            console.log("Usao u event update");

            const rb = document.getElementById('moderatorU');
            const rb2 = document.getElementById('userU');
            let type2;
    
            if(rb.checked){
                console.log("usao u moderator");
                type2 = rb.value;
            }else if(rb2.checked){
                console.log("usao u user");
                type2 = rb2.value;
            }

    
            
    
            const data = {
                id: window.idUpdate,
                username: document.getElementById('usernameU').value,
                firstName: document.getElementById('firstnameU').value,
                lastName: document.getElementById('lastnameU').value,
                email: document.getElementById('emailU').value,
                type: type2
            };
    
    
            fetch('http://localhost:10000/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( el => {
                    if (el.error) {
                        window.location.reload();
                        alert(el.error);
                    } else {
                        window.location.reload();
                    }
                });
            

            
        });

        document.getElementById("logOut").addEventListener("click", e=>{

            document.cookie = `token=;SameSite=Lax`;
            window.location.href = "/admin/login";
    
        });

       

        



}

function obrisi(elem){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

            
    console.log("Usao u delete btn");
         let li = elem.parentNode;
        console.log(li.innerHTML);
        let myArray = li.innerHTML.trim().split(',')[0];
         console.log("array " +myArray);
         let idArray = myArray.split(':');
        console.log("id " + idArray);
         let idTrim = idArray[1];
         const id = idTrim.trim();
         console.log("id " + id);


    const data = {
        id: id
    };

    fetch('http://localhost:10000/api/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then( res => res.json() )
        .then( el => {
            if (el.msg) {
                alert(el.msg);
            } else {
                
            }
        });
        window.location.reload();



}

function update(elem){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    var usernameInput;
    var firstNameInput;
    var lastNameInput;
    var emailInput;
    var z;

            
    console.log("Usao u delete btn");
         let li = elem;
        console.log(li.innerHTML);
        let myArray = li.innerHTML.trim().split(',');

        for(var i=0 ; i<myArray.length; i++ ){

            console.log(myArray[i]);
            if(i == 1 ){
                z = myArray[i].split(':')[1];
                usernameInput = z.trim();
            }
            if(i == 2 ){
                z = myArray[i].split(':')[1];
                firstNameInput = z.trim();
            }
            if(i == 3 ){
                z = myArray[i].split(':')[1];
                lastNameInput = z.trim();
            }
            if(i == 4 ){
                z = myArray[i].split(':')[1];
                emailInput = z.trim();
            }
            
        }
        console.log(usernameInput);
        console.log(firstNameInput);
        console.log(lastNameInput);
        console.log(emailInput);
        var tipInput = myArray[myArray.length-1].split(" ")[2];
        console.log(tipInput);

        document.getElementById('usernameU').value = usernameInput;
        document.getElementById('firstnameU').value = firstNameInput;
        document.getElementById('lastnameU').value = lastNameInput;
        document.getElementById('emailU').value = emailInput;


        document.getElementById('usernameU').removeAttribute('disabled');
        document.getElementById('firstnameU').removeAttribute('disabled');
        document.getElementById('lastnameU').removeAttribute('disabled');
        document.getElementById('emailU').removeAttribute('disabled');
        document.getElementById('moderatorU').removeAttribute('disabled');
        document.getElementById('userU').removeAttribute('disabled');
        document.getElementById('unesiBtnU').removeAttribute('disabled');


        if(tipInput == "moderator"){
            console.log("usao u if");
            
            document.getElementById('userU').removeAttribute('checked');
            document.getElementById('moderatorU').setAttribute('checked', "");
        }else{
            console.log("usao u else");
            document.getElementById('moderatorU').removeAttribute('checked');
            document.getElementById('userU').setAttribute('checked', "");
           
        }

         let idArray = myArray[0].split(':');
        console.log("id " + idArray);
         let idTrim = idArray[1];
         const id = idTrim.trim();
         console.log("id " + id);

         window.idUpdate = id;
}