//database cocktails
const fs = require("fs");
let alcoholDB = {};
let nonAlcoholDB = {};

function getId(name) {
	return name.toLowerCase().replace(/ /g, "_");
}

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
	this.alcPer = parseFloat(alcPer);
	this.price = parseFloat(price);
	this.vol = parseFloat(vol);
	alcoholDB[getId(name)] = {name: this.name, alcPer: this.alcPer, price: this.price, vol: this.vol};
}

function nonAlcohol(name, price, vol) {
	this.name = name;
	this.price = parseFloat(price);
	this.vol = parseFloat(vol);
	nonAlcoholDB[getId(name)] = {name: this.name, price: this.price, vol: this.vol};
}

function removeDrink(name) {
	if (getId(name) in alcoholDB) {
		delete alcoholDB[name];
		databaseWriter("alcohol");
	} else {
		delete nonAlcoholDB[name];
		databaseWriter("nonAlcohol");
	}
}

function editDrink(json) {
	if (getId(json.name) in alcoholDB) {
		delete alcoholDB[json.name];
		alcohol(json.name, json.alcPer, json.price, json.vol);
		databaseWriter("alcohol");
	} else if (getId(json.name) in nonAlcoholDB) {
		delete nonAlcoholDB[json.name];
		nonAlcohol(json.name, json.price, json.vol);
		databaseWriter("nonAlcohol");
	}
}

function addDrink(json) {
	if ("alcPer" in json) {
		alcohol(json.name, json.alcPer, json.price, json.vol);
		databaseWriter("alcohol");
	} else {
		nonAlcohol(json.name, json.price, json.vol);
		databaseWriter("nonAlcohol");
	}

}

module.exports = { alcoholDB, alcohol, nonAlcoholDB, nonAlcohol, databaseWriter, removeDrink, editDrink, addDrink}