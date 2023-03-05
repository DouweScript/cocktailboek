const fs = require('fs');
const {alcoholDB} = require("./drank");
const {nonAlcoholDB} = require("./drank");

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
function Cocktail(name, glass, alcohol, nonAlcohol, alcPer, price, creator, desc){
	this.name = name;
	this.glass = glass;
	this.nonAlcohol = nonAlcohol;
	this.alcohol = alcohol;
	this.alcper = alcPer;
	this.price = price.toFixed(2);
	this.creator = creator;
	this.desc = desc;
	cocktailDB[name.toLowerCase()] = this;
}

//constructor voor nieuwe cocktail
//alcohol dict: { alcohol: aanvullen/[hoeveel, type] }
function CocktailCreator(name, glass, alcohol, nonAlcohol, creator, desc) {
	let glassVolume;

	switch(glass.toLowerCase()) {
		case "longdrink":
			glassVolume = volLongdrink;
			break;
		case "tumbler":
			glassVolume = volTumbler;
			break;
		case "shot":
			glassVolume = volShotglas;
			break;
		case "social":
			glassVolume = volSocial;
			break;
		case "papa":
			glassVolume = volPapa;
			break;
	}

	let alcCont = 0;
	let price = 0;
	let usedVolume = 0;

	let fill = []

	for (let key in alcohol) {
		let alcoholItem = alcoholDB[key.toLowerCase()];

		if (alcohol[key] === "aanvullen") {
			fill.push([alcoholItem, alcohol[key]]);
		} else {
			let vol = alcohol[key][0] * volShotglas;
			usedVolume += vol;
			alcCont += alcoholItem.alcper/100 * vol;
			price += alcoholItem.price * vol / alcoholItem.vol;
		}
	}

	for (let key in nonAlcohol) {
		let nonAlcoholItem = nonAlcoholDB[key.toLowerCase()];

		if (nonAlcohol[key] === "aanvullen") {
			fill.push([nonAlcoholItem, nonAlcohol[key]]);
		} else if (nonAlcohol[key][1] === "shot") {
			let vol = nonAlcohol[key][0] * volShotglas;
			usedVolume += vol;
			price += nonAlcoholItem.price * vol / nonAlcoholItem.vol;
		}
	}

	for (let item in fill) {
		let useVol = (glassVolume - usedVolume)/fill.length;
		price += fill[item][0].price * useVol/fill[item][0].vol;

		if ("alcper" in fill[item][0]) {
			alcCont += fill[item][0].alcper/100 * useVol;
			alcohol[fill[item][0].name.replace(" ", "_").toLowerCase()] = ["aanvullen", (useVol/fill[item][0].vol).toFixed(2)];
		} else {
			console.log(fill);
			console.log(fill[item]);
			console.log(fill[item][0]);
			nonAlcohol[fill[item][0].name.replace(" ", "_").toLowerCase()] = ["aanvullen", (useVol/fill[item][0].vol).toFixed(2)];
		}
	}

	let alcPer = (alcCont/glassVolume * 100).toFixed(2);
	price = price.toFixed(2);

	console.log("----");

	console.log(name);
	console.log(glass);
	console.log(alcohol);
	console.log(nonAlcohol);
	console.log(alcPer);
	console.log(price);
	console.log(creator);
	console.log(desc);

	//Cocktail(name, glas, alcohol, nonAlcohol, alcPer, prijs, creator, desc);
}

module.exports = { cocktailDB, Cocktail, CocktailCreator};