function init(){

    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        window.location.href = "/admin/login";
    }

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:10000/api/auto', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById("usrLst");

            data.forEach( el => {
                lst.innerHTML += `<li class="lstUser" onclick="update(this)">ID:${el.id}, Marka: ${el.marka}, Model: ${el.model}, Godiste: ${el.godiste}, Kilometraza: ${el.kilometraza}, Gorivo: ${el.gorivo}, Menjac: ${el.menjac} <button class="liBtn" id="liBtn" onclick="obrisi(this)">X</button></li>`;
            });
        });

        document.getElementById("unesiBtn").addEventListener('click', e => {
            e.preventDefault();

            //VALIDACIJA

            var markaV = document.getElementById('marka').value;
            var modelV = document.getElementById('model').value;
            var godisteV = document.getElementById('godiste').value;
            var kilometrazaV = document.getElementById('kilometraza').value;
            var menjacV = document.getElementById('menjac').value;
            var gorivoV = document.getElementById('gorivo').value;
            

            if(markaV == "" || markaV.length < 3 || markaV.length > 20){
                alert("Pogresno uneta marka!");
                return;
            }
            if(modelV == "" || modelV.length <2 || modelV.length > 15){
                alert("Pogresno unet model!");
                return;
            }
            if(godisteV == ""){
                alert("Pogresno uneto godiste!");
                return;
            }
            if(kilometrazaV == ""){
                alert("Pogresno uneta kilometraza!");
                return;
            }
            if(menjacV == "" || menjacV.length < 3 || menjacV.length > 20){
                alert("Pogresno unet menjac!");
                return;
            }
            if(gorivoV == "" || gorivoV.length < 3 || gorivoV.length > 20){
                alert("Pogresno uneto gorivo!");
                return;
            }
            
            //


            console.log("Usao u event");

    
            const data = {
                marka: document.getElementById('marka').value,
                model: document.getElementById('model').value,
                godiste: document.getElementById('godiste').value,
                kilometraza: document.getElementById('kilometraza').value,
                menjac: document.getElementById('menjac').value,
                gorivo: document.getElementById('gorivo').value,
            };
    
    
            fetch('http://localhost:10000/api/auto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( el => {
                    if(el.error){
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

             var markaV = document.getElementById('markaU').value;
             var modelV = document.getElementById('modelU').value;
             var godisteV = document.getElementById('godisteU').value;
             var kilometrazaV = document.getElementById('kilometrazaU').value;
             var menjacV = document.getElementById('menjacU').value;
             var gorivoV = document.getElementById('gorivoU').value;
             
 
             if(markaV == "" || markaV.length < 3 || markaV.length > 20){
                 alert("Pogresno uneta marka!");
                 return;
             }
             if(modelV == "" || modelV.length <2 || modelV.length > 15){
                 alert("Pogresno unet model!");
                 return;
             }
             if(godisteV == ""){
                 alert("Pogresno uneto godiste!");
                 return;
             }
             if(kilometrazaV == ""){
                 alert("Pogresno uneta kilometraza!");
                 return;
             }
             if(menjacV == "" || menjacV.length < 3 || menjacV.length > 20){
                 alert("Pogresno unet menjac!");
                 return;
             }
             if(gorivoV == "" || gorivoV.length < 3 || gorivoV.length > 20){
                 alert("Pogresno uneto gorivo!");
                 return;
             }
             
             //


            console.log("Usao u event update");

            
    
            const data = {
                id: window.idUpdate,
                marka: document.getElementById('markaU').value,
                model: document.getElementById('modelU').value,
                godiste: document.getElementById('godisteU').value,
                kilometraza: document.getElementById('kilometrazaU').value,
                menjac: document.getElementById('menjacU').value,
                gorivo: document.getElementById('gorivoU').value,
            };
    
    
            fetch('http://localhost:10000/api/auto', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( el => {
                    if(el.error){
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

    fetch('http://localhost:10000/api/auto', {
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
    

    console.log("UPDATEEEEEE");

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    var markaInput;
    var modelInput;
    var godisteInput;
    var kilometrazaInput;
    var menjacInput
    var z;

            
         let li = elem;
        console.log(li.innerHTML);
        let myArray = li.innerHTML.trim().split(',');

        for(var i=0 ; i<myArray.length; i++ ){

            console.log(myArray[i]);
            if(i == 1 ){
                z = myArray[i].split(':')[1];
                markaInput = z.trim();
            }
            if(i == 2 ){
                z = myArray[i].split(':')[1];
                modelInput = z.trim();
            }
            if(i == 3 ){
                z = myArray[i].split(':')[1];
                godisteInput = z.trim();
            }
            if(i == 4 ){
                z = myArray[i].split(':')[1];
                kilometrazaInput = z.trim();
            }
            if(i == 5){
                z = myArray[i].split(':')[1];
                gorivoInput = z.trim();
            }
            
        }
        console.log(markaInput);
        console.log(modelInput);
        console.log(godisteInput);
        console.log(kilometrazaInput);
        console.log(menjacInput);
        var menjacInput = myArray[myArray.length-1].split(" ")[2];
        console.log(menjacInput);

        document.getElementById('markaU').value = markaInput;
        document.getElementById('modelU').value = modelInput;
        document.getElementById('godisteU').value = godisteInput;
        document.getElementById('kilometrazaU').value = kilometrazaInput;
        document.getElementById('menjacU').value = menjacInput;
        document.getElementById('gorivoU').value = gorivoInput;


        document.getElementById('markaU').removeAttribute('disabled');
        document.getElementById('modelU').removeAttribute('disabled');
        document.getElementById('godisteU').removeAttribute('disabled');
        document.getElementById('kilometrazaU').removeAttribute('disabled');
        document.getElementById('menjacU').removeAttribute('disabled');
        document.getElementById('gorivoU').removeAttribute('disabled');
        document.getElementById('unesiBtnU').removeAttribute('disabled');

         let idArray = myArray[0].split(':');
        console.log("id " + idArray);
         let idTrim = idArray[1];
         const id = idTrim.trim();
         console.log("id " + id);

         window.idUpdate = id;
}