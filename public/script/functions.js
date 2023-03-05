String.prototype.format = function () {
	let i = 0, args = arguments;
	return this.replace(/{}/g, function () {
		return typeof args[i] != 'undefined' ? args[i++] : '';
	});
};

function printCocktail(cocktail){
	console.log(cocktail);

	let div = document.createElement("div");
	div.class = 'cocktail';

	let name = document.createElement("h3");
	name.innerHTML = cocktail.name;

	let glass = document.createElement("h3");
	glass.innerHTML = cocktail.glass;

	let alcohol = document.createElement("ul");

	let fill = []

	//loop die het aantal soorten sterk in een cocktail erbij zet
	for (let item in cocktail.alcohol) {
		let li = document.createElement("li");
		let alc = alcoholDB[item];

		if (cocktail.alcohol[item][1] === "aanvullen") {
			fill.append(alc, cocktail.alcohol[item]);
		} else if (cocktail.alcohol[item][0] <= 1) {
			li.innerHTML = "{} Shot {}".format(cocktail.alcohol[item][0], alc.name);
		} else {
			li.innerHTML = "{} Shots {}".format(cocktail.alcohol[item][0], alc.name);
		}
		alcohol.appendChild(li);
	}

	let nonAlcohol = document.createElement("ul");

	//Zet het nonAlcohol erbij als het het heeft
	if (cocktail.nonAlcohol != null){
		for (let item in cocktail.nonAlcohol) {
			let li = document.createElement("li");
			let nonAlc = nonAlcoholDB[item];

			if (cocktail.nonAlcohol[item][1] === "aanvullen") {
				fill.append(nonAlc, cocktail.nonAlcohol[item]);
			} else if (cocktail.nonAlcohol[item][0] <= 1) {
				li.innerHTML = "{} {} {}".format(cocktail.nonAlcohol[item][0], cocktail.nonAlcohol[item][1], nonAlc.name);
			} else {
				li.innerHTML = "{} {}s {}".format(cocktail.nonAlcohol[item][0], cocktail.nonAlcohol[item][1], nonAlc.name);
			}
			nonAlcohol.appendChild(li);
		}
	}

	div.append(name, glass, alcohol, nonAlcohol);

	//Zet de omschrijving er bij als hij die heeft
	if(cocktail.desc != null){
		let desc = document.createElement("p");
		desc.innerHTML = cocktail.desc;
		div.appendChild(desc);
	}

	let alcPer = document.createElement("h3");
	let price = document.createElement("h3");
	alcPer.innerHTML = "{} % Alcohol".format(cocktail.alcPer);
	price.innerHTML = "€ {}".format(cocktail.price);

	div.append(alcPer, price);

	//Zet de maker erbij al hij die heeft
	if(cocktail.creator != null){
		let creator = document.createElement("p");
		creator.className = "creator";
		creator.innerHTML = "Deze cocktail is bedacht door:<br>{}".format(cocktail.creator);
		div.appendChild(creator);
	}

	return div;
}

function sortByPrice(){
	const priceHighToLow = returnSelected().sort((a,b) => (b.price - a.price))
	printToWebpage(priceHighToLow)
}

function sortByAlcLH(){
	const alcLowToHigh = returnSelected().sort((a,b) => (a.alcPer - b.alcPer))
	printToWebpage(alcLowToHigh);
}

function sortByAlc(){
	const alcHighToLow = returnSelected().sort((a,b) => (b.alcPer - a.alcPer))
	printToWebpage(alcHighToLow)
}

function sortByPriceLH(){
	const priceLowToHigh = returnSelected().sort((a,b) => (a.price - b.price))
	printToWebpage(priceLowToHigh)
}

function sortAlpha(){
	const alphabeticOrder = returnSelected().sort()
	printToWebpage(alphabeticOrder);
}

//zorgt voor de interactie op de webpagina
document.getElementById("selectNonAlcohol").onclick = function(){
	selectGlas()
};

document.getElementById("randomCocktail").onclick = function(){
	randomCocktail()
};

document.getElementById("search").onkeyup = function(){
	searchCocktail(cocktailDB)
};

document.getElementById("selectGlass").onchange = function(){
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
	document.getElementById('buttons').innerHTML = "<button onclick='randomCocktail()'>Krijg een random Cocktail</button>";
	printToWebpage(cocktailDB);
}

//print 1 random cocktail op de webpagina
function randomCocktail(){
	let randomNumber = Math.floor(Math.random() * cocktailKeys.length);
	document.getElementById('content').innerHTML = "";
	document.getElementById('content').innerHTML = printCocktail(cocktailDB[cocktailKeys[randomNumber]]);
	document.getElementById('buttons').innerHTML = "<button class='afterclick' onclick='randomCocktail()'>Krijg een random Cocktail</button>" +
	 											   "<button class='afterclick' onclick='backToAll()'>Terug naar alle Cocktails</button>";
}

//selecteer welk non alcohol en of glas je wilt
function selectGlas(){
	let glass = document.getElementById('selectGlass').value;
	let nonAlcohol = document.getElementById('selectNonAlcohol').value;
	let glassArray = [];
	if (glass === "Alle glazen" && nonAlcohol === "Alle non alcohol") {
		printToWebpage(cocktailDB);
	} else {
		for (let key in cocktailDB) {
			if ((glass === "Alle glazen" && nonAlcohol === cocktailDB[key].nonAlcohol) ||
				(nonAlcohol === "Alle non alcohol" && glass === cocktailDB[key].glass) ||
				(nonAlcohol === cocktailDB[key].nonAlcohol && glass === cocktailDB[key].glass)){
				glassArray.push(cocktailDB[key]);
			}
		}
		if(glassArray.length ===  0) {
			document.getElementById('content').innerHTML = "<h2>Helaas heb ik dit niet gevonden</h2>";
		} else {
			printToWebpage(glassArray);
		}
	}
}

function returnSelected(){
	let glass = document.getElementById('selectGlass').value;
	let nonAlcohol = document.getElementById('selectNonAlcohol').value;
	let glassArray = [];
	if (glass === "Alle glazen" && nonAlcohol === "Alle non alcohol") {
		return Object.values(cocktailDB);
	} else {
		for (let key in cocktailDB) {
			if ((glass === "Alle glazen" && nonAlcohol === cocktailDB[key].nonAlcohol) ||
				(nonAlcohol === "Alle non alcohol" && glass === cocktailDB[key].glass) ||
				(nonAlcohol === cocktailDB[key].nonAlcohol && glass === cocktailDB[key].glass)){
				glassArray.push(cocktailDB[key]);
			}
		}
		if(glassArray.length ===  0) {
			document.getElementById('content').innerHTML = "<h2>Helaas heb ik dit niet gevonden</h2>";
		} else {
			return glassArray;
		}
	}
}

//zoekfunctie op name van de cocktail
function searchCocktail(array){
	let input = document.getElementById('search').value.toString().toLowerCase();
	let searchedArray = array.filter(element => element.name.toString().toLowerCase().includes(input))
	printToWebpage(searchedArray);
}

//functie om cookie te zoeken
function getCookie(name) {
    let dc = document.cookie;
    let prefix = name + "=";
    let begin = dc.indexOf("; " + prefix);
    if (begin === -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end === -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}