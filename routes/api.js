const express = require("express");
const cfr = require("../cfr/cfr");
const KeyAuth = require('../keyauth');
const { GetDb } = require("../utils/database");

const KeyAuthApp = new KeyAuth(
    'Pokia',      // Application Name
    '4uK4Vz3LBD',     // Application OwnerId
    'd6afaad7da9ef02df71206e8eb2ea28a2b93fca302ae004e25c86887c0e2731b',    // Application Secret
    '1.0' // Application Version
);

const router = express.Router()

router.use("/addLicence", async (req, res, next) => {

    if(!req.body.licence)   return res.render("/licence", {message:"Please enter a licence"})
    try{
        await KeyAuthApp.Initialize();
        const b = await KeyAuthApp.license(req.body.licence);
        console.log(b)
        if(b.success){
            req.session.licence = req.body.licence;
            req.session.free = false
        }else if(b.includes("ERR")){
            req.session.free = true
            return res.send({"ERROR":"INVALID LICENCE"});
        }else if(!b.success){
            req.session.free = true
            return res.send({"ERROR":"INVALID LICENCE"});
        }
    }catch{
        return res.render("/licence", {message:"INTERNAL SERVER ERROR"})
    }
})

router.use("/result", async (req, res, next) => {
    /*
    const db = GetDb()
    console.log("DB : " , db)
    const collection = db.collection('users');

    
    if(req.session.licence){
        await KeyAuthApp.Initialize();
        const b = await KeyAuthApp.license(req.session.licence);
        if(b.success){
            req.session.free = false
        }else if(b.includes("ERR")){
            req.session.free = true
            return res.send({"ERROR":"INVALID LICENCE"});
        }else if(!b.success){
            req.session.free = true
            return res.send({"ERROR":"INVALID LICENCE"});
        }
    }else{
        req.session.free = true
        if(req.session.used){
            req.session.used = req.session.used + 1
        }else{
            req.session.used = 1
        }
        
        const IP = req.socket.remoteAddress
        const _user = await db.collection("users").findOne({ip: IP})
        var used
        if(_user){
            if(_user.used != undefined || _user.used != ""){
                console.log("USER USED EXISTS")
                used = Number(_user.used)
                collection.updateMany({ip:IP},{"$set" : {used:used + 1}}, (err, data) => {
                    if (err)
                        return res.send({
                            success: false,
                            message: 'Error: Server error.'
                        });
                    return res.send({
                        success: true,
                        message: 'Transfer Success!'
                    });
                });
        
            }else{
                used = 0
            }

        }else{
            used = 0

            collection.insertOne({ip: IP, used:used},(err, data) => {
                if (err)
                    return res.send({
                        success: false,
                        message: 'Error: Server error.'
                    });
                return res.send({
                    success: true,
                    message: 'Transfer Success!'
                });
            });

        }
      
        console.log(req.session.used)
        if(_user){
            if(_user.used){
                if(_user.used >= 5){
                    return res.send({error:"Maximum hands/day exceded"})
                }
            }
        }
        if(req.session.used >= 5){
            return res.send({error:"Maximum hands/day exceded"})
        }
    
    }
    */ 

    const carte1 = req.body.carte1
    const carte2 = req.body.carte2

    var type1 = req.body.carte1type
    var type2 = req.body.carte2type

    const t = {
        "♦":"D",
        "♠":"S",
        "♥":"H",
        "♣":"C"
    }
    type1 = t[type1]

    type2 = t[type2]


    // Table 
    var tableType1 = req.body.table1type
    var tableType2 = req.body.table2type
    var tableType3 = req.body.table3type
    var tableType4 = req.body.table4type
    var tableType5 = req.body.table5type
    
    var tableCard1 = req.body.table1
    var tableCard2 = req.body.table2
    var tableCard3 = req.body.table3
    var tableCard4 = req.body.table4
    var tableCard5 = req.body.table5

    var communityCards = [];
    if(     
        tableCard1 != undefined && 
        tableCard2 != undefined && 
        tableCard3 != undefined &&
        tableCard4 != undefined &&
        tableCard5 != undefined &&
        tableType1 != undefined && 
        tableType2 != undefined && 
        tableType3 != undefined && 
        tableType4 != undefined &&
        tableType5 != undefined
        )
    {
        tableType1 = t[tableType1]
        tableType2 = t[tableType2]
        tableType3 = t[tableType3]
        tableType4 = t[tableType4]
        tableType5 = t[tableType5]
    
        communityCards = [tableCard1 +tableType1,tableCard2 +tableType2, tableCard3 +tableType3, tableCard4 +tableType4, tableCard5 +tableType5]

    }else if(        
        tableCard1 != undefined && 
        tableCard2 != undefined && 
        tableCard3 != undefined &&
        tableCard4 != undefined &&
        tableType1 != undefined && 
        tableType2 != undefined && 
        tableType3 != undefined && 
        tableType4 != undefined){
            
            tableType1 = t[tableType1]
            tableType2 = t[tableType2]
            tableType3 = t[tableType3]
            tableType4 = t[tableType4]
            communityCards = [tableCard1 +tableType1,tableCard2 +tableType2, tableCard3 +tableType3, tableCard4 +tableType4]

    }else if(
        tableCard1 != undefined && 
        tableCard2 != undefined && 
        tableCard3 != undefined &&
        tableType1 != undefined && 
        tableType2 != undefined && 
        tableType3 != undefined 
        )
    {
        tableType1 = t[tableType1]
        tableType2 = t[tableType2]
        tableType3 = t[tableType3]
        communityCards = [tableCard1 +tableType1,tableCard2 +tableType2, tableCard3 +tableType3 ]

    }

    const Input =  [carte1 + type1, carte2 + type2]

    console.log("[+] Your choosen hand is : " + carte1 + type1 + " and a " + carte2 + type2)
    console.log("[+] Community cards : ", communityCards)
    const RESULT = cfr.runCFR(Input, communityCards)
    
    res.render("../views/cfr/result.ejs", {     
        bestOption: RESULT.Decisions,
        winningPercentage:RESULT.Percent.toFixed(2),
        fullArr : [RESULT.startingBalance.toFixed(0),RESULT.dividedBalance.toFixed(0), RESULT.playedGames] ,
        combinaison:RESULT.combinaison
    })
})


module.exports = router