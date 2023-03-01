let get_fris = new XMLHttpRequest();
let frisDB = {};

get_fris.open("GET", "./assets/fris.json", false);
get_fris.onreadystatechange = function() {
    if (get_fris.readyState == 4 && get_fris.status == 200 || get_fris.status == 0){
        let jsonString = get_fris.responseText;
        frisDB = JSON.parse(jsonString);
    }
}
get_fris.send(null);

//let optionsDrank = "";
var select = document.getElementById('selectFris');
for (let key in frisDB) {
    //optionsDrank += `<option name="${key}">${drankDB[key].naam}</option>\n`;
    let opt = document.createElement('option');
    opt.innerHTML = frisDB[key].naam
    select.appendChild(opt);
}