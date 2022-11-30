var randomNo = Math.floor( Math.random() * 100 );
    console.log(randomNo);

function startGame(){

    // Variable für Zufallszahl wird initialisiert.
    // !!FRAGE!! Dies hat nicht funktioniert, da diese Variable in der zweiten Funktion s.u. nicht bekannt ist. Wie reicht man diese Variable am besten an andere Funktionen weiter ohne sie global zu stellen?
    
      
    // Neues Element erstellen. Info an User. Die Zufallszahl wird hier nicht wirklich erzeugt. Dies erfolgt erst, beim Klick auf den OK-Button
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


    // Elemente dem Dokument anfügen.
    document.getElementById("infotext").appendChild(node);
    document.getElementById("infotext").appendChild(node2);
    document.getElementById("eingabe").appendChild(inputField);
    document.getElementById("btn-ok").appendChild(button);
}

function compareInput(){

    // Eingegebene Zahl einlesen
    let inputValue = document.getElementById("guess").value;
    
        if (inputValue<randomNo){
            console.log("Dein Tipp ist zu klein. Gib eine höhere Zahl ein.")
        }
        else if (inputValue>randomNo){
            console.log("Dein Tipp ist zu groß. Gib eine niedrigere Zahl ein.")
        }
        else if (inputValue==randomNo){
            console.log("Dein Tipp ist richtig. Glückwunsch, du hast gewonnen!")
        }
        else if (0>inputValue>100){
            console.log("Deine Eingabe ist ungültig. Bitte eine Zahl zwischen 0-100 eingeben.")
        }
    
   // document.getElementById("eingabe").reset();
}