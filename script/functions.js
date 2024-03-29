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
					<h3> €${cocktail.prijs.toFixed(1)}0`
	
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
function printToWebpage(cocktailArray){
	document.getElementById('content').innerHTML = "";
	for(let i = 0; i < cocktailArray.length; i++){
		document.getElementById('content').innerHTML += printCocktail(cocktailArray[i]);
	}
}

function backToAll(){
	document.getElementById('buttons').innerHTML = "<button onclick='randomCocktail()'> Krijg een random Cocktail </button>";
	printToWebpage(staticArray);
}

//print 1 random cocktail op de webpagina
function randomCocktail(){
	let randomNumber = Math.floor(Math.random() * cocktailArray.length);
	document.getElementById('content').innerHTML = "";
	document.getElementById('content').innerHTML = printCocktail(cocktailArray[randomNumber]);
	document.getElementById('buttons').innerHTML = "<button class='afterclick' onclick='randomCocktail()'> Krijg een random Cocktail </button>" +
	 											   "<button class='afterclick' onclick='backToAll()'> Terug naar alle Cocktails </button>";
}

//selecteer welk fris en of glas je wilt
function selectGlas(){
	let glas = document.getElementById('selectGlas').value;
	let fris = document.getElementById('selectFris').value;
	let glasArray = [];
	if (glas == "Alle Glazen" && fris == "Alle Fris"){
		printToWebpage(cocktailArray);
	}
	else{
		for (let i = 0; i < cocktailArray.length; i++){
			if (glas == "Alle Glazen"){
				if (fris == cocktailArray[i].fris){
					glasArray.push(cocktailArray[i]);
				}
			}
			if (fris == "Alle Fris" && cocktailArray[i].glass == glas){
				glasArray.push(cocktailArray[i]);
			}

			if (fris == cocktailArray[i].fris && glas == cocktailArray[i].glass){
				glasArray.push(cocktailArray[i]);
			}

			if(glasArray.length ==  0){
				document.getElementById('content').innerHTML = "";
				document.getElementById('content').innerHTML = "<h2> Helaas heb ik dit niet gevonden </h2>";
			}
			else
			{
				printToWebpage(glasArray);
			}
		}
	}
}

function returnSelected(){
	let glas = document.getElementById('selectGlas').value;
  	let fris = document.getElementById('selectFris').value;
	let glasArray = [];
	for (var i = 0; i < cocktailArray.length; i++){
		if (glas === "Alle Glazen" && fris === "Alle Fris"){
			glasArray.push(cocktailArray[i]);
		}
		if (glas === "Alle Glazen"){
			if (fris === cocktailArray[i].fris){
				glasArray.push(cocktailArray[i]);
			}
		}
		if (fris === "Alle Fris" && cocktailArray[i].glass === glas){
			glasArray.push(cocktailArray[i]);
		}

		if (fris === cocktailArray[i].fris && glas === cocktailArray[i].glass){
			glasArray.push(cocktailArray[i]);
		}

		if(glasArray.length === 0){
			document.getElementById('content').innerHTML = "";
			document.getElementById('content').innerHTML = "<h2> Helaas heb ik dit niet gevonden </h2>";
		}
	}
	return glasArray;
}

//zoekfunctie op naam van de cocktail
function searchCocktail(array){
	let input = document.getElementById('search').value.toString().toLowerCase();
	let searchedArray = array.filter(element => element.naam.toString().toLowerCase().includes(input))
	printToWebpage(searchedArray);
}