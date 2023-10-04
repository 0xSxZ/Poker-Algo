const express = require("express");
const cfr = require("../cfr/cfr")
const router = express.Router()

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
    }else{
        return res.redirect("/input")
    }

    
    if(type2 == "♦"){
        type2 = "D"
    }else if(type2 == "♠"){
        type2 = "S"
    }else if(type2 == "♥"){
        type2 = "H"
    }else if(type2 == "♣"){
        type2 = "C"
    }else{
        return res.redirect("/input")
    }

    
    const Input =  [carte1 + type1, carte2 + type2]


    console.log("[+] Your choosen hand is : " + carte1 + type1 + " and a " + carte2 + type2)
    
    const RESULT = cfr.runCFR(Input)
    
    res.render("../views/result.ejs", {     
        bestOption: RESULT.Decisions,
        winningPercentage:RESULT.Percent
    })
})


module.exports = router