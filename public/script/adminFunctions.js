function confirm(divId, callback) {
	let div = document.getElementById(divId);
	let content = document.getElementById("content");
	let overlay = document.getElementById("overlay");
	overlay.style.display = "block";
	content.addEventListener("mousedown", blockEvent);
	div.style.display = "block";

	for (let i in div.children){
		let item = div.children[i];
		if (item.id === "yes") {
			item.onclick = () => {
				overlay.style.display = "none";
				content.removeEventListener("mousedown", blockEvent);
				div.style.display = "none";
				callback();
			};
		} else if (item.id === "no") {
			item.onclick = () => {
				overlay.style.display = "none";
				content.removeEventListener("mousedown", blockEvent);
				div.style.display = "none";
			}
		}
	}
}

function blockEvent(e){
	e.preventDefault();
}

function printToPage(database) {

	document.getElementById('content').innerHTML = "";
	for (let item in database) {
		let type;
		let drink = database[item];

		let div = document.createElement("div");
		div.className = "drink";

		let name = document.createElement("h3");
		name.innerHTML = drink.name;
		div.appendChild(name);

		const serveSize = document.createElement("input");
		serveSize.value = drink.vol;
		serveSize.type = "number";
		serveSize.step = "1";
		serveSize.id = "serveSize";

		let serveSizeLabel = document.createElement("label");
		serveSizeLabel.innerHTML = "Serveer volume [mL]";
		serveSizeLabel.htmlFor = serveSize.id;

		div.append(serveSizeLabel, serveSize);

		if ("alcPer" in drink) {
			type = "alcohol";
			const alcPer = document.createElement("input");
			alcPer.value = drink.alcPer;
			alcPer.id = "alcPer";
			alcPer.type = "number";
			alcPer.step = ".1";

			let alcPerLabel = document.createElement("label");
			alcPerLabel.innerHTML = "Alcohol gehalte [%]";
			alcPerLabel.htmlFor = alcPer.id;

			div.append(alcPerLabel, alcPer);

		} else{
			type = "nonalcohol";
		}

		const price = document.createElement("input");
		price.value = drink.price;
		price.type = "number";
		price.step = ".01";
		price.id = "price";

		let priceLabel = document.createElement("label");
		priceLabel.innerHTML = "Prijs €";
		priceLabel.htmlFor = price.id;

		div.append(priceLabel, price);

		let butDiv = document.createElement("div");
		butDiv.id = "butDiv";

		let edit = document.createElement("button");
		edit.id = "edit";
		edit.onclick = () => {
			let put = new XMLHttpRequest();
			let newDrink = {name: drink.name, price: price.value, vol: serveSize.value}

			if (type === "alcohol") {
				newDrink["alcPer"] = alcPer.value;
			}

			put.open("PUT", "/admin/{}?edit={}".format(type, getId(drink.name)));
			put.setRequestHeader("Content-Type", "application/json");
			put.onreadystatechange = function() {
				if (put.status === 200) {
					location.reload();
				}
			}
			put.send(JSON.stringify(newDrink));
		};
		edit.innerHTML = "Submit";

		let remove = document.createElement("button");
		remove.id = "remove";
		remove.onclick = () => {
			confirm("removeConfirm", () => {
				div.remove();
				let put = new XMLHttpRequest();
				put.open("PUT", "/admin/" + type + "?remove=" + getId(drink.name));
				put.onreadystatechange = function() {
					if (put.status === 200) {
						location.reload();
					}
				}
				put.send();
			});
		};
		remove.innerHTML = "Remove";

		butDiv.append(edit, remove);
		div.appendChild(butDiv);
		document.getElementById('content').appendChild(div);
	}

}

