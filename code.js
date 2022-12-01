let randomNo = Math.floor( Math.random() * 100 );
    console.log(randomNo);

// Zähler für die Anzahl der Versuche und array für bereits geratene Zahlen.
let noOfGuesses = 0;
let guessedNumbers = [];

function startGame(){

    // Variable für Zufallszahl wird initialisiert.
    // !!FRAGE!! Dies hat nicht funktioniert, da diese Variable in der zweiten Funktion s.u. nicht bekannt ist. 
    // Wie reicht man diese Variable am besten an andere Funktionen weiter ohne sie global zu stellen?
    /* let randomNo = Math.floor( Math.random() * 100 );
    console.log(randomNo); */
      
    // Neues Element erstellen. Info an User.
    const node = document.createElement("h1");
    const textnode = document.createTextNode("Eine Zahl zwischen 0 und 100 wurde zufällig ausgewählt.");
    node.appendChild(textnode);

    // Zweites Element erstellen, damit Text in neue Zeile kommt. Geht bestimmt auch einfacher in einem einzigen Element, ich wusste aber nicht wie.
    const node2 = document.createElement("h1");
    const textnode2 = document.createTextNode("Gib deinen Tipp im Kästchen ein und drücke 'OK'");
    node2.appendChild(textnode2);

    // Erstelle Input Feld mit Typ Zahlen.
    const inputField = document.createElement("input");
    inputField.setAttribute("type", "number");
    inputField.setAttribute("id", "guess");

    //Erstelle OK-Button
    const button = document.createElement("button");
    button.setAttribute("onclick", "compareInput()");
    const buttonTxt = document.createTextNode("OK");
    button.appendChild(buttonTxt);

    //Erstelle eine leere Dialog-Zeile. Diese wird später in der Funktion compareInput() mit Infos an die User gefüllt.
    const node3 = document.createElement("h1");
    const textnode3 = document.createTextNode("");
    node3.appendChild(textnode3);
    //Weitere Dialog-Zeile "Bereits geratene Zahlen"
    const node4 = document.createElement("h1");
    const textnode4 = document.createTextNode("Bereits geratene Zahlen: ");
    node4.appendChild(textnode4);
    //Weitere Dialog-Zeile "Anzahl der Versuche"
    const node5 = document.createElement("h1");
    const textnode5 = document.createTextNode("Anzahl der Versuche: ");
    node5.appendChild(textnode5);

    // Elemente dem Dokument anfügen.
    document.getElementById("infotext").appendChild(node);
    document.getElementById("infotext").appendChild(node2);
    document.getElementById("eingabe").appendChild(inputField);
    document.getElementById("btn-ok").appendChild(button);
    document.getElementById("message1").appendChild(node3);
    document.getElementById("message2").appendChild(node4);
    document.getElementById("message3").appendChild(node5);
}

function compareInput(){

    // Eingegebene Zahl einlesen
    let inputValue = document.getElementById("guess").value;

    let msg1 = document.getElementById("message1");
    let msg2 = document.getElementById("message2");
    let msg3 = document.getElementById("message3"); 

        if (inputValue>100 || inputValue<0){
            alert("Deine Eingabe ist ungültig. Bitte eine Zahl zwischen 0-100 eingeben.");
        }
        else
            guessedNumbers.push(inputValue);
            noOfGuesses+= 1;
            
            if (inputValue<randomNo){
                msg1.textContent = "Dein Tipp ist zu niedrig. Gib eine höhere Zahl ein."
                msg2.textContent = "Bereits geratene Zahlen: " + guessedNumbers;
                msg3.textContent = "Anzahl der Versuche: " + noOfGuesses;
            }
            else if (inputValue>randomNo){
                msg1.textContent = "Dein Tipp ist zu hoch. Gib eine niedrigere Zahl ein."
                msg2.textContent = "Bereits geratene Zahlen: " + guessedNumbers;
                msg3.textContent = "Anzahl der Versuche: " + noOfGuesses;
            }
            else if (inputValue==randomNo){
                msg1.textContent = "Dein Tipp ist richtig. Glückwunsch, du hast gewonnen!"
                msg2.textContent = "Die richtige Zahl war die " + inputValue + ".";
                msg3.textContent = "Du hast insgesamt " + noOfGuesses + " Versuche benötigt.";
        }
            else {
                console.log("Dieser Fall war nicht vorgesehen")
        }
            
   // document.getElementById("eingabe").reset();
}