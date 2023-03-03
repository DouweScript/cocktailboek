//database cocktails
const fs = require("fs");
const express = require("express");
let drankDB = {};
let frisDB = {};

//function die de database leest en in een callback zet
function databaseReader() {
	try {
		const jsonString = fs.readFileSync("./public/assets/drank.json", "utf8");
		drankDB = JSON.parse(jsonString);
	} catch (err){
		console.log("Error reading database:", err);
	}

	try {
		const jsonString = fs.readFileSync("./public/assets/fris.json", "utf8");
		frisDB = JSON.parse(jsonString);
	} catch (err){
		console.log("Error reading database:", err);
	}
}

//function die naar de database schrijft
function databaseWriter(type) {
	let jsonString;
	if (type == "drank") {
		jsonString = JSON.stringify(drankDB);
	} else if (type == "fris") {
		jsonString = JSON.stringify(frisDB);
	} else {
		jsonString = "";
	}

	fs.writeFile("./public/assets/" + type + ".json", jsonString, err => {
		if (err){
			console.log("Error writing database:", err)
		} else{
			console.log("Successfully wrote to database")
		}
	});
}

//init database
databaseReader();

//constructor voor een drank object
function Drank(naam, alcper, price, vol) {
	this.naam = naam;
	this.alcper = alcper;
	this.price = price;
	this.vol = vol;
	drankDB[naam.toLowerCase().replaceAll(" ", "_")] = this;
}

function Fris(naam, price, vol) {
	this.naam = naam;
	this.price = price;
	this.vol = vol;
	frisDB[naam.toLowerCase().replaceAll(" ", "_")] = this;
}

module.exports = { drankDB, Drank, frisDB, Fris, databaseWriter}