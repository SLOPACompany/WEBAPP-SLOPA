//VARIABLES 
let basedades;
let scriptURL = "https://script.google.com/macros/s/AKfycbxeC47xF70GvKHp4sfxZ5nBuX93ln05D6kyP4z_qt5vVEEvDJCZyFRc62oBra3eL-lx/exec"; 
let validat = false; 
let codiclasse;

//SCRIPT AL CARREGAR PAGINA  (despareixer el loader carregar pagina & Consulta database)
window.onload=function(){

    let consulta2 = scriptURL + "?query=select";
    let basedades;
    fetch(consulta2)
        .then((res) => {
          return res.json();
     })
        .then((data) => {
         basedades = data;
         console.log(basedades);
        })
     .catch((error) => {
         console.error('Error al fer la consulta:', error);
     });
     
   $('#loading').fadeOut();
}



//FUNCIO LOGIN SCRIPT ALUMNAT (predeterminat)
function inici_sessio() {
    document.getElementById("loading").style.display = "flex"; 
    codiclasse = document.getElementById("introcodi").value; 
    let consulta = scriptURL + "?query=select&where=codiclasse&is=" + codiclasse;
    fetch(consulta)
        .then((resposta) => resposta.json())
        .then((resposta) => {
            if (resposta.length == 0) {
                document.getElementById("loading").style.display = "none"; 
                document.getElementById("login-notify-error").style.display = "flex";
                eliminarText();
            } else { 
                document.getElementById("loading").style.display = "none";
                document.getElementById("login-notify-ok").style.display = "flex";
            }
        });
} 

//FUNCIO D'USUARI VERIFICAT
function inicia_sessio() {
    validat = true;
    document.getElementById("login-notify-ok").style.display = "none";
    document.getElementById("seccio_0").style.display = "none"; 
    document.getElementById("menu").style.display = "flex"; 
    canvia_seccio(1); 
}

//FUNCIO TANCAR SESSIO USUARI
function tanca_sessio() {
    if (validat) {
        validat = false; 
        location.reload(); 
    }
}

//FUNCIO PER TREURE TOTS ELS TEXTOS DEL INPUT
function eliminarText() {
    document.getElementById("introcodi").value = "";
    document.getElementById("introcodiprof").value = "";
    document.getElementById("introcontraprof").value = "";
}

//FUNCIO CANVI DE PAGINES EN MENU
function canvia_seccio(num_boto) {
    const menu = document.getElementById("menu");
    const num_botons = menu.children.length; 
    for (let i = 1; i < num_botons; i++) {
        let boto = document.getElementById("boto_" + i);
        let seccio = document.getElementById("seccio_" + i);
        if (i == num_boto) {
            boto.style.color = "#8b8b8b"; 
            boto.style.backgroundColor =""; 
            seccio.style.display = "flex"; 
        } else {
            boto.style.color = "white"; 
            boto.style.backgroundColor = "";
            seccio.style.display = "none"; 
        }
    }
}

//FUNCIO DE POSAR GRAFICA


//FUNCIOS PER A PROFESORAT:
//FUNCIO CANVI LOGIN
function canviloginprof(){
    document.getElementById("loading").style.display = "flex";
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_0_1").style.display = "flex";
    document.getElementById("loading").style.display = "none";
} 

//FUNCIO INICAR SESSIO
function inicia_ses_professorat() {
    validat = true; 
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_0_1").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("menuprof").style.display = "flex";
    document.getElementById("seccio_5").style.display = "none";
    document.getElementById("login-notify-ok-profes").style.display = "none";
    
}

//LOGIN CLASSE I CONTRASENYA PROFESORAT
function inicia_sessio_professorat(){
    document.getElementById("loading").style.display = "flex";
    codiclasse = document.getElementById("introcodiprof").value; 
    contrasenya = document.getElementById("introcontraprof").value;
    let consulta = scriptURL + "?query=select&where=codiclasse&is=" + codiclasse + "&and=contrasenya_profes&equal=" + contrasenya;
    fetch(consulta)
        .then((resposta) => resposta.json())
        .then((resposta) => {
            if (resposta.length === 0) { 
                document.getElementById("loading").style.display = "none";
                document.getElementById("login-notify-error").style.display = "flex";
                eliminarText();
            } else { 
                document.getElementById("loading").style.display = "none";
                document.getElementById("login-notify-ok-profes").style.display = "flex";
            }
        });
} 

function sorirbtnoti(){
    document.getElementById("login-notify-error").style.display = "none";
}