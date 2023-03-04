const fs = require('fs');
const {drankDB} = require("./drank");
const {frisDB} = require("./drank");

//volume van glazen in mililiter
const volShotglas = 40;
const volLongdrink = 300;
const volTumbler = 300;
const volSocial = 500;
const volPapa = 500;

//database cocktails
let cocktailDB = {};

//function die de database leest en in een callback zet
function databaseReader() {
	try {
		const jsonString = fs.readFileSync("./public/assets/cocktails.json", "utf8");
		cocktailDB = JSON.parse(jsonString);
	} catch (err){
		console.log("Error reading database:", err);
	}
}

//function die naar de database schrijft
function databaseWriter(cocktail) {
	const jsonString = JSON.stringify(cocktail);
	fs.writeFile("./public/assets/cocktails.json", jsonString, err => {
		if (err){
			console.log("Error writing database:", err)
		} else{
			console.log("Successfully wrote to database")
		}
	})
}

//init database
databaseReader();

//constructor voor een cocktail
function Cocktail(name, glass, drank, fris, alcPer, price, creator, desc){
	this.name = name;
	this.glass = glass;
	this.fris = fris;
	this.drank = drank;
	this.alcper = alcPer;
	this.price = price.toFixed(2);
	this.creator = creator;
	this.desc = desc;
	cocktailDB[name.toLowerCase()] = this;
}

//constructor voor nieuwe cocktail
//drank dict: { drank: aanvullen/[hoeveel, type] }
function CocktailCreator(name, glass, drank, fris, creator, desc) {
	let glassVolume;
	switch(glass.toLowerCase()) {
		case "longdrink":
			glassVolume = volLongdrink;
		case "tumbler":
			glassVolume = volTumbler;
		case "shot":
			glassVolume = volShotglas;
		case "social":
			glassVolume = volSocial;
		case "papa":
			glassVolume = volPapa;
	}

	let alcCont = 0;
	let price = 0;
	let usedVolume = 0;

	let aanvul = []

	for (let key in drank) {
		let drankItem = drankDB[key.toLowerCase()];

		if (drank[key] == "aanvullen") {
			aanvul.push([drankItem, drank[key]]);
		} else if (drank[key][1] == "glas") {
			aanvul.push([drankItem, drank[key][0], drank[key][1]]);
		} else {
			let vol = drank[key][0] * volShotglas;
			usedVolume += vol;
			alcCont += drankItem.alcper/100 * vol;
			price += drankItem.price * vol / drankItem.vol;
		}
	}

	console.log(alcCont);

	for (let key in fris) {
		let frisItem = frisDB[key.toLowerCase()];

		if (fris[key] == "aanvullen") {
			aanvul.push([frisItem, fris[key]]);
		} else if (fris[key][1] == "glas") {
			aanvul.push([frisItem, fris[key][0], fris[key][1]]);
		} else {
			let vol = fris[key][0] * volShotglas;
			usedVolume += vol;
			price += frisItem.price * vol / frisItem.vol;
		}
	}

	console.log(alcCont);

	for (let item in aanvul) {
		let volRemain = glassVolume - usedVolume;
		if (item.length == 3) { //als glass

			let useVol = volRemain * aanvul[item][1];
			price += aanvul[item][0].price * useVol/aanvul[item][0].vol;
			if ("alcper" in aanvul[item][0]) {
				alcCont += aanvul[item][0].alcper * useVol;
			}
		} else { //als aanvullen
			price += aanvul[item][0].price * volRemain/aanvul[item][0].vol;
			if ("alcper" in aanvul[item][0]) {
				alcCont += aanvul[item][0].alcper * volRemain;
			}
		}
	}

	console.log(alcCont);

	let alcPer = (alcCont/glassVolume * 100).toFixed(2);
	price = price.toFixed(2);

	console.log("----");

	console.log(name);
	console.log(glass);
	console.log(fris);
	console.log(drank);
	console.log(alcPer);
	console.log(price);
	console.log(creator);
	console.log(desc);

	//Cocktail(name, glas, drank, fris, alcPer, prijs, creator, desc);
}

module.exports = { cocktailDB, Cocktail, CocktailCreator};