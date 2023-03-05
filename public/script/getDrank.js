let rawFile = new XMLHttpRequest();
let alcoholDB = {};
let nonalcoholDB = {};

rawFile.open("GET", "./assets/alcohol.json", false);
rawFile.onreadystatechange = function() {
    if (rawFile.readyState == 4 && rawFile.status == 200 || rawFile.status == 0){
        let jsonString = rawFile.responseText;
        alcoholDB = JSON.parse(jsonString);
    }
}
rawFile.send(null);

select = document.getElementById('selectalcohol');

for (let key in alcoholDB) {
    let opt = document.createElement('option');
    opt.innerHTML = alcoholDB[key].naam
    select.appendChild(opt);
}

rawFile = new XMLHttpRequest();

rawFile.open("GET", "./assets/nonalcohol.json", false);
rawFile.onreadystatechange = function() {
    if (rawFile.readyState == 4 && rawFile.status == 200 || rawFile.status == 0){
        let jsonString = rawFile.responseText;
        nonalcoholDB = JSON.parse(jsonString);
    }
}
rawFile.send(null);

select = document.getElementById('selectnonalcohol');

for (let key in nonalcoholDB) {
    let opt = document.createElement('option');
    opt.innerHTML = nonalcoholDB[key].naam
    select.appendChild(opt);
}