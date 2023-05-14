const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const https = require("https");
const {readFileSync} = require("fs");

//laad cocktails
const {removeDrink, editDrink, addDrink} = require("./script/drank");
const {Cocktail, removeCocktail} = require("./script/cocktails");

const client_secret = readFileSync("./client_secret", "utf-8");

const prismPOST = {
	hostname: "login.i.bolkhuis.nl",
	path: "/token",
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	}
};

const app = express();

//laad form function
function parseForm(data) {
	let alcohol = {};
	let nonAlcohol = {};

	// console.log(data);

	if (typeof data.header.selectAlcohol != "string") {
		for (let item in data.selectAlcohol) {
			item = data.selectAlcohol[item];
			item = item.replaceAll(" ", "_");
			if (data["selectType" + item] === "aanvullen") {
				alcohol[item.toLowerCase()] = ["1.0", "aanvullen"];
			} else {
				alcohol[item.toLowerCase()] = [data["selectN" + item], data["selectType" + item]];
			}
		}
	} else {
		let item = data.selectAlcohol.replaceAll(" ", "_");
		if (data["selectType" + item] === "aanvullen") {
			alcohol[item.toLowerCase()] = ["1.0", "aanvullen"];
		} else {
			alcohol[item.toLowerCase()] = [data["selectN" + item], data["selectType" + item]];
		}
	}

	if (typeof data.selectNonAlcohol != "string") {
		for (let item in data.selectNonAlcohol) {
			item = data.selectNonAlcohol[item];
			item = item.replaceAll(" ", "_");
			if (data["selectType" + item] === "aanvullen") {
				nonAlcohol[item.toLowerCase()] = ["1.0", "aanvullen"];
			} else {
				nonAlcohol[item.toLowerCase()] = [data["selectN" + item], data["selectType" + item]];
			}
		}
	} else {
		let item = data.selectNonAlcohol.replaceAll(" ", "_");
		if (data["selectType" + item] === "aanvullen") {
			nonAlcohol[item.toLowerCase()] = ["1.0", "aanvullen"];
		} else {
			nonAlcohol[item.toLowerCase()] = [data["selectN" + item], data["selectType" + item]];
		}
	}

	if (data.creator === "") {
		data.creator = null;
	}
	if (data.desc === "") {
		data.desc = null;
	}
	Cocktail.create(data.name, data.selectGlass, alcohol, nonAlcohol, data.creator, data.desc);
}

//start server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({
	secret: client_secret,
	resave: false,
	saveUninitialized: true
}));
app.use(helmet());

// refreshDatabase();
// databaseWriter("alcohol");
// databaseWriter("nonAlcohol");

function checkCreateSession(req) {
	if (req.session.stateID === undefined) {
		console.log("Creating session state");
		req.session.stateID = Math.floor(Math.random() * 999999).toString();
	}
}

function checkLogin(req) {
	return req.cookies["bolk-oath-access-token"] !== undefined;
}

function checkPerm(req) {
	return req.cookies["bolk-oath-permission"] !== undefined;
}

app.get('/', (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req)) checkPerm(req);
	res.sendFile(path.join(__dirname, '/html/index.html'));
});

app.get('/new', (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req)) {
		checkPerm(req);
		res.sendFile(path.join(__dirname, '/html/new.html'));
	} else {
		res.redirect("/")
	}
});

app.post("/new", (req, res) => {

	if (checkLogin(req)) {
		checkPerm(req);
		const data = req.body;
		parseForm(data);
		res.redirect("/");
	}

});

app.get("/login", (req, res) => {
	checkCreateSession(req);
	if (req.query.code === undefined && req.query.error === undefined) {
		res.redirect("https://auth.debolk.nl/authenticate?response_type=code&client_id=cocktailboek&redirect_uri=https://cocktails.debolk.nl/login&state=" + req.session.stateID);
	} else {
		if (req.query.state.toString() !== req.session.stateID && req.query.error !== undefined) {
			res.status(400);
		} else {
			let post = https.request(prismPOST, (postRES) => {
				const data = [];
				postRES.on("data", d => data.push(d));
				postRES.on("end", () => {
					let jsonResponse = JSON.parse(Buffer.concat(data));
					console.log(jsonResponse);

					let token = jsonResponse.access_token;

					get = https.request({
						hostname: "login.i.bolkhuis.nl",
						path: "/resource/?access_token=" + token,
						method: "GET"
					}, (getRes) => {
						const data = [];
						getRes.on("data", d => data.push(d));
						getRes.on("end", () => {
							let jsonData = JSON.parse(Buffer.concat(data));

							if (token === jsonData.access_token && token !== undefined) {
								res.cookie("bolk-oath-access-token", token);
								req.session.user = jsonData.user_id;
								console.log("Logged in " + jsonData.user_id + " with access token " + token);
								console.log(jsonData.access_token);
								getPerm = https.request({
									hostname: "login.i.bolkhuis.nl",
									path: "/ictcom/?access_token=" + token,
									method: "GET"
								}, (getRes) => {
									if (getRes.statusCode === 200) {
										res.cookie("bolk-oath-permission", "true");
									}
									res.redirect("/");
								});
								getPerm.end();
								console.log("Attempting to retrieve admin permissions...")
								console.log("https://" + getPerm.host + getPerm.path);
							} else {
								res.status(403);
							}
						});
					});
					get.end();
				});
			});
			post.on("error", (err) => {
				console.log(err);
			});
			post.write(JSON.stringify({
				grant_type: "authorization_code",
				redirect_uri: "https://cocktails.debolk.nl/login",
				code: req.query.code,
				client_id: "cocktailboek",
				client_secret: client_secret
			}));
			post.end();

		}
	}
});
app.get("/logout", (req, res) => {
	console.log("Logged out " + req.session.user);
	res.clearCookie("bolk-oath-access-token");
	res.clearCookie("bolk-oath-permission");
	res.redirect("/");
});

app.get("/admin/cocktails", (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req) && checkPerm(req)) {
		res.sendFile(path.join(__dirname, '/html/admin/cocktails.html'));
	} else {
		res.redirect("/login")
	}
});

app.put("/admin/cocktails", (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req) && checkPerm(req)) {
		if (req.query.remove) {
			removeCocktail(req.query.remove);
		}
		res.sendStatus(200);
	}

});

app.get("/admin/cocktails/edit", (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req) && checkPerm(req)) {
		res.sendFile(path.join(__dirname, '/html/admin/editCocktail.html'));
	} else {
		res.redirect("/login")
	}
});

app.post("/admin/cocktails/edit", (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req) && checkPerm(req)) {

		const data = req.body;
		removeCocktail(req.query.cocktail);
		parseForm(data);
		res.redirect("/admin/cocktails");
	} else {
		res.redirect("/login")
	}
});

app.get("/admin/alcohol", (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req) && checkPerm(req)) {
		res.sendFile(path.join(__dirname, '/html/admin/alcohol.html'));
	} else {
		res.redirect("/login")
	}
});

app.put("/admin/alcohol", (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req) && checkPerm(req)) {
		if (req.query.remove) {
			removeDrink(req.query.remove);
		} else if (req.query.edit) {
			editDrink(req.body);
		} else if (req.query.add) {
			addDrink(req.body);
		}
		res.sendStatus(200);
	} else {
		res.redirect("/login")
	}

});

app.get("/admin/nonalcohol", (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req) && checkPerm(req)) {
		res.sendFile(path.join(__dirname, '/html/admin/nonalcohol.html'));
	} else {
		res.redirect("/login")
	}
});

app.put("/admin/nonalcohol", (req, res) => {
	checkCreateSession(req);
	if (checkLogin(req) && checkPerm(req)) {
		if (req.query.remove) {
			removeDrink(req.query.remove);
		} else if (req.query.edit) {
			editDrink(req.body);
		} else if (req.query.add) {
			addDrink(req.body);
		}
		res.sendStatus(200);
	} else {
		res.redirect("/login")
	}

});

app.listen(3000)
