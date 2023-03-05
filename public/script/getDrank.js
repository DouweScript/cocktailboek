let rawFile = new XMLHttpRequest();
let alcoholDB = {};
let nonAlcoholDB = {};

rawFile.open("GET", "./assets/alcohol.json", false);
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status === 200 || rawFile.status === 0){
        let jsonString = rawFile.responseText;
        alcoholDB = JSON.parse(jsonString);
    }
}
rawFile.send(null);

select = document.getElementById('selectAlcohol');

for (let key in alcoholDB) {
    let opt = document.createElement('option');
    opt.innerHTML = alcoholDB[key].name
    select.appendChild(opt);
}

rawFile = new XMLHttpRequest();

rawFile.open("GET", "./assets/nonAlcohol.json", false);
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status === 200 || rawFile.status === 0){
        let jsonString = rawFile.responseText;
        nonAlcoholDB = JSON.parse(jsonString);
    }
}
rawFile.send(null);

select = document.getElementById('selectNonAlcohol');

for (let key in nonAlcoholDB) {
    let opt = document.createElement('option');
    opt.innerHTML = nonAlcoholDB[key].name
    select.appendChild(opt);
}