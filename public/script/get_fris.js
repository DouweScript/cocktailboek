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

let select = document.getElementById('selectFris');

for (let key in frisDB) {
    let opt = document.createElement('option');
    opt.innerHTML = frisDB[key].naam
    select.appendChild(opt);
}