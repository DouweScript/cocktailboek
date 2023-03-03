function printCocktail(cocktail){
	let printString = `<div class='cocktail'> 
							<h3> ${cocktail.naam} </h3>
							<h3> ${cocktail.glass} </h3>
							<ul>`
							
	//loop die het aantal soorten sterk in een cocktail erbij zet
	for (let i = 0; i < cocktail.spirits.length; i++){
		if(cocktail.spirits[i][0] <= 1){
			printString += `<li> ${cocktail.spirits[i][0]} Borrel ${cocktail.spirits[i][1]} </li>`
		}
		else{
			printString += `<li> ${cocktail.spirits[i][0]} Borrels ${cocktail.spirits[i][1]} </li>`
		}
	}

	printString += 	"</ul>";

	//Zet het fris erbij als het het heeft
	if (cocktail.fris != null){
		printString += `Aanvullen met ${cocktail.fris}`
	}

	//Zet de omschrijving er bij als hij die heeft
	if(cocktail.omschrijving != null){
		printString += `<p> ${cocktail.omschrijving} </p>`
	}

	printString += `<h3> ${cocktail.alcper} %Alc</h3>
					<h3> €${cocktail.prijs}`
	
	//Zet de maker erbij al hij die heeft
	if(cocktail.creator != null){
		printString += `<p class='creator'> Deze cocktail is gemaakt door: <br> ${cocktail.creator} </p>`
	}

	printString += `</div>`;
	return printString;
}

function sortByPrice(){
	const priceHighToLow = returnSelected().sort((a,b) => (b.prijs - a.prijs))
	printToWebpage(priceHighToLow)
}

function sortByAlcLH(){
	const alcLowToHigh = returnSelected().sort((a,b) => (a.alcper - b.alcper))
	printToWebpage(alcLowToHigh);
}

function sortByAlc(){
	const alcHighToLow = returnSelected().sort((a,b) => (b.alcper - a.alcper))
	printToWebpage(alcHighToLow)
}

function sortByPriceLH(){
	const priceLowToHigh = returnSelected().sort((a,b) => (a.prijs - b.prijs))
	printToWebpage(priceLowToHigh)
}

function sortAlpha(){
	const alphabeticOrder = returnSelected().sort()
	printToWebpage(alphabeticOrder);
}

//zorgt voor de interactie op de webpagina
document.getElementById("selectFris").onclick = function(){
	selectGlas()
};

document.getElementById("randomCocktail").onclick = function(){
	randomCocktail()
};

document.getElementById("search").onkeyup = function(){
	searchCocktail(cocktailArray)
};

document.getElementById("selectGlas").onchange = function(){
	selectGlas()
};

document.getElementById("sorteer").onchange = function(){
	switch(document.getElementById("sorteer").value){
		case "Alfabetische Volgorde":
			sortAlpha();
			break;
		case "Prijs Laag -> Hoog":
			sortByPriceLH();
			break;
		case "Prijs Hoog -> Laag":
			sortByPrice();
			break;
		case "Alcoholpercentage Laag -> Hoog":
			sortByAlcLH();
			break;
		case "Alcoholpercentage Hoog -> Laag":
			sortByAlc();
			break;
		}
};

//print alle cocktails op de webpagina
function printToWebpage(cocktails){
	document.getElementById('content').innerHTML = "";
	for (let key in cocktails){
		document.getElementById('content').innerHTML += printCocktail(cocktails[key]);
	}
}

function backToAll(){
	document.getElementById('buttons').innerHTML = "<button onclick='randomCocktail()'> Krijg een random Cocktail </button>";
	printToWebpage(cocktailDB);
}

//print 1 random cocktail op de webpagina
function randomCocktail(){
	let randomNumber = Math.floor(Math.random() * cocktailKeys.length);
	document.getElementById('content').innerHTML = "";
	document.getElementById('content').innerHTML = printCocktail(cocktailDB[cocktailKeys[randomNumber]]);
	document.getElementById('buttons').innerHTML = "<button class='afterclick' onclick='randomCocktail()'> Krijg een random Cocktail </button>" +
	 											   "<button class='afterclick' onclick='backToAll()'> Terug naar alle Cocktails </button>";
}

//selecteer welk fris en of glas je wilt
function selectGlas(){
	let glas = document.getElementById('selectGlas').value;
	let fris = document.getElementById('selectFris').value;
	let glasArray = [];
	if (glas == "Alle Glazen" && fris == "Alle Fris") {
		printToWebpage(cocktailDB);
	} else {
		for (let key in cocktailDB) {
			if ((glas == "Alle Glazen" && fris == cocktailDB[key].fris) ||
				(fris == "Alle Fris" && glas == cocktailDB[key].glass) ||
				(fris == cocktailDB[key].fris && glas == cocktailDB[key].glass)){
				glasArray.push(cocktailDB[key]);
			}
		}
		if(glasArray.length ==  0) {
			document.getElementById('content').innerHTML = "";
			document.getElementById('content').innerHTML = "<h2> Helaas heb ik dit niet gevonden </h2>";
		} else {
			printToWebpage(glasArray);
		}
	}
}

function returnSelected(){
	let glas = document.getElementById('selectGlas').value;
	let fris = document.getElementById('selectFris').value;
	let glasArray = [];
	if (glas == "Alle Glazen" && fris == "Alle Fris") {
		return Object.values(cocktailDB);
	} else {
		for (let key in cocktailDB) {
			if ((glas == "Alle Glazen" && fris == cocktailDB[key].fris) ||
				(fris == "Alle Fris" && glas == cocktailDB[key].glass) ||
				(fris == cocktailDB[key].fris && glas == cocktailDB[key].glass)){
				glasArray.push(cocktailDB[key]);
			}
		}
		if(glasArray.length ==  0) {
			document.getElementById('content').innerHTML = "";
			document.getElementById('content').innerHTML = "<h2> Helaas heb ik dit niet gevonden </h2>";
		} else {
			return glasArray;
		}
	}
}

//zoekfunctie op naam van de cocktail
function searchCocktail(array){
	let input = document.getElementById('search').value.toString().toLowerCase();
	let searchedArray = array.filter(element => element.naam.toString().toLowerCase().includes(input))
	printToWebpage(searchedArray);
}

//functie om cookie te zoeken
function getCookie(name) {
    let dc = document.cookie;
    let prefix = name + "=";
    let begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}