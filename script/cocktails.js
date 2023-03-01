const fs = require('fs');

//volume van glazen in mililiter
const volShotglas = 40;
const volLongdrink = 300;
const volSocial = 500;
const volTumbler = volLongdrink;

//prijzen van fris in euro
const prijsFrisGroot = 0.80;
const prijsFrisKlein = 1.00;

//namen van glazen
const longdrink = "Longdrink";
const social = "Social";
const tumbler = "Tumbler";
const shot = "Shot"

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

//function die het volume alcohol van één borrel van een cocktail returned
function calcAlcVol(sterk, hoeveelheidshotjes){
	return sterk.alcper * hoeveelheidshotjes * volShotglas / 100;
}

function calcAlcVolBier(aantal){
	return Dommelsch.alcper * aantal * 250 / 100;
}

//functie die het alcoholpercentage van een cocktail uitrekend
function calcAlcPer(volume, volumeglass){
	const alcoholPercentage = 100 * volume / volumeglass;
	return alcoholPercentage.toFixed(1);
}

//berekent de prijs van een borrelsterk
function calcPriceShot(sterk, hoeveelheidshotjes){
	return sterk.prijs * hoeveelheidshotjes;
}

//constructor voor een cocktail
function Cocktail(naam, glas, fris, spirits, alcper, prijs, creator, omschrijving){
	this.naam = naam;
	this.glass = glas;
	this.fris = fris;
	this.spirits = spirits;
	this.alcper = alcper;
	this.prijs = prijs.toFixed(2);
	this.creator = creator;
	this.omschrijving = omschrijving;
	cocktailDB[naam.toLowerCase()] = this;
}

module.exports = { cocktailDB, Cocktail }