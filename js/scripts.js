
//VARIABLES  (Declaracions de variables necessaries)
let basedades;
let scriptURL = "https://script.google.com/macros/s/AKfycbxeC47xF70GvKHp4sfxZ5nBuX93ln05D6kyP4z_qt5vVEEvDJCZyFRc62oBra3eL-lx/exec"; 
let validat = false; 
let codiclasse;
let classe;
let clase_trobada = false;
let cantidad = 0;
let reg_actual;

//FUNCIO AL CARREGAR LA PAGINA  (despareixer el loader carregar pagina i Baixar tota la database + assignacio a variable)
window.onload=function(){
    let consulta2 = scriptURL + "?query=select";
    fetch(consulta2)
        .then((res) => {
          return res.json();
     })
        .then((data) => {
         basedades = data;
         graficar()
         $('#loading').fadeOut();
        })
        
     .catch((error) => {
         console.error('Error al fer la consulta:', error);
     });

}


//FUNCIONS LOGIN's


//LOGIN ALUMNAT (login predeterminat)
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


//LOGIN  PROFESORAT (login amb codi de classe + contrasenya de profesorat)

function inicia_sessio_professorat() {
    document.getElementById("loading").style.display = "flex"; 
    codiclasse = document.getElementById("introcodiprof").value; 
    contrasenya = document.getElementById("introcontraprof").value;
    for (let i = 0; i < basedades.length; i++) {
        if (basedades[i]["codiclasse"] == codiclasse && basedades[i]["contrasenya_profes"] == contrasenya) {
            classe = basedades[i]["classe"];
            clase_trobada = true;
            reg_actual = i;
            const element = document.querySelector('.textclassaval');
            if (element) {
                element.textContent = classe; 
            }
        }
    } 
    if (clase_trobada) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("login-notify-ok-profes").style.display = "flex";
    } else {
        document.getElementById("loading").style.display = "none";
        document.getElementById("login-notify-error").style.display = "flex";
        eliminarText();
    }
}    

//FUNCIO D'USUARI VERIFICAT (Un cop validat canviar valor variable + amagar login i mostrar pantalla 1)
function inicia_sessio() {
    validat = true;
    document.getElementById("login-notify-ok").style.display = "none";
    document.getElementById("seccio_0").style.display = "none"; 
    document.getElementById("menu").style.display = "flex"; 
    canvia_seccio(1);
}

//FUNCIO TANCAR SESSIO USUARI (Canviar el valor de la variable i refrescar la pagina)
function tanca_sessio() {
    if (validat) {
        validat = false; 
        location.reload(); 
    }
}

//FUNCIO PER TREURE TOTS ELS TEXTOS DEL INPUT (Substitueix els valors per a res per fer la funcio de netejar els inputs)
function eliminarText() {
    document.getElementById("introcodi").value = "";
    document.getElementById("introcodiprof").value = "";
    document.getElementById("introcontraprof").value = "";
}

//FUNCIO CANVIAR DE LOGIN DE ALUMNAT A PROFESORAT (Canvia el login de alumnes al de prefesorat ocultant el d'alumnes i mostrant el de profesorat)
function canviloginprof(){
    document.getElementById("loading").style.display = "flex";
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_0_1").style.display = "flex";
    document.getElementById("loading").style.display = "none";
} 

//FUNCIO CANVIAR DE LOGIN DE PROFESORAT A ALUMNAT (Amagar el login de profesorat i mostrar el login de alumnat)
function canviloginalum(){
    document.getElementById("loading").style.display = "flex";
    document.getElementById("seccio_0_1").style.display = "none";
    document.getElementById("seccio_0").style.display = "flex";   
    document.getElementById("loading").style.display = "none";
}

//FUNCIO D'USUARI VERIFICAT COM A PROFESSORAT (Un cop validat canviar valor variable + amagar login i mostrar pantalla de evaluacio com a profesorat)
function inicia_ses_professorat() {
    validat = true; 
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_0_1").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("menuprof").style.display = "flex";
    document.getElementById("seccio_5").style.display = "flex";
    document.getElementById("login-notify-ok-profes").style.display = "none";
}
 

//FUNCIO INDICAR CLASSE EN TEXT DE BENVINGUDA (Canvia el valor del text per el nomb de la classe treta del login)
function classe_text(){
    document.getElementById("textclasse").innerText = classe;
    document.getElementById("textclasseprofile").innerText = classe;
}



//FUNCIO ACTUALITZAR LA PUNTUACIO (Consulta que actualitza la puntuacio de classe a la base de dades)
function update_puntu() {
    let consulta3 = scriptURL + "?query=update&where=codiclasse&is=" + basedades[reg_actual]["codiclasse"]+ "&values=*$$*$$=sum(" + basedades[reg_actual]["puntuacio"] + "," + cantidad + ")$$*";
    fetch(consulta3);
    location.reload(); 
}      


//FUNCIO  BOTO NOTI ERROR (Amaga la notificacio de error al clicar el boto de sortir)
function sorirbtnoti(){
    document.getElementById("login-notify-error").style.display = "none";
}


//FUNCIONS MENU's

//FUNCIO CANVI DE PAGINES EN MENU (Canvi de seccions amb la barra de menu + cridar la funcio de actualitzar el text de classe)
function canvia_seccio(num_boto) {
    classe_text();
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

// FUNCIO PER LA UNICA SECCIO DE EVALUACIO (mostrar la seccio de avaluacio per al professorat independent a la anterior funcio)
function canvia_secio() {
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_1").style.display = "none";
    document.getElementById("seccio_2").style.display = "none";
    document.getElementById("seccio_3").style.display = "none";
    document.getElementById("seccio_4").style.display = "none";
    document.getElementById("seccio_5").style.display = "flex";

}



//CONTADOR PUNUTACIO EVALUACIO (Augmentar o disminuir la puntuacio sobre la varaiable "cantidad" per acutalitzar la puntuacio)
document.addEventListener('DOMContentLoaded', function() {
    const inputCantidad = document.querySelector('.input-cantidad');
    const btnDisminuir = document.querySelector('.btn-disminuir');
    const btnAumentar = document.querySelector('.btn-aumentar');
  

    function actualizarCantidad() {
      inputCantidad.value = cantidad;
      if (cantidad < 0) {
        inputCantidad.classList.add('numero-negativo');
      } else {
        inputCantidad.classList.remove('numero-negativo');
      }
      if (cantidad < 0) {
        inputCantidad.classList.add('numero-negativo');
      } else if (cantidad > 0) {
        inputCantidad.classList.add('numero-positivo');
      }
    }
  
    btnDisminuir.addEventListener('click', function() {
      cantidad--;
      actualizarCantidad();
    });
  
    btnAumentar.addEventListener('click', function() {
      cantidad++;
      actualizarCantidad();
    });
  
    actualizarCantidad();
  });
  