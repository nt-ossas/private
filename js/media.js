var i=0;
var subjects = [];
//aggiungi i voti
function add(subjectIndex){
    var removeButton = document.createElement("button");
    var voto = parseFloat(document.getElementById("voto-" + subjectIndex).value);
    var peso = parseFloat(document.getElementById("peso-" + subjectIndex).value);

    // Add the grade and weight to the appropriate subject
    subjects[subjectIndex].voti.push(voto);
    subjects[subjectIndex].pesi.push(peso);
    if(peso<1||peso>100){
        alert("Il peso deve andare da 1 a 100 coglione !");
        location.reload();
    }
    var ul = document.getElementById("media-" + (subjectIndex));
    var li = document.createElement("li");
    li.textContent = voto + " (" + peso + "%)";
    removeButton.textContent = "x";
    removeButton.classList.add("remove");
    removeButton.onclick = function() {
        var index = Array.prototype.indexOf.call(ul.children, li);
        subjects[subjectIndex].voti.splice(index, 1);
        subjects[subjectIndex].pesi.splice(index, 1);
        ul.removeChild(li);
    };
    ul.appendChild(li);
    li.appendChild(removeButton);
    saveData();
}
//calcola la media dei voti
function calc(subjectIndex){
    var somma_voti = 0;
    var somma_pesi = 0;
    const mediaf = document.getElementById("mediaf-" + subjectIndex);
    const comment = document.getElementById("comment-" + subjectIndex);

    for(let j = 0; j < subjects[subjectIndex].voti.length; j++){
        somma_voti += subjects[subjectIndex].voti[j] * subjects[subjectIndex].pesi[j];
        somma_pesi += subjects[subjectIndex].pesi[j];
    }

    var media = somma_voti / somma_pesi;

    if(subjects[subjectIndex].voti.length > 0){
        if(media>=6){
            mediaf.style.backgroundColor = "green";
            if(media>9){
                comment.textContent = "+ 1.000.000 aura !"
            }
            else{
                comment.textContent = "+ 1.000 aura !"
            }
        }
        else if(media<5){
            mediaf.style.backgroundColor = "red";
            comment.textContent = "Calzuò che mi combini"
        }
        else if(media<6){
            mediaf.style.backgroundColor = "orange";
            comment.textContent = "- 1.000 aura..."
        }
        mediaf.style.boxShadow = `0 0 25px 0 ${mediaf.style.backgroundColor}`;
        comment.style.color = `${mediaf.style.backgroundColor}`;
        mediaf.textContent = media.toFixed(2);
    }
    else{
        alert("Devi inserire almeno un voto!");
    }
    saveData();
}
//aggiungi le materie
function materia(){
    var newSubject = {
        voti: [],
        pesi: []
    };
    subjects.push(newSubject);
    var materia = document.getElementById("materia");
    var materia2 = document.createElement("li");
    materia.appendChild(materia2);
    materia2.classList.add("sub");
    materia2.innerHTML = `<button onclick="cambio(` + i + `)">` + (i+1) + `</button><input type="text" placeholder="Materia..." id="i` + (i+1) + `">`
    // Crea la nuova materia
    var nuovaMateria = document.createElement("main");
    nuovaMateria.classList.add("materia-attuale");
    nuovaMateria.id = "materia-" + (i+1); // Assegna un ID univoco

    // Aggiungi il contenuto HTML
    nuovaMateria.innerHTML = `<div class="main">
    <h3>Calcola la media !</h3>
            <select id="voto-` + i +`">
                <option value="10">10</option>
                <option value="9.75">10-</option>
                <option value="9.5">9.5</option>
                <option value="9.25">9+</option>
                <option value="9">9</option>
                <option value="8.75">9-</option>
                <option value="8.5">8.5</option>
                <option value="8.25">8+</option>
                <option value="8">8</option>
                <option value="7.75">8-</option>
                <option value="7.5" selected>7.5</option>
                <option value="7.25">7+</option>
                <option value="7">7</option>
                <option value="6.75">7-</option>
                <option value="6.5">6.5</option>
                <option value="6.25">6+</option>
                <option value="6">6</option>
                <option value="5.75">6-</option>
                <option value="5.5">5.5</option>
                <option value="5.25">5+</option>
                <option value="5">5</option>
                <option value="4.75">5-</option>
                <option value="4.5">4.5</option>
                <option value="4.25">4+</option>
                <option value="4">4</option>
                <option value="3.75">4-</option>
                <option value="3.5">3.5</option>
                <option value="3.25">3+</option>
                <option value="3">3</option>
                <option value="2.75">3-</option>
                <option value="2.5">2.5</option>
                <option value="2.25">2+</option>
                <option value="2">2</option>
            </select>            
            <input type="text" placeholder="100%" value="100" id="peso-` + i + `">
            <div class="flex">
                <button onclick="add(` + i + `)" class="add" id="add-` + i + `">+</button>
                <button onclick="calc(` + i + `)" class="calc" id="calc-` + i + `">%</button>
                <button onclick="cancel()" id="cancel" ><i class="fa-solid fa-arrows-rotate"></i></button>
            </div>
            <h3>Qui vedrai i voti e i pesi:</h3>
            <ul class="media" id="media-` + i + `">
                <li></li>
            </ul>
            <h1 class="mediaf" id="mediaf-` + i + `"></h1>
            <h3 class="comment" id="comment-` + i + `"></h3>
        </div>`;
    // Aggiungi la nuova materia al documento
    document.body.appendChild(nuovaMateria);
    cambio(i);
    i++;
    saveData();
}
//cambia le materie
function cambio(n) {
    var materias = document.querySelectorAll(".materia");
    materias.forEach(element => {
        // Disattiva tutte le materie
        element.classList.add("off");
    });
    // Attiva solo la materia selezionata
    var materiaSelezionata = document.querySelector("#materia-" + (n+1));
    materiaSelezionata.classList.toggle("off");
    console.log("cambio " + (n+1));
}
//cancel voti
function cancel(){
    //todo: fare la funzione cancel che rimuove voti pesi e medie
}

function saveData() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

// Funzione per caricare i dati dal Local Storage
function loadData() {
    const savedSubjects = localStorage.getItem('subjects');
    if (savedSubjects) {
        subjects = JSON.parse(savedSubjects);
    }
}

// Chiamata alla funzione loadData all'avvio del sito web
loadData();