if (location.pathname === "/new") {
	document.getElementById("selectAlcohol").addEventListener("mousedown", (e) => {
		if (e.target.tagName.toLowerCase() === "option") {
			selectEasy(e.target);
			e.preventDefault();
		}
	});

	document.getElementById("selectNonAlcohol").addEventListener("mousedown", (e) => {
		if (e.target.tagName.toLowerCase() === "option") {
			selectEasy(e.target);
			e.preventDefault();
		}
	});

	document.getElementById("reset").onclick = reset;

} else if (["/", "/admin/cocktails"].includes(location.pathname)) {
	console.log("HELL");
	//zorgt voor de interactie op de webpagina
	document.getElementById("selectNonAlcohol").onclick = function(){
		printToWebpage(returnSelected());
	};

	document.getElementById('selectAlcohol').onclick = function(){
		printToWebpage(returnSelected());
	};

	document.getElementById("randomCocktail").onclick = function(){
		randomCocktail();
	};

	document.getElementById("search").onkeyup = function(){
		searchCocktail(returnSelected());
	};

	document.getElementById("selectGlass").onchange = function(){
		printToWebpage(returnSelected());
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

	document.getElementById("backToAll").onclick = backToAll;
}