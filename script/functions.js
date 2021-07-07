function printCocktail(cocktail){
	var printString = "<div class='cocktail'>" +
											"<h3>" + cocktail.naam + "</h3>" +
											"<h3>" + cocktail.glass + "</h3>" +
											"<ul>";

	//loop die het aantal soorten sterk in een cocktail erbij zet
	for (var i = 0; i < cocktail.spirits.length; i++){
		if(cocktail.spirits[i][0] <= 1){
			printString += "<li>" + cocktail.spirits[i][0]+ " Borrel " + cocktail.spirits[i][1] + "</li>";
		}
		else{
			printString += "<li>" + cocktail.spirits[i][0]+ " Borrels " + cocktail.spirits[i][1] + "</li>";
		}
	}

	printString += 	"</ul>";

	//Zet het fris erbij als het het heeft
	if (cocktail.fris != null){
		printString += "Aanvullen met " + cocktail.fris;
	}

	//Zet de omschrijving er bij als hij die heeft
	if(cocktail.omschrijving != null){
		printString += "<p>" + cocktail.omschrijving + "<p>"
	}

	printString +=
									"<h3>" + cocktail.alcper + "%Alc</h3>" +
									"<h3>€" + cocktail.prijs.toFixed(1) + "0</h3>";

	//Zet de maker erbij al hij die heeft
	if(cocktail.creator != null){
		printString += "<p class='creator'> Deze cocktail is gemaakt door: <br>" + cocktail.creator +"</p>";
	}
	printString += "</div>";
	return printString;
}

function sortByPrice(){
	var selectedArray = returnSelected();
	selectedArray.sort(function(a, b){
		return b.prijs - a.prijs
	});
	printToWebpage(selectedArray);
}

function sortByAlcLH(){
	var selectedArray = returnSelected();
	selectedArray.sort(function(a, b){
		return a.alcper - b.alcper
	});
	printToWebpage(selectedArray);
}

function sortByAlc(){
	var selectedArray = returnSelected();
	selectedArray.sort(function(a, b){
		return b.alcper - a.alcper
	});
	printToWebpage(selectedArray);
}

function sortByPriceLH(){
	var selectedArray = returnSelected();
	selectedArray.sort(function(a, b){
		return a.prijs - b.prijs
	});
	printToWebpage(selectedArray);
}

function sortAlpha(){
	var selectedArray = returnSelected();
	selectedArray.sort();
	printToWebpage(selectedArray);
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
	for(var i = 0; i < cocktailArray.length; i++){
		document.getElementById('content').innerHTML += printCocktail(cocktailArray[i]);
	}
}

function backToAll(){
	document.getElementById('buttons').innerHTML = "<button onclick='randomCocktail()'> Krijg een random Cocktail </button>";
	printToWebpage(staticArray);
}

//print 1 random cocktail op de webpagina
function randomCocktail(){
	var randomNumber = Math.floor(Math.random() * cocktailArray.length);
	document.getElementById('content').innerHTML = "";
	document.getElementById('content').innerHTML = printCocktail(cocktailArray[randomNumber]);
	document.getElementById('buttons').innerHTML = "<button class='afterclick' onclick='randomCocktail()'> Krijg een random Cocktail </button>" +
	 											   "<button class='afterclick' onclick='backToAll()'> Terug naar alle Cocktails </button>";
}

//selecteer welk fris en of glas je wilt
function selectGlas(){
	var glas = document.getElementById('selectGlas').value;
	var fris = document.getElementById('selectFris').value;
	var glasArray = [];
	if (glas == "Alle Glazen" && fris == "Alle Fris"){
		printToWebpage(cocktailArray);
	}
	else{
		for (var i = 0; i < cocktailArray.length; i++){
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
	var glas = document.getElementById('selectGlas').value;
  	var fris = document.getElementById('selectFris').value;
	var glasArray = [];
	for (var i = 0; i < cocktailArray.length; i++){
		if (glas == "Alle Glazen" && fris == "Alle Fris"){
			glasArray.push(cocktailArray[i]);
		}
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
	}
	return glasArray;
}

//zoekfunctie op naam van de cocktail
function searchCocktail(array){
	var input = document.getElementById('search').value;
	input = input.toString().toLowerCase();
	var searchedArray = [];

	for (var i = 0; i < array.length; i++){
		var cocktailnaam = array[i].naam;
		cocktailnaam = cocktailnaam.toString().toLowerCase();
		if(cocktailnaam.includes(input)){
			searchedArray.push(array[i]);
		}
	}
	printToWebpage(searchedArray);
}