function addNew() {
	let type;

	if (location.pathname.includes("nonalcohol")) {
		type = "nonAlcohol";
	} else {
		type = "alcohol";
	}

	let div = document.createElement("div");
	div.className = "drink";

	const name = document.createElement("input");
	name.placeholder = "Naam";
	name.id = "name";
	div.append(name);

	const serveSize = document.createElement("input");
	serveSize.value = 40;
	serveSize.type = "number";
	serveSize.step = "1";
	serveSize.id = "serveSize";

	let serveSizeLabel = document.createElement("label");
	serveSizeLabel.innerHTML = "Serveer volume [mL]";
	serveSizeLabel.htmlFor = serveSize.id;

	div.append(serveSizeLabel, serveSize);

	const alcPer = document.createElement("input");
	if (type === "alcohol") {
		alcPer.value = 38;
		alcPer.id = "alcPer";
		alcPer.type = "number";
		alcPer.step = ".1";

		let alcPerLabel = document.createElement("label");
		alcPerLabel.innerHTML = "Alcohol percentage [%]";
		alcPerLabel.htmlFor = alcPer.id;

		div.append(alcPerLabel, alcPer);

	}

	const price = document.createElement("input");
	price.value = 1.3;
	price.type = "number";
	price.step = ".01";
	price.id = "price";

	let priceLabel = document.createElement("label");
	priceLabel.innerHTML = "Prijs €";
	priceLabel.htmlFor = price.id;

	div.append(priceLabel, price);

	let butDiv = document.createElement("div");
	butDiv.id = "butDiv";

	let edit = document.createElement("button");
	edit.id = "edit";
	edit.onclick = () => {
		let put = new XMLHttpRequest();
		let newDrink = {name: name.value, price: price.value, vol: serveSize.value}

		if (type === "alcohol") {
			newDrink["alcPer"] = alcPer.value;
		}

		put.open("PUT", "/admin/{}?add={}".format(type, getId(name.value)));
		put.setRequestHeader("Content-Type", "application/json");
		put.onreadystatechange = function() {
			if (put.status === 200) {
				location.reload();
			}
		}
		put.send(JSON.stringify(newDrink));
	};
	edit.innerHTML = "Submit";

	butDiv.append(edit);
	div.appendChild(butDiv);
	document.getElementById('content').insertBefore(div, document.getElementById("content").firstChild);
}

function search(array){
	let input = document.getElementById('search').value.toString().toLowerCase();
	let searchedArray = array.filter(element => element.name.toString().toLowerCase().includes(input))
	printToPage(searchedArray);
}

function sortAlpha(database) {
	const sort = database.sort();
	printToPage(sort);
}
function sortByPriceLH(database){
	const sort = database.sort((a,b) => (a.price - b.price));
	printToPage(sort);
}
function sortByPrice(database){
	const sort = database.sort((a,b) => (b.price - a.price));
	printToPage(sort);
}
function sortByAlcLH(database){
	const sort = database.sort((a,b) => (a.alcPer - b.alcPer));
	printToPage(sort);
}
function sortByAlc(database){
	const sort = database.sort((a,b) => (b.alcPer - a.alcPer));
	printToPage(sort);
}

function sortByVolLH(database) {
	const sort = database.sort((a,b) => (a.vol - b.vol));
	printToPage(sort);
}
function sortByVol(database) {
	const sort = database.sort((a,b) => (b.vol - a.vol));
	printToPage(sort);
}

if (location.pathname.includes("/admin/cocktails/edit")) {
	const cocktailID = new URLSearchParams(window.location.search).get('cocktail');
	if (cocktailID in cocktailDB) {
		let cocktail = cocktailDB[cocktailID];
		console.log(cocktail);

		document.getElementById("name").value = cocktail.name;
		document.getElementById("selectGlass").value = cocktail.glass;
		document.getElementById("desc").value = cocktail.desc;
		document.getElementById("creator").value = cocktail.creator;

		let selAlc = document.getElementById("selectAlcohol");
		for (let i in selAlc.children) {
			let option = selAlc.children[i];
			if (option.value in cocktail.alcohol){
				option.selected = true;
				selectEasy(option);

				let type = document.getElementById("selectType{}".format(getId(option.innerHTML)));
				type.value = cocktail.alcohol[option.value][1];

				if (type.value !== "aanvullen") {
					document.getElementById("selectN{}".format(getId(option.innerHTML))).value = cocktail.alcohol[option.value][0];
				} else {
					let input = document.getElementById("selectN{}".format(getId(option.innerHTML)));
					type.style.width = "60%";
                    input.style.display = "none";
					input.required = false;
				}
			}
		}

		let selNonAlc = document.getElementById("selectNonAlcohol");
		for (let i in selNonAlc.children) {
			let option = selNonAlc.children[i];
			if (option.value in cocktail.nonAlcohol){
				option.selected = true;
				selectEasy(option);

				let type = document.getElementById("selectType{}".format(getId(option.innerHTML)));
				type.value = cocktail.nonAlcohol[option.value][1];

				if (type.value !== "aanvullen") {
					document.getElementById("selectN{}".format(getId(option.innerHTML))).value = cocktail.nonAlcohol[option.value][0];
				} else {
					let input = document.getElementById("selectN{}".format(getId(option.innerHTML)));
					type.style.width = "60%";
                    input.style.display = "none";
					input.required = false;
				}
			}
		}
	} else {
		location.href = "/admin/cocktails";
	}
}