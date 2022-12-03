/////////////////////////////////////////////////////////////////////
///////////////////// Globale Variablen ////////////////////////////
// Variablen für compareInput() - Zähler für die Anzahl der Versuche, 
// Array für bereits geratene Zahlen und die Zufallszahl.
let numOfGuesses;
let guessedNumbers;
let randomNum;
/////////////////////////////////////////////////////////////////////
/////////////////////// Event Listener /////////////////////////////
// Event Listener für Button "Start". Macht einen Callback auf startGame().
function startGameButtonEventListener(){
    let start = document.getElementById("start");
    start.addEventListener("click", startGame);
    return start;
}
startGameButtonEventListener();
// Entfernt EL für Button "Start" (damit der Knopf nicht mehrfach gedrückt werden kann)
function removeStartGameButtonEventListener(){
    start.removeEventListener("click", startGame);
}
// Event Listener für "Neu starten"-Button
function restartGameButtonEventListener(){
    let restart = document.getElementById("restart");
    restart.addEventListener("click", restartGame);
}
//////////////////////////////////////////////////////////////////////
/////////////////////// Hilfs-Funktionen /////////////////////////////
// Erstellen einer Zufallszahl
function randomNumGen(){
    let randomNum = Math.floor( Math.random() * 100 );
        console.log(randomNum);
        /* loesung = document.createTextNode("Lösung " + randomNum);
        document.body.appendChild(loesung); */
        return randomNum;
    }
// Funktion zum Zurücksetzen der globalen Variablen
// Wird zum Neustart des Spiels benötigt
function resetGlobalVariables(){
    randomNum = randomNumGen();
    numOfGuesses = 0
    guessedNumbers = [];
}
// Initiales Zurücksetzen der globalen Variablen
resetGlobalVariables();
// Ersetzt, falls vorhanden, den "Start"-Knopf durch einen "Neu starten"-Knopf.
// Setzt außerdem die globalen Variablen zurück. Wird bei Erraten der richtigen Zahl ausgeführt.
function replaceStartButton(){
    if (document.getElementById("restart")){
        resetGlobalVariables();
    }
    else {
        let restart = document.createElement("button");
        restart.textContent = "Neu starten";
        restart.id = "restart";
        let startChild = document.getElementById("start");
        let startParent = startChild.parentNode;
        startParent.replaceChild(restart, start);
        restartGameButtonEventListener();
        resetGlobalVariables();
    }
}
// Allgemeine createElement-Funktion. Nimmt den Elementtyp und ein Objekt mit Attributwerten entgegenen.
// Ein Element mit entsprechendem Typ wird erstellt. Danach wird durch die Attribute des Objekts iteriert 
// und diese werden dem Element hinzugefügt. Am Ende wird das fertige Element dem HTML Main-Container hinzugefügt.
// Hilfreiche Quellen: https://stackoverflow.com/questions/43168284/javascript-createelement-function
// https://www.w3schools.com/jsref/met_document_createelement.asp
function createElement(type, attributes){
    let element = document.createElement(type);
    for (var key in attributes){
        element[key] = attributes[key];
    }
    document.getElementById("container").appendChild(element);
}
/////////////////////////////////////////////////////////////////////
/////////////////////// Kern-Funktionen /////////////////////////////
// Funktion, die das Spielfeld aufbaut. Wird über den Start-Button aufgerufen.
function startGame(){
    /////// Spielfeld aufbauen
    // Neue Text-Elemente erstellen. Info an User.
    createElement("h3", {"textContent":"Eine Zahl zwischen 0 und 100 wurde zufällig ausgewählt.", "id":"info1"});
    createElement("h3", {"textContent":"Gib deinen Tipp im Kästchen ein und drücke 'OK'", "id":"info2"});

    // Erstelle Input Feld mit Typ Zahlen.
    createElement("input", {"type":"number", "id": "guess"});

    // Erstelle OK-Button
    createElement("button", {"textContent":"OK", "id":"ok-btn"});

    // Erstelle drei Dialog-Zeilen
    createElement("p", {"textContent":"", "id":"message1"});
    createElement("p", {"textContent":"Bereits geratene Zahlen: ", "id":"message2"});
    createElement("p", {"textContent":"Anzahl der Versuche: ", "id":"message3"});
    
    /////// Event Listener
    // Event Listener auf Ok-Button mit Callback auf compareInput().
    let compare = document.getElementById('ok-btn');
    compare.addEventListener("click", compareInput);

    // Event Listener, der beim Drücken von "Enter" einen click auf den OK-Button auslöst.
    // Dies geht nur, wenn das Input Feld aktiv ist, d.h. wenn darin eine Eingabe passiert. 
    let input = document.getElementById("guess");
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("ok-btn").click();
        }
    });
    // Dies war nötig, damit das Spiel bei einem Neustart in keinen Referenz-Fehler läuft
    // Ein Element mit der ID start ist nach einem Neustart nicht mehr vorhanden.
    if (document.getElementById("start")){
        removeStartGameButtonEventListener()
    }
    else {
        console.log("Nichts tun");
    }
}

