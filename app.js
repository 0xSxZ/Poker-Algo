const bodyParser = require("body-parser");
const express = require("express")
const fs = require("fs")
const path = require("path")
var session = require('express-session')
const { MongoConnect } = require("./utils/database.js");

var sess = {
    secret: 'SECRE333TUHQf135z153daz645daz**',
    cookie: {}
}
const app = express()

app.use(session(sess))
app.use(express.static(path.join(__dirname, ".", "public")))
app.use(bodyParser.urlencoded({extended: false}));




const Routes = require("./routes/main.js")
const ApiRoutes = require("./routes/api.js");

app.use("/", Routes);
app.use("/api", ApiRoutes);

MongoConnect(() => {
})
app.listen(process.env.PORT || 3000)