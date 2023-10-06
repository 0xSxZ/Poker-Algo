const express = require("express");

const path = require("path")
const fs = require("fs")

const router = express.Router()


router.use("/input", (req, res, next) => {
    if(!req.session.free){
        req.session.free = false;
    }
    res.render(path.join(__dirname, "../views/cfr/index.ejs"), {free:req.session.free})
})

router.use("/helpers", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views/cfr/helpers.html"))
})

router.use("/licence", (req, res, next) => {
    res.render(path.join(__dirname, "../views/licence.ejs"), {message:undefined, color:undefined})
})

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})


module.exports = router