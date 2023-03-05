//database cocktails
const fs = require("fs");
const express = require("express");
let alcoholDB = {};
let nonalcoholDB = {};

//function die de database leest en in een callback zet
function databaseReader() {
	try {
		const jsonString = fs.readFileSync("./public/assets/alcohol.json", "utf8");
		alcoholDB = JSON.parse(jsonString);
	} catch (err){
		console.log("Error reading database:", err);
	}

	try {
		const jsonString = fs.readFileSync("./public/assets/nonalcohol.json", "utf8");
		nonalcoholDB = JSON.parse(jsonString);
	} catch (err){
		console.log("Error reading database:", err);
	}
}

//function die naar de database schrijft
function databaseWriter(type) {
	let jsonString;
	if (type == "alcohol") {
		jsonString = JSON.stringify(alcoholDB);
	} else if (type == "nonalcohol") {
		jsonString = JSON.stringify(nonalcoholDB);
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

//constructor voor een alcohol object
function alcohol(naam, alcper, price, vol) {
	this.naam = naam;
	this.alcper = alcper;
	this.price = price;
	this.vol = vol;
	alcoholDB[naam.toLowerCase().replaceAll(" ", "_")] = this;
}

function nonalcohol(naam, price, vol) {
	this.naam = naam;
	this.price = price;
	this.vol = vol;
	nonalcoholDB[naam.toLowerCase().replaceAll(" ", "_")] = this;
}

module.exports = { alcoholDB, alcohol, nonalcoholDB, nonalcohol, databaseWriter}