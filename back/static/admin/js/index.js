function init(){

    if(document.cookie == null || document.cookie == "token=" || document.cookie == ""){
        window.location.href = "/admin/login";
    }

    document.getElementById("logOut").addEventListener("click", e=>{

        document.cookie = `token=;SameSite=Lax`;
        window.location.href = "/admin/login";

    });
    document.getElementById("useriBtn").addEventListener("click", e=>{

        window.location.href = "/admin/users";

    });
    document.getElementById("automobiliBtn").addEventListener("click", e=>{

        window.location.href = "/admin/auto";

    });
    document.getElementById("motoriBtn").addEventListener("click", e=>{

        window.location.href = "/admin/motor";

    });
    document.getElementById("oglasi_automobilaBtn").addEventListener("click", e=>{

        window.location.href = "/admin/oglas_auto";

    });
    document.getElementById("oglasi_motoraBtn").addEventListener("click", e=>{

        window.location.href = "/admin/oglas_motor";

    });
    setTimeout(function(){
        document.getElementById("prvi").classList.remove("none");
        document.getElementById("prvi").classList.add("fadeIn");
    }, 300);
    setTimeout(function(){
        document.getElementById("drugi").classList.remove("none");
        document.getElementById("drugi").classList.add("fadeIn");
    }, 300);
    setTimeout(function(){
        document.getElementById("treci").classList.remove("none");
        document.getElementById("treci").classList.add("fadeIn");
    }, 300);
    setTimeout(function(){
        document.getElementById("cetvrti").classList.remove("none");
        document.getElementById("cetvrti").classList.add("fadeIn");
    }, 300);
    setTimeout(function(){
        document.getElementById("peti").classList.remove("none");
        document.getElementById("peti").classList.add("fadeIn");
    }, 300);


}