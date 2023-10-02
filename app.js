const game = require('./simulation/game');

const bodyParser = require("body-parser");
const express = require("express")
const hands = require("./calculation/hands")
const pick = require("./calculation/pick")
const calculation = require("./calculation/calculation")
const fs = require("fs")


const app = express()

app.use(bodyParser.urlencoded({extended: false}));

const Routes = require("./routes/generate.js")

app.use("/", Routes);
app.listen(process.env.PORT || 3000)
