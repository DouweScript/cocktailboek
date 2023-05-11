let raw = new XMLHttpRequest();
let alcoholDB = {};

raw.open("GET", "/assets/nonAlcohol.json", false);
raw.onreadystatechange = function() {
    if (raw.readyState === 4 && raw.status === 200 || raw.status === 0){
        let jsonString = raw.responseText;
        nonAlcoholDB = JSON.parse(jsonString);
    }
}

raw.send(null);
printToPage(nonAlcoholDB);