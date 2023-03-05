//database cocktails
const fs = require("fs");
let alcoholDB = {};
let nonAlcoholDB = {};

//function die de database leest en in een callback zet
function databaseReader() {
	try {
		const jsonString = fs.readFileSync("./public/assets/alcohol.json", "utf8");
		alcoholDB = JSON.parse(jsonString);
	} catch (err){
		console.log("Error reading database:", err);
	}

	try {
		const jsonString = fs.readFileSync("./public/assets/nonAlcohol.json", "utf8");
		nonAlcoholDB = JSON.parse(jsonString);
	} catch (err){
		console.log("Error reading database:", err);
	}
}

//function die naar de database schrijft
function databaseWriter(type) {
	let jsonString;
	if (type === "alcohol") {
		jsonString = JSON.stringify(alcoholDB);
	} else if (type === "nonAlcohol") {
		jsonString = JSON.stringify(nonAlcoholDB);
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
function alcohol(name, alcper, price, vol) {
	this.name = name;
	this.alcper = alcper;
	this.price = price;
	this.vol = vol;
	alcoholDB[name.toLowerCase().replaceAll(" ", "_")] = this;
}

function nonAlcohol(name, price, vol) {
	this.name = name;
	this.price = price;
	this.vol = vol;
	nonAlcoholDB[name.toLowerCase().replaceAll(" ", "_")] = this;
}

module.exports = { alcoholDB, alcohol, nonAlcoholDB, nonAlcohol, databaseWriter}