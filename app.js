
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

//laad cocktails
const sterk = require("./script/alcohol");
const cocktails = require("./script/cocktails");
const {Cocktail} = require("./script/cocktails");
const {CocktailCreator} = require("./script/cocktails");

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
    let nonalcohol = {};

    if (typeof data.selectalcohol != "string") {
        for (let item in data.selectalcohol) {
            item = data.selectalcohol[item];
            item = item.replaceAll(" ", "_")
            if (data["selectType" + item] == "aanvullen") {
                alcohol[item] = "aanvullen";
            } else {
                alcohol[item] = [data["selectN" + item], data["selectType" + item]];
            }
        }
    } else {
        let item = data.selectnonalcohol.replaceAll(" ", "_")
        if (data["selectType" + item] == "aanvullen") {
            nonalcohol[item] = "aanvullen";
        } else {
            nonalcohol[item] = [data["selectN" + item], data["selectType" + item]];
        }
    }

    if (typeof data.selectnonalcohol != "string") {
        for (let item in data.selectnonalcohol) {
            item = data.selectnonalcohol[item];
            item = item.replaceAll(" ", "_")
            if (data["selectType" + item] == "aanvullen") {
                nonalcohol[item] = "aanvullen";
            } else {
                nonalcohol[item] = [data["selectN" + item], data["selectType" + item]];
            }
        }
    } else {
        let item = data.selectnonalcohol.replaceAll(" ", "_")
        if (data["selectType" + item] == "aanvullen") {
            nonalcohol[item] = "aanvullen";
        } else {
            nonalcohol[item] = [data["selectN" + item], data["selectType" + item]];
        }
    }

    console.log(data);
    CocktailCreator(data.name, data.selectGlass, alcohol, nonalcohol, data.creator, data.desc);
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
