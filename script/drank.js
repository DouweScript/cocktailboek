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

function sortOnKeys(db) {

    let sorted = [];
    for(let key in db) {
        sorted[sorted.length] = key;
    }
    sorted.sort();

    let tempDict = {};
    for(let i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = db[sorted[i]];
    }

    return tempDict;
}

//function die naar de database schrijft
function databaseWriter(type) {
	let jsonString;
	if (type === "alcohol") {
		alcoholDB = sortOnKeys(alcoholDB);
		jsonString = JSON.stringify(alcoholDB);
	} else if (type === "nonAlcohol") {
		nonAlcoholDB = sortOnKeys(nonAlcoholDB);
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
function alcohol(name, alcPer, price, vol) {
	this.name = name;
	this.alcPer = alcPer;
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

function removeDrink(name) {

}


module.exports = { alcoholDB, alcohol, nonAlcoholDB, nonAlcohol, databaseWriter, removeDrink}