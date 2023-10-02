const express = require("express");

const path = require("path")
const fs = require("fs")
const hands = require("../calculation/hands")
const pick = require("../calculation/pick")
const calculation = require("../calculation/calculation")
const game = require('../simulation/game');
const probability = require("../simulation/proba").probability

const router = express.Router()
var BALANCE = 10000;
var BET = 100;

var LOOSE = 0;
var WIN = 0;
var TIE = 0;
var TOTAL = 0;

const LOOSE_HANDS = []
const WIN_HANDS = []

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
 } 

router.use("/input", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})

router.use("/result", (req, res, next) => {

    const carte1 = req.body.carte1
    const carte2 = req.body.carte2

    var type1 = req.body.carte1type
    var type2 = req.body.carte2type
    
    if(type1 == "♦"){
        type1 = "D"
    }else if(type1 == "♠"){
        type1 = "S"
    }else if(type1 == "♥"){
        type1 = "H"
    }else if(type1 == "♣"){
        type1 = "C"
    }

    
    if(type2 == "♦"){
        type2 = "D"
    }else if(type2 == "♠"){
        type2 = "S"
    }else if(type2 == "♥"){
        type2 = "H"
    }else if(type2 == "♣"){
        type2 = "C"
    }

    
    const Input =  [carte1 + type1, carte2 + type2]


    console.log("[+] You choosen hand is : " + Input.toString().split(",")[0] + " and a " + Input.toString().split(",")[1] )
    
    const RESULT = probability( Input )
    res.render("../views/result.ejs", {text: RESULT.deci + " (" + RESULT.percent.toFixed(2) + "%)"})
})


module.exports = router