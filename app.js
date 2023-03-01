const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

//laad cocktails
const sterk = require("./script/drank");
const cocktails = require("./script/cocktails");

const app = express();

//start server
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());

app.get('/new', (req, res) => {
    res.redirect("/new.html")
    //res.sendFile(path.join(__dirname, './public/new.html'));
});
app.post("/new", (req, res) => {
    console.log(req.body);

    res.send("ok");
});
app.get("/login", (req, res) => {
    res.setHeader("Set-Cookie", 'bolk-oath-access-token=true');
    res.redirect("/");
});
app.post("/login", (req, res) => {
    res.setHeader("Set-Cookie", 'bolk-oath-access-token=true');
    res.redirect("/");
});

app.listen(3000)
