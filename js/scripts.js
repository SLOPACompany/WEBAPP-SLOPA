let validat = false; 
let codiclasse;
let scriptURL = "https://script.google.com/macros/s/AKfycbxeC47xF70GvKHp4sfxZ5nBuX93ln05D6kyP4z_qt5vVEEvDJCZyFRc62oBra3eL-lx/exec"; 

function inici_sessio() {
    codiclasse = document.getElementById("introcodi").value; 
    let consulta = scriptURL + "?query=select&where=codiclasse&is=" + codiclasse;
    fetch(consulta)
        .then((resposta) => resposta.json())
        .then((resposta) => {
            if (resposta.length == 0) { 
                window.alert("Aquest codi de classe no es valid");
            } else { 
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

