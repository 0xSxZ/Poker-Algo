const bodyParser = require("body-parser");
const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, ".", "public")))
app.use(bodyParser.urlencoded({extended: false}));




const Routes = require("./routes/main.js")
const ApiRoutes = require("./routes/api.js")

app.use("/", Routes);
app.use("/api", ApiRoutes);

app.listen(80)