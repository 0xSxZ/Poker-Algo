const express = require("express");

const path = require("path")
const fs = require("fs")

const router = express.Router()


router.use("/input", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})


module.exports = router