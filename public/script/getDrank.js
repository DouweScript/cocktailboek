let rawFile = new XMLHttpRequest();
let drankDB = {};
let frisDB = {};

rawFile.open("GET", "./assets/drank.json", false);
rawFile.onreadystatechange = function() {
    if (rawFile.readyState == 4 && rawFile.status == 200 || rawFile.status == 0){
        let jsonString = rawFile.responseText;
        drankDB = JSON.parse(jsonString);
    }
}
rawFile.send(null);

select = document.getElementById('selectDrank');

for (let key in drankDB) {
    let opt = document.createElement('option');
    opt.innerHTML = drankDB[key].naam
    select.appendChild(opt);
}

rawFile = new XMLHttpRequest();

rawFile.open("GET", "./assets/fris.json", false);
rawFile.onreadystatechange = function() {
    if (rawFile.readyState == 4 && rawFile.status == 200 || rawFile.status == 0){
        let jsonString = rawFile.responseText;
        frisDB = JSON.parse(jsonString);
    }
}
rawFile.send(null);

select = document.getElementById('selectFris');

for (let key in frisDB) {
    let opt = document.createElement('option');
    opt.innerHTML = frisDB[key].naam
    select.appendChild(opt);
}