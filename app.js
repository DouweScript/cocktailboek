
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

//laad cocktails
const sterk = require("./script/drank");
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
    let drank = {};
    let fris = {};

    for (let item in data.selectDrank) {
        item = data.selectDrank[item];
        item = item.replaceAll(" ", "_")
        if (data["selectType" + item] == "aanvullen") {
            drank[item] = "aanvullen";
        } else {
            drank[item] = [data["selectN" + item], data["selectType" + item]];
        }
    }
    for (let item in data.selectFris) {
        item = data.selectFris[item];
        item = item.replaceAll(" ", "_")
        if (data["selectType" + item] == "aanvullen") {
            fris[item] = "aanvullen";
        } else {
            fris[item] = [data["selectN" + item], data["selectType" + item]];
        }
    }

    CocktailCreator(data.naam, data.selectGlas, drank, fris, data.creator, data.omschrijving);
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
