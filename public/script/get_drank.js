let get_drank = new XMLHttpRequest();
let drankDB = {};

get_drank.open("GET", "./assets/drank.json", false);
get_drank.onreadystatechange = function() {
    if (get_drank.readyState == 4 && get_drank.status == 200 || get_drank.status == 0){
        let jsonString = get_drank.responseText;
        drankDB = JSON.parse(jsonString);
    }
}
get_drank.send(null);

let select = document.getElementById('selectDrank');

for (let key in drankDB) {
    let opt = document.createElement('option');
    opt.innerHTML = drankDB[key].naam
    select.appendChild(opt);
}