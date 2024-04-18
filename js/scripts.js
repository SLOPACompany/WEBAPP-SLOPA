//VARIABLES 
let basedades;
let scriptURL = "https://script.google.com/macros/s/AKfycbxeC47xF70GvKHp4sfxZ5nBuX93ln05D6kyP4z_qt5vVEEvDJCZyFRc62oBra3eL-lx/exec"; 
let validat = false; 
let codiclasse;
let classe
let clase_trobada = false;


//FUNCIO AL CARREGAR PAGINA  (despareixer el loader carregar pagina & Consultar tota la database + assignacio a variable)
window.onload=function(){
    let consulta2 = scriptURL + "?query=select";
    fetch(consulta2)
        .then((res) => {
          return res.json();
     })
        .then((data) => {
         basedades = data;
         $('#loading').fadeOut();
        })
     .catch((error) => {
         console.error('Error al fer la consulta:', error);
     });
}

//FUNCIONS LOGIN's

//FUNCIO LOGIN SCRIPT ALUMNAT (predeterminat)
function inici_sessio() {
    document.getElementById("loading").style.display = "flex"; 
    codiclasse = document.getElementById("introcodi").value; 
    for (let i = 0; i < basedades.length; i++) {
        if (basedades[i]["codiclasse"]==codiclasse) { 
            classe=(basedades[i]["classe"]);  
            clase_trobada = true;
        }
    }
    if (clase_trobada == true) {
        document.getElementById("loading").style.display = "none"; 
        document.getElementById("login-notify-ok").style.display = "flex";
        classe_text();
        eliminarText();
    } else {
        document.getElementById("loading").style.display = "none";
        document.getElementById("login-notify-error").style.display = "flex";
    }
}  

//FUNCIO INDICAR QUINA CLASSE ES EN TEXT DE BENVINGUDA
function classe_text(){
    document.getElementById("textclasse").innerText = classe;
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

//FUNCIO CANVIAR DE LOGIN DE ALUMNAT A PROFESORAT
function canviloginprof(){
    document.getElementById("loading").style.display = "flex";
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_0_1").style.display = "flex";
    document.getElementById("loading").style.display = "none";
} 

//FUNCIO CANVIAR DE LOGIN DE PROFESORAT A ALUMNAT
function canviloginalum(){
    document.getElementById("loading").style.display = "flex";
    document.getElementById("seccio_0_1").style.display = "none";
    document.getElementById("seccio_0").style.display = "flex";   
    document.getElementById("loading").style.display = "none";
}

//FUNCIO INICAR SESSIO
function inicia_ses_professorat() {
    validat = true; 
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_0_1").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("menuprof").style.display = "flex";
    document.getElementById("seccio_5").style.display = "flex";
    document.getElementById("login-notify-ok-profes").style.display = "none";
    
}
 

//LOGIN CLASSE I CONTRASENYA PROFESORAT

function inicia_sessio_professorat() {
    document.getElementById("loading").style.display = "flex"; 
    codiclasse = document.getElementById("introcodiprof").value; 
    contrasenya = document.getElementById("introcontraprof").value;
    for (let i = 0; i < basedades.length; i++) {
        if (basedades[i]["codiclasse"]==codiclasse && basedades[i]["contrasenya_profes"]==contrasenya) { 
            classe=(basedades[i]["classe"]);  
            clase_trobada = true;
        }
    }
    if (clase_trobada == true) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("login-notify-ok-profes").style.display = "flex";
    } else {
        document.getElementById("loading").style.display = "none";
                document.getElementById("login-notify-error").style.display = "flex";
                eliminarText();
    }
}  

//FUNCIO  BOTO NOTIFI ERROR
function sorirbtnoti(){
    document.getElementById("login-notify-error").style.display = "none";
}

//FUNCIONS MENU's

//FUNCIO CANVI DE PAGINES EN MENU
function canvia_seccio(num_boto) {
    document.getElementById("seccio_5").style.display = "none";
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
// FUNCIO PER LA UNICA SECCIO DE EVALUACIO
function canvia_secio() {
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_1").style.display = "none";
    document.getElementById("seccio_2").style.display = "none";
    document.getElementById("seccio_3").style.display = "none";
    document.getElementById("seccio_4").style.display = "none";
    document.getElementById("seccio_5").style.display = "flex";

}


