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

	document.getElementById("sort").onchange = function(){
		switch(document.getElementById("sort").value){
			case "Alfabetisch":
				sortAlpha();
				break;
			case "Prijs laag -> Hoog":
				sortByPriceLH();
				break;
			case "Prijs hoog -> Laag":
				sortByPrice();
				break;
			case "Alcohol laag -> hoog":
				sortByAlcLH();
				break;
			case "Alcohol hoog -> laag":
				sortByAlc();
				break;
			}
	};

	document.getElementById("backToAll").onclick = backToAll;
} else if (["/admin/alcohol", "/admin/nonalcohol"].includes(location.pathname)) {
	let db = [];

	if (location.pathname.includes("nonalcohol")) {
		for (let item in nonAlcoholDB){
			item = nonAlcoholDB[item];
			db.push(item);
		}
	} else {
		for (let item in alcoholDB){
			item = alcoholDB[item];
			db.push(item);
		}
	}

	document.getElementById("new").onclick = function() {
		addNew();
	}

	document.getElementById("search").onkeyup = function(){
		search(db);
	};

	document.getElementById("sort").onchange = function(){
		switch(document.getElementById("sort").value){
			case "Alfabetisch":
				sortAlpha(db);
				break;
			case "Prijs laag -> Hoog":
				sortByPriceLH(db);
				break;
			case "Prijs hoog -> Laag":
				sortByPrice(db);
				break;
			case "Alcohol laag -> hoog":
				sortByAlcLH(db);
				break;
			case "Alcohol hoog -> laag":
				sortByAlc(db);
				break;
			case "Volume laag -> hoog":
				sortByVolLH(db);
				break;
			case "Voluem hoog -> laag":
				sortByVol(db);
				break;
		}
	};
}