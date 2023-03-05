const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

//laad cocktails
const drank = require("./script/drank");
const cocktails = require("./script/cocktails");
const {Cocktail} = require("./script/cocktails");
const {CocktailCreator} = require("./script/cocktails");
const {nonAlcoholDB} = require("./script/drank");

const app = express();

//start server
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());

app.get('/new', (req, res) => {
    res.redirect("/new.html")
    // res.sendFile(path.join(__dirname, '/public/new.html'));
});
app.post("/new", (req, res) => {
    const data = req.body;

    let alcohol = {};
    let nonAlcohol = {};

    if (typeof data.selectAlcohol != "string") {
        for (let item in data.selectAlcohol) {
            item = data.selectAlcohol[item];
            item = item.replaceAll(" ", "_");
            if (data["selectType" + item] === "aanvullen") {
                alcohol[item.toLowerCase()] = "aanvullen";
            } else {
                alcohol[item.toLowerCase()] = [data["selectN" + item], data["selectType" + item]];
            }
        }
    } else {
        let item = data.selectAlcohol.replaceAll(" ", "_");
        if (data["selectType" + item] === "aanvullen") {
            alcohol[item.toLowerCase()] = "aanvullen";
        } else {
            alcohol[item.toLowerCase()] = [data["selectN" + item], data["selectType" + item]];
        }
    }

    if (typeof data.selectNonAlcohol != "string") {
        for (let item in data.selectNonAlcohol) {
            item = data.selectNonAlcohol[item];
            item = item.replaceAll(" ", "_");
            if (data["selectType" + item] === "aanvullen") {
                nonAlcohol[item.toLowerCase()] = "aanvullen";
            } else {
                nonAlcohol[item.toLowerCase()] = [data["selectN" + item], data["selectType" + item]];
            }
        }
    } else {
        let item = data.selectNonAlcohol.replaceAll(" ", "_");
        if (data["selectType" + item] === "aanvullen") {
            nonAlcohol[item.toLowerCase()] = "aanvullen";
        } else {
            nonAlcohol[item.toLowerCase()] = [data["selectN" + item], data["selectType" + item]];
        }
    }

    CocktailCreator(data.name, data.selectGlass, alcohol, nonAlcohol, data.creator, data.desc);
    res.send("ok");
});

app.get("/login", (req, res) => {
    res.cookie('bolk-oath-access-token', 'true')
    res.redirect("/");
});
app.get("/logout", (req, res) => {
    res.clearCookie("bolk-oath-access-token");
    res.redirect("/");
})


app.listen(3000)
