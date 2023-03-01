//database cocktails
const fs = require("fs");
const express = require("express");
let drankDB = {};

//function die de database leest en in een callback zet
function databaseReader() {
	try {
		const jsonString = fs.readFileSync("./public/assets/drank.json", "utf8");
		drankDB = JSON.parse(jsonString);
	} catch (err){
		console.log("Error reading database:", err);
	}
}

//function die naar de database schrijft
function databaseWriter(cocktail) {
	const jsonString = JSON.stringify(cocktail);
	fs.writeFile("./public/assets/drank.json", jsonString, err => {
		if (err){
			console.log("Error writing database:", err)
		} else{
			console.log("Successfully wrote to database")
		}
	})
}

//init database
databaseReader();

//constructor voor een drank object
function Drank(naam, alcper, prijs){
	this.naam = naam;
	this.alcper = alcper;
	this.prijs = prijs;
	drankDB[naam.toLowerCase()] = this;
}

module.exports = { drankDB, Drank }