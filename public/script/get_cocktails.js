let rawFile = new XMLHttpRequest();
let cocktailDB = {};
let cocktailKeys = [];

rawFile.open("GET", "./assets/cocktails.json", false);
rawFile.onreadystatechange = function() {
    if (rawFile.readyState == 4 && rawFile.status == 200 || rawFile.status == 0){
        let jsonString = rawFile.responseText;
        cocktailDB = JSON.parse(jsonString);
        cocktailKeys = Object.keys(cocktailDB);
    }
}
rawFile.send(null);

printToWebpage(cocktailDB);
console.log("Leuk dat je de console geopend heb!");