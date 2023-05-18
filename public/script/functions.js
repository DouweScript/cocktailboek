String.prototype.format = function () {
	let i = 0, args = arguments;
	return this.replace(/{}/g, function () {
		return typeof args[i] != 'undefined' ? args[i++] : '';
	});
};

function getId(name) {
	return name.toLowerCase().replace(/ /g, "_");
}

function printCocktail(cocktail){
	let div = document.createElement("div");
	div.className = 'cocktail';

	let name = document.createElement("h3");
	name.innerHTML = cocktail.name;

	let glass = document.createElement("h3");
	glass.innerHTML = cocktail.glass;

	div.append(name, glass);

	let alcohol = document.createElement("ul");

	let fill = []

	//loop die het aantal soorten sterk in een cocktail erbij zet
	for (let item in cocktail.alcohol) {
		let li = document.createElement("li");
		let alc = alcoholDB[item];

		if (cocktail.alcohol[item][1] === "aanvullen") {
			fill.push([alc, cocktail.alcohol[item]]);
			continue;
		} else if (cocktail.alcohol[item][0] <= 1) {
			li.innerHTML = "{} shot {}".format(cocktail.alcohol[item][0], alc.name);
		} else {
			li.innerHTML = "{} shots {}".format(cocktail.alcohol[item][0], alc.name);
		}
		alcohol.appendChild(li);
	}

	if (alcohol.childElementCount > 0) {
		div.append(alcohol);
	}

	let nonAlcohol = document.createElement("ul");

	//Zet het nonAlcohol erbij als het het heeft
	if (cocktail.nonAlcohol != null){
		for (let item in cocktail.nonAlcohol) {
			let li = document.createElement("li");
			let nonAlc = nonAlcoholDB[item];

			if (cocktail.nonAlcohol[item][1] === "aanvullen") {
				fill.push([nonAlc, cocktail.nonAlcohol[item]]);
				continue;
			} else if (cocktail.nonAlcohol[item][0] <= 1) {
				li.innerHTML = "{} {} {}".format(cocktail.nonAlcohol[item][0], cocktail.nonAlcohol[item][1], nonAlc.name);
			} else {
				li.innerHTML = "{} {}s {}".format(cocktail.nonAlcohol[item][0], cocktail.nonAlcohol[item][1], nonAlc.name);
			}
			nonAlcohol.appendChild(li);
		}
	}

	if (nonAlcohol.childElementCount > 0) {
		div.appendChild(nonAlcohol);
	}

	let fillList = document.createElement("label");
	fillList.innerHTML = 'Aanvullen met ';
	//zet het aan te vullen vocht erbij als het dat heeft
	if (fill.length > 0) {
		for (let item in fill){
			let drank = fill[item];
			item = parseInt(item);
			if (item === 0){
				fillList.innerHTML += "{} <a class='fill_hid'>(reken {}x af)</a>".format(drank[0].name, drank[1][0]);
			} else if (item > 1 && item < fill.length - 1) {
				fillList.innerHTML += ", {} <a class='fill_hid'>(reken {}x af)</a>".format(drank[0].name, drank[1][0]);
			} else {
				fillList.innerHTML += " & {} <a class='fill_hid'>(reken {}x af)</a>".format(drank[0].name, drank[1][0]);
			}
		}
		div.appendChild(fillList);
		fillList.onmouseenter = () => {
			for (let item in fillList.children){
				item = fillList.children[item];
				if (item.className === "fill_hid") {
					item.style.display = "initial";
				}
			}
		}
		fillList.onmouseleave = () => {
			for (let item in fillList.children){
				item = fillList.children[item];
				if (item.className === "fill_hid") {
					item.style.display = "none";
				}
			}
		}
	}

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

	//voeg admin knoppen als in de admin interface
	if (document.location.pathname.includes("admin")) {
		let aDiv = document.createElement("div");
		aDiv.id = "adminDiv";

		let edit = document.createElement("button");
		edit.id = "edit";
		edit.onclick = () => {
			location.href = "/admin/cocktails/edit?cocktail=" + getId(cocktail.name);
		};
		edit.innerHTML = "Edit"

		let remove = document.createElement("button");
		remove.id = "remove";
		remove.onclick = () => {
			confirm("removeConfirm", () => {
				div.remove();
				let put = new XMLHttpRequest();
				put.open("PUT", "/admin/cocktails?remove=" + getId(cocktail.name));
				put.onreadystatechange = function() {
					if (put.status === 200) {
						location.reload();
					}
				}
				put.send();
			});
		};
		remove.innerHTML = "Remove";

		aDiv.append(edit, remove);
		div.appendChild(aDiv);
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

//print alle cocktails op de webpagina
function printToWebpage(cocktails){
	document.getElementById('content').innerHTML = "";
	for (let key in cocktails){
		document.getElementById('content').appendChild(printCocktail(cocktails[key]));
	}
}

function backToAll(){
	document.getElementById('backToAll').style.display = "none";

	let cookie = getCookie("bolk-oath-access-token");
	if (cookie != null) {
		let login = document.getElementById("login");
		login.style.display = "none";

		let logout = document.getElementById("logout");
		logout.style.display = "inherit";

		let new_cock = document.getElementById("new");
		new_cock.style.display = "initial";

		//test management
		//https://login.i.bolkhuis.nl/ictcom/?access_token=example-access-token response should be 200 OK
		if (getCookie("bolk-oath-permission") != null) {
			let admin = document.getElementById("admin");
			admin.style.display = "inherit";
		}
	}
	printToWebpage(cocktailDB);
}

//print 1 random cocktail op de webpagina
function randomCocktail(){
	let randomNumber = Math.floor(Math.random() * cocktailKeys.length);
	document.getElementById('content').innerHTML = "";
	document.getElementById('content').appendChild(printCocktail(cocktailDB[cocktailKeys[randomNumber]]));

	document.getElementById('backToAll').style.display = "block";
}

//selecteer welk non alcohol en of glas je wilt
function returnSelected(){
	let glass = getId(document.getElementById('selectGlass').value);
	let nonAlcohol = getId(document.getElementById('selectNonAlcohol').value);
	let alcohol = getId(document.getElementById('selectAlcohol').value);
	let selected = [];

	if (glass === "Alle glazen" && nonAlcohol === "Alle non alcohol") {
		return Object.values(cocktailDB);
	} else {
		for (let key in cocktailDB) {
			let item = cocktailDB[key];

			if (item.nonAlcohol === null) {
				item.nonAlcohol = [];
			}
			if (item.alcohol === null) {
				item.alcohol = [];
			}

			if ((glass === "alle_glazen" && nonAlcohol === "alle_non_alcohol" && alcohol === "alle_alcohol") ||
				(glass === "alle_glazen" && nonAlcohol === "alle_non_alcohol" && alcohol in item.alcohol) ||
				(glass === "alle_glazen" && nonAlcohol in item.nonAlcohol && alcohol === "alle_alcohol") ||
				(glass === "alle_glazen" && nonAlcohol in item.nonAlcohol && alcohol in item.alcohol) ||
				(glass === item.glass && nonAlcohol === "alle_non_alcohol" && alcohol === "alle_alcohol") ||
				(glass === item.glass && nonAlcohol === "alle_non_alcohol" && alcohol in item.alcohol) ||
				(glass === item.glass && nonAlcohol in item.nonAlcohol && alcohol === "alle_alcohol") ||
				(glass === item.glass && nonAlcohol in item.nonAlcohol && alcohol in item.alcohol)) {
				selected.push(item);
			}
		}
		if(selected.length ===  0) {
			document.getElementById('content').innerHTML = "<h2>Helaas heb ik dit niet gevonden</h2>";
		} else {
			return selected;
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