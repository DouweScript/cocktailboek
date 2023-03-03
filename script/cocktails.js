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

//functie die het alcoholpercentage van een cocktail uitrekend
function calcAlcPer(volume, volumeglass){
	const alcoholPercentage = 100 * volume / volumeglass;
	return alcoholPercentage.toFixed(1);
}

//constructor voor een cocktail
function Cocktail(naam, glas, fris, drank, alcPer, price, creator, omschrijving){
	this.naam = naam;
	this.glass = glas;
	this.fris = fris;
	this.spirits = drank;
	this.alcper = alcPer;
	this.prijs = price.toFixed(2);
	this.creator = creator;
	this.omschrijving = omschrijving;
	cocktailDB[naam.toLowerCase()] = this;
}

//constructor voor nieuwe cocktail
//drank dict: { drank: aanvullen/[hoeveel, type] }
function CocktailCreator(name, glass, drank, fris, creator, omschrijving) {
	let glassVolume;
	switch(glass) {
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

	console.log(fris);

	for (let key in drank) {
		let drankItem = drankDB[key.toLowerCase()];

		if (drank[key] == "aanvullen") {
			aanvul.push([drankItem, drank[key]]);
		} else if (drank[key][1] == "glas") {
			aanvul.push([drankItem, drank[key][0], drank[key][1]]);
		} else {
			let vol = drank[key] * volShotglas;
			usedVolume += vol;
			alcCont += drankItem.alcper/100 * vol;
			price += drankItem.price * vol / drankItem.vol;
		}
	}

	for (let key in fris) {
		let frisItem = frisDB[key.toLowerCase()];

		if (fris[key] == "aanvullen") {
			aanvul.push([frisItem, fris[key]]);
		} else if (fris[key][1] == "glas") {
			aanvul.push([frisItem, fris[key][0], fris[key][1]]);
		} else {
			let vol = fris[key] * volShotglas;
			usedVolume += vol;
			price += frisItem.price * vol / frisItem.vol;
		}
	}

	for (let item in aanvul) {
		item = aanvul[item];
		let volRemain = glassVolume - usedVolume;
		if (item.length == 3) { //als glas
			let useVol = volRemain * aanvul[item][1];
			price += aanvul[item].price * useVol/aanvul[item].vol;
		} else { //als aanvullen
			price += aanvul[item].price * volRemain/aanvul[item].vol;
		}
	}

	//Cocktail(name, glas, fris, drank, alcPer, prijs, creator, omschrijving);
}

module.exports = { cocktailDB, Cocktail, CocktailCreator};