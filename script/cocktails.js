const fs = require('fs');
const {alcoholDB} = require("./alcohol");
const {nonalcoholDB} = require("./alcohol");

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
function Cocktail(name, glass, alcohol, nonalcohol, alcPer, price, creator, desc){
	this.name = name;
	this.glass = glass;
	this.nonalcohol = nonalcohol;
	this.alcohol = alcohol;
	this.alcper = alcPer;
	this.price = price.toFixed(2);
	this.creator = creator;
	this.desc = desc;
	cocktailDB[name.toLowerCase()] = this;
}

//constructor voor nieuwe cocktail
//alcohol dict: { alcohol: aanvullen/[hoeveel, type] }
function CocktailCreator(name, glass, alcohol, nonalcohol, creator, desc) {
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

	for (let key in alcohol) {
		let alcoholItem = alcoholDB[key.toLowerCase()];

		if (alcohol[key] == "aanvullen") {
			aanvul.push([alcoholItem, alcohol[key]]);
		} else if (alcohol[key][1] == "glas") {
			aanvul.push([alcoholItem, alcohol[key][0], alcohol[key][1]]);
		} else {
			let vol = alcohol[key][0] * volShotglas;
			usedVolume += vol;
			alcCont += alcoholItem.alcper/100 * vol;
			price += alcoholItem.price * vol / alcoholItem.vol;
		}
	}

	console.log(alcCont);

	for (let key in nonalcohol) {
		let nonalcoholItem = nonalcoholDB[key.toLowerCase()];

		if (nonalcohol[key] == "aanvullen") {
			aanvul.push([nonalcoholItem, nonalcohol[key]]);
		} else if (nonalcohol[key][1] == "glas") {
			aanvul.push([nonalcoholItem, nonalcohol[key][0], nonalcohol[key][1]]);
		} else {
			let vol = nonalcohol[key][0] * volShotglas;
			usedVolume += vol;
			price += nonalcoholItem.price * vol / nonalcoholItem.vol;
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
	console.log(nonalcohol);
	console.log(alcohol);
	console.log(alcPer);
	console.log(price);
	console.log(creator);
	console.log(desc);

	//Cocktail(name, glas, alcohol, nonalcohol, alcPer, prijs, creator, desc);
}

module.exports = { cocktailDB, Cocktail, CocktailCreator};