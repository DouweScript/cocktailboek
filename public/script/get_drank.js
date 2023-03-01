let rawFile = new XMLHttpRequest();
let drankDB = {};

rawFile.open("GET", "./assets/drank.json", false);
rawFile.onreadystatechange = function() {
    if (rawFile.readyState == 4 && rawFile.status == 200 || rawFile.status == 0){
        let jsonString = rawFile.responseText;
        drankDB = JSON.parse(jsonString);
    }
}
rawFile.send(null);

//let optionsDrank = "";
var select = document.getElementById('selectDrank');
for (let key in drankDB) {
    //optionsDrank += `<option name="${key}">${drankDB[key].naam}</option>\n`;
    let opt = document.createElement('option');
    opt.innerHTML = drankDB[key].naam
    select.appendChild(opt);
}