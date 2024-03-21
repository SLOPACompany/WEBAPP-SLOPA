//SCRIPT LODAER (despareixer al carregar pagina)
window.onload=function(){
    $('#loading').fadeOut();
}

//VARIABLES
let validat = false; 
let codiclasse;
let scriptURL = "https://script.google.com/macros/s/AKfycbxeC47xF70GvKHp4sfxZ5nBuX93ln05D6kyP4z_qt5vVEEvDJCZyFRc62oBra3eL-lx/exec"; 
let CLASSE

//LOGIN SCRIPT
function inici_sessio() {
    document.getElementById("loading").style.display = "flex"; 
    codiclasse = document.getElementById("introcodi").value; 
    let consulta = scriptURL + "?query=select&where=codiclasse&is=" + codiclasse;
    fetch(consulta)
        .then((resposta) => resposta.json())
        .then((resposta) => {
            if (resposta.length == 0) {
                document.getElementById("loading").style.display = "none"; 
                window.alert("Codi de classe no vàlid");
                eliminarText();
            } else { 
                document.getElementById("loading").style.display = "none";
                window.alert("S'ha iniciat correctament la sessió !");
                inicia_sessio(); 
            }
        });
} 

function inicia_sessio() {
    validat = true; // usuari validat
    document.getElementById("seccio_0").style.display = "none"; 
    document.getElementById("menu").style.display = "flex"; 
    canvia_seccio(1); // es mostra la secció 1
}

function tanca_sessio() {
    if (validat) {
        validat = false; // usuari desvalidat
        location.reload(); // recàrrega de la pàgina, es reinicialitzen totes les variables
    }
}

function eliminarText() {
    document.getElementById("introcodi").value = "";
}



//MENU SCRIP
function canvia_seccio(num_boto) {
    const menu = document.getElementById("menu");
    const num_botons = menu.children.length; // el nombre de botons dins de l'element "menu"
    for (let i = 1; i < num_botons; i++) {
        let boto = document.getElementById("boto_" + i);
        let seccio = document.getElementById("seccio_" + i);
        if (i == num_boto) {
            boto.style.color = "#8b8b8b"; // es destaca la secció activa amb el canvi de colors del botó corresponent
            boto.style.backgroundColor =""; //color cuant seleciones un item
            seccio.style.display = "flex"; // es fa visible la secció activa
        } else {
            boto.style.color = "white"; // colors dels botons de seccions inactives
            boto.style.backgroundColor = "";
            seccio.style.display = "none"; // s'oculten les seccions inactives
        }
    }
}


//FUNCIOS PER A PROFESORAT

//CANVI LOGIN
function canviloginprof(){
    document.getElementById("loading").style.display = "flex";
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_0_1").style.display = "flex";
    document.getElementById("loading").style.display = "none";
} 

//BOTO INICAR SESSIO
function inicia_ses_professorat() {
    validat = true; // usuari validat
    document.getElementById("seccio_0").style.display = "none";
    document.getElementById("seccio_0_1").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("seccio_PROFES").style.display = "flex"; 
    
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
            if (resposta.length == 0) { // llista buida
                document.getElementById("loading").style.display = "none";
                window.alert("El nom d'usuari o la contrasenya no són correctes.");
            } else { // llista amb (almenys) un registre
                document.getElementById("loading").style.display = "none";
                window.alert("S'ha iniciat correctament la sessió.");
                inicia_ses_professorat()
            }
        });
} 

//SECCIO PROFESS