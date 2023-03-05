let raw = new XMLHttpRequest();
let cocktailDB = {};
let cocktailKeys = [];

raw.open("GET", "./assets/cocktails.json", false);
raw.onreadystatechange = function() {
    if (raw.readyState === 4 && raw.status === 200 || raw.status === 0){
        let jsonString = raw.responseText;
        cocktailDB = JSON.parse(jsonString);
        cocktailKeys = Object.keys(cocktailDB);
    }
}

raw.send(null);
printToWebpage(cocktailDB);