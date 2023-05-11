let raw = new XMLHttpRequest();
let alcoholDB = {};

raw.open("GET", "/assets/alcohol.json", false);
raw.onreadystatechange = function() {
    if (raw.readyState === 4 && raw.status === 200 || raw.status === 0){
        let jsonString = raw.responseText;
        alcoholDB = JSON.parse(jsonString);
    }
}

raw.send(null);
printToPage(alcoholDB);