// Beginnt das Spiel von Neuem. Alle Elemente werden entfernt
// und neu hinzugefügt. Das geht bestimmt auch eleganter
function restartGame(){
/*     if (document.getElementById("info1")){
        // Alte Elemente entfernen */
        document.getElementById("info1").remove();
        document.getElementById("info2").remove();
        document.getElementById("guess").remove();
        document.getElementById("ok-btn").remove();
        document.getElementById("message1").remove();
        document.getElementById("message2").remove();
        document.getElementById("message3").remove();
        startGame();
/*     }
    else {
        startGame();
    } */
}

// Vergleicht die User-Eingabe mit der Zufallszahl, gibt Dialoge aus und
// leitet bei Spielende einen Reset der globalen Variablen ein.
function compareInput(){
    // Eingegebene Zahl einlesen
    let inputValue = document.getElementById("guess").value;
    // Die drei Dialogzeilen werden in Variablen gespeichert
    let msg1 = document.getElementById("message1");
    let msg2 = document.getElementById("message2");
    let msg3 = document.getElementById("message3");    

        if (inputValue>100 || inputValue<0){
                alert("Deine Eingabe ist ungültig. Bitte eine Zahl zwischen 0-100 eingeben.");
        }
        else if 
            (!inputValue){
                msg1.innerHTML = "<h1>Bitte eine Zahl eingeben.</h1>";
        }
        else{
            guessedNumbers.push(" " + inputValue);
            numOfGuesses++;
                    
            if (inputValue<randomNum){
                msg1.textContent = "Dein Tipp ist zu niedrig. Gib eine höhere Zahl ein.";
                msg2.textContent = "Bereits geratene Zahlen: [" + guessedNumbers + " ]";
                msg3.textContent = "Anzahl der Versuche: " + numOfGuesses;
            }
            else if (inputValue>randomNum){
                msg1.textContent = "Dein Tipp ist zu hoch. Gib eine niedrigere Zahl ein."
                msg2.textContent = "Bereits geratene Zahlen: [" + guessedNumbers + " ]";
                msg3.textContent = "Anzahl der Versuche: " + numOfGuesses;
            }
            else if (inputValue==randomNum){
                msg1.innerHTML = "<h3>Glückwunsch, du hast gewonnen! <br/>Klicke oben auf 'Neu starten' für eine neue Runde.</h3>"
                msg2.textContent = "Die richtige Zahl war die " + inputValue + ".";
                msg3.textContent = "Du hast insgesamt " + numOfGuesses + " Versuche benötigt.";
                document.getElementById("ok-btn").removeEventListener("click", compareInput);
                replaceStartButton();
            }
            else {
                console.log("Dieser Fall war nicht vorgesehen")
            }
        }
}