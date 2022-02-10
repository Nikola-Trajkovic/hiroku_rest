function init(){


    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        window.location.href = "/admin/login";
    }

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    

    const oglasi = [{}];
    var naziv;

    fetch('http://localhost:10000/api/auto', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const lst = document.getElementById("cars");
                console.log(lst);
                console.log(data);
    
                data.forEach( el => {
                    oglasi.push(el);
                    console.log(el);
                    console.log(el.id);
                    console.log(el.marka);
                    lst.innerHTML += `<option value="${el.id}">${el.marka} ${el.model}</option>`;
                });
            });



    fetch('http://localhost:10000/api/oglas_auto', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById("usrLst");
            

            data.forEach( el => {
                if(oglasi.length == 1){
                    window.location.reload();
                }
                for(var i=0; i<oglasi.length; i++){

                    if(oglasi[i].id == el.autoId){
                        naziv = oglasi[i].marka + " " + oglasi[i].model;
                    }
    
                }
                lst.innerHTML += `<li class="lstUser" onclick="update(this)">ID: ${el.id}, Opis: ${el.opis},Likes: ${el.likes}, Dislikes: ${el.dislikes},Contact: ${el.contact}, Cena: ${el.cena},Auto ID: ${el.autoId},Auto: ${naziv} ,User ID: ${el.user.id},Username: ${el.user.username}  <button class="liBtn" id="liBtn" onclick="obrisi(this)">X</button></li>`;
            });
        });
    
        

        document.getElementById("unesiBtn").addEventListener('click', e => {
            e.preventDefault();


            console.log("Usao u event");

            //VALIDACIJA

            var opisV = document.getElementById('opis').value;
            var likesV = document.getElementById('likes').value;
            var dislikesV = document.getElementById('dislikes').value;
            var contactV = document.getElementById('contact').value;
            var cenaV = document.getElementById('cena').value;

            if(opisV == ""){
                alert("Niste lepo ueli opis!");
                return;
            }
            if(likesV == ""){
                alert("Niste lepo uneli lajkove!");
                return;
            }
            if(dislikesV == ""){
                alert("Niste lepo uneli dislajkove!");
                return;
            }
            if(contactV == ""){
                alert("Niste lepo uneli kontakt!");
                return;
            }
            if(cenaV == ""){
                alert("Niste lepo uneli cenu!");
                return;
            }

            //

            const data = {
                opis: document.getElementById('opis').value,
                likes: document.getElementById('likes').value,
                dislikes: document.getElementById('dislikes').value,
                contact: document.getElementById('contact').value,
                cena: document.getElementById('cena').value,
                autoID: document.getElementById('cars').value
            };
    
    
            fetch('http://localhost:10000/api/oglas_auto', {
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


            console.log("Usao u event update");

            //VALIDACIJA

            var opisV = document.getElementById('opisU').value;
            var likesV = document.getElementById('likesU').value;
            var dislikesV = document.getElementById('dislikesU').value;
            var contactV = document.getElementById('contactU').value;
            var cenaV = document.getElementById('cenaU').value;

            if(opisV == ""){
                alert("Niste lepo ueli opis!");
                return;
            }
            if(likesV == ""){
                alert("Niste lepo uneli lajkove!");
                return;
            }
            if(dislikesV == ""){
                alert("Niste lepo uneli dislajkove!");
                return;
            }
            if(contactV == ""){
                alert("Niste lepo uneli kontakt!");
                return;
            }
            if(cenaV == ""){
                alert("Niste lepo uneli cenu!");
                return;
            }

            //

            
    
            const data = {
                id: window.idUpdate,
                opis: document.getElementById('opisU').value,
                likes: document.getElementById('likesU').value,
                dislikes: document.getElementById('dislikesU').value,
                contact: document.getElementById('contactU').value,
                cena: document.getElementById('cenaU').value,
            };
    
    
            fetch('http://localhost:10000/api/oglas_auto', {
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

    fetch('http://localhost:10000/api/oglas_auto', {
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
                console.log(el.msg);
                alert(el.msg);
            } else {
                
            }
        });
        window.location.reload();



}

function update(elem){
    

    console.log("UPDATEEEEEE");

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    var opisInput;
    var likesInput;
    var dislikesInput;
    var contactInput;
    var cenaInput;
    var z;

            
         let li = elem;
        console.log(li.innerHTML);
        let myArray = li.innerHTML.trim().split(',');

        for(var i=0 ; i<myArray.length; i++ ){

            console.log(myArray[i]);
            if(i == 1 ){
                z = myArray[i].split(':')[1];
                opisInput = z.trim();
            }
            if(i == 2 ){
                z = myArray[i].split(':')[1];
                likesInput = z.trim();
            }
            if(i == 3 ){
                z = myArray[i].split(':')[1];
                dislikesInput = z.trim();
            }
            if(i == 4 ){
                z = myArray[i].split(':')[1];
                contactInput = z.trim();
            }
            if(i == 5 ){
                z = myArray[i].split(':')[1];
                cenaInput = z.trim();
            }
            
        }
        console.log(opisInput);
        console.log(likesInput);
        console.log(dislikesInput);
        console.log(contactInput);
        console.log(cenaInput);

        document.getElementById('opisU').value = opisInput;
        document.getElementById('likesU').value = likesInput;
        document.getElementById('dislikesU').value = dislikesInput;
        document.getElementById('contactU').value = contactInput;
        document.getElementById('cenaU').value = cenaInput;


        document.getElementById('opisU').removeAttribute('disabled');
        document.getElementById('likesU').removeAttribute('disabled');
        document.getElementById('dislikesU').removeAttribute('disabled');
        document.getElementById('contactU').removeAttribute('disabled');
        document.getElementById('cenaU').removeAttribute('disabled');
        document.getElementById('unesiBtnU').removeAttribute('disabled');

         let idArray = myArray[0].split(':');
        console.log("id " + idArray);
         let idTrim = idArray[1];
         const id = idTrim.trim();
         console.log("id " + id);

         window.idUpdate = id;
}