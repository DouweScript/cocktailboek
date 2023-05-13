const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

//laad cocktails
const {nonAlcoholDB, alcoholDB, databaseWriter, removeDrink, editDrink, addDrink} = require("./script/drank");
const {Cocktail, refreshDatabase, removeCocktail} = require("./script/cocktails");

const app = express();

//laad form function
function parseForm(data) {
    let alcohol = {};
    let nonAlcohol = {};

    console.log(data);

    if (typeof data.header selectAlcohol != "string") {
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
app.use(helmet());

refreshDatabase();
databaseWriter("alcohol");
databaseWriter("nonAlcohol");

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/index.html'));
});

app.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/new.html'));
});

app.post("/new", (req, res) => {
    const data = req.body;
    parseForm(data);
    res.redirect("/");
});

app.get("/login", (req, res) => {
    res.cookie('bolk-oath-access-token', 'true')

    //test management
    //https://login.i.bolkhuis.nl/ictcom/?access_token=example-access-token response should be 200 OK
    res.cookie('bolk-oath-permission', 'true')
    res.redirect("/");
});
app.get("/logout", (req, res) => {
    res.clearCookie("bolk-oath-access-token");
    res.clearCookie("bolk-oath-permission");
    res.redirect("/");
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin.html'));
});

app.get("/admin/cocktails", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/cocktails.html'));
});

app.put("/admin/cocktails", (req, res) => {
    if (req.query.remove) {
        removeCocktail(req.query.remove);
    }
    res.sendStatus(200);
});

app.get("/admin/cocktails/edit", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/editCocktail.html'));
});

app.post("/admin/cocktails/edit", (req, res) => {
    const data = req.body;
    removeCocktail(req.query.cocktail);
    parseForm(data);
    res.redirect("/admin/cocktails");
});

app.get("/admin/alcohol", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/alcohol.html'));
});

app.put("/admin/alcohol", (req, res) => {
    if (req.query.remove) {
        removeDrink(req.query.remove);
    } else if (req.query.edit) {
        editDrink(req.body);
    } else if (req.query.add) {
        addDrink(req.body);
    }
    res.sendStatus(200);
});

app.get("/admin/nonalcohol", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/nonalcohol.html'));
});

app.put("/admin/nonalcohol", (req, res) => {
    if (req.query.remove) {
        removeDrink(req.query.remove);
    } else if (req.query.edit) {
        editDrink(req.body);
    } else if (req.query.add) {
        addDrink(req.body);
    }
    res.sendStatus(200);
});

app.listen(3000)
