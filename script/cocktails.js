const fs = require('fs');
const {alcoholDB} = require("./drank");
const {nonAlcoholDB} = require("./drank");

//volume van glazen in mililiter
const volShotglas = 40;
const volLongdrink = 300;
const volTumbler = 300;
const volPul = 500;
const volPitcher = 1500;
const volPapa = 500;

//database cocktails
let cocktailDB = {};

//function die de database leest
function databaseReader() {
	try {
		const jsonString = fs.readFileSync("./public/assets/cocktails.json", "utf8");
		cocktailDB = JSON.parse(jsonString);
	} catch (err){
		console.log("Error reading database:", err);
	}
}

function refreshDatabase() {
	for (let name in cocktailDB) {
		try{
			let cock = cocktailDB[name];
			let temp = Cocktail.create(cock.name, cock.glass.toLowerCase(), cock.alcohol, cock.nonAlcohol, cock.creator, cock.desc, false);
			delete cocktailDB[name];
			cocktailDB[getId(name)] = temp;
		} catch (e) {
			console.log("ERR: " + name + " could not conform!");
			console.log(e.message);
			console.log(cocktailDB[name]);
		}
	}
	databaseWriter();
}

function getId(name){
	return name.toLowerCase().replace(/ /g, "_");
}

function removeCocktail(name){
	if (name in cocktailDB) {
		delete cocktailDB[name];
		databaseWriter();
	}
}

function sortOnKeys() {

    let sorted = [];
    for(let key in cocktailDB) {
        sorted[sorted.length] = key;
    }
    sorted.sort();

    let tempDict = {};
    for(let i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = cocktailDB[sorted[i]];
    }

    cocktailDB = {};
    cocktailDB = tempDict;
}

//function die naar de database schrijft
function databaseWriter() {
	sortOnKeys();
	const jsonString = JSON.stringify(cocktailDB);
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
class Cocktail {
	name;
	glass;
	alcohol;
	nonAlcohol;
	alcPer;
	price;
	constructor(name, glass, alcohol, nonAlcohol, alcPer, price, creator, desc){
		this.name = name;
		this.glass = glass;
		this.alcohol = alcohol;
		this.nonAlcohol = nonAlcohol;

		if (alcPer === null || price === null) {
			this.calcAlcoholPrice();
		} else {
			this.alcPer = alcPer;
			this.price = price;
		}

		this.creator = creator;
		this.desc = desc;
		cocktailDB[getId(this.name)] = this;
	}

	calcAlcoholPrice() {
		let glassVolume;

		switch(this.glass.toLowerCase()) {
			case "longdrink":
				glassVolume = volLongdrink;
				break;
			case "tumbler":
				glassVolume = volTumbler;
				break;
			case "shot":
				glassVolume = volShotglas;
				break;
			case "pul":
				glassVolume = volPul;
				break;
			case "pitcher":
				glassVolume = volPitcher;
				break;
			case "papa":
				glassVolume = volPapa;
				break;
		}

		let alcCont = 0;
		let price = 0;
		let usedVolume = 0;

		let fill = []
		for (let key in this.alcohol) {
			let alcoholItem = alcoholDB[getId(key)];

			if (alcoholItem === undefined || alcoholItem === null) throw new Error(key + " is not defined!");

			let vol;
			if (this.alcohol[key][0] === "aanvullen") {
				fill.push([alcoholItem, this.alcohol[key]]);
				continue;
			} else if (this.alcohol[key] === "fles") {
				vol = this.alcohol[key][0] * alcoholItem.vol;
			} else if (this.alcohol[key] === "scheutje") {
				vol = 0;
			} else {
				vol = this.alcohol[key][0] * volShotglas;
			}

			usedVolume += vol;
			alcCont += alcoholItem.alcPer/100 * vol;
			price += alcoholItem.price * vol / alcoholItem.vol;
		}
		for (let key in this.nonAlcohol) {
			let nonAlcoholItem = nonAlcoholDB[getId(key)];

			if (nonAlcoholItem === undefined || nonAlcoholItem === null) throw new Error(key + " is not defined!");

			let vol;
			if (this.nonAlcohol[key][1] === "aanvullen") {
				fill.push([nonAlcoholItem, this.nonAlcohol[key]]);
				continue;
			} else if (this.nonAlcohol[key][1] === "fles") {
				vol = this.nonAlcohol[key][0] * nonAlcoholItem.vol;
			} else if (this.nonAlcohol[key][1] === "scheutje") {
				vol = 0;
			} else if (this.nonAlcohol[key][1] === "shot") {
				vol = this.nonAlcohol[key][0] * volShotglas;
			}
			usedVolume += vol;
			price += nonAlcoholItem.price * vol / nonAlcoholItem.vol;
		}
		let useVol;
		if (fill.length > 0) {
			useVol = (glassVolume - usedVolume)/fill.length;
		}
		for (let item in fill) {
			price += fill[item][0].price * useVol/fill[item][0].vol;

			if ("alcPer" in fill[item][0]) {
				alcCont += fill[item][0].alcPer/100 * useVol;
				this.alcohol[getId(fill[item][0].name)] = [(useVol/fill[item][0].vol).toFixed(1), "aanvullen"];
			} else {
				this.nonAlcohol[getId(fill[item][0].name)] = [(useVol/fill[item][0].vol).toFixed(1), "aanvullen"];
			}
			usedVolume += useVol;
		}
		this.alcPer = (alcCont/glassVolume * 100).toFixed(2);
		this.price = price.toFixed(2);

	}

	static create(name, glass, alcohol, nonAlcohol, creator, desc, write = true) {
		let c = new Cocktail(name, glass, alcohol, nonAlcohol, null, null, creator, desc);
		if (write) databaseWriter(cocktailDB);
		return c;
	}
}

module.exports = { cocktailDB, Cocktail, refreshDatabase, removeCocktail};