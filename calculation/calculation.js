const hands = require("./hands")


const getRanks = (hand) => {
    const FINAL_ARR = []
    for(var i = 0; i < hand.length; i++){
        FINAL_ARR.push(hand[i].split("_")[1])
    }

    return FINAL_ARR
}


exports.calculation = (SET, HAND, ENEMY, ENEMY_SET, cardsValue) => {

    const RANK = getRanks(HAND);
    const ENEMY_RANK = getRanks(ENEMY);

    // I WIN : 
    if(SET == ENEMY_SET && SET != "HIGH_CARDS") return "TIE";
    if(SET == "ROYAL_FLUSH") return "WIN"
    if(SET == "FLUSH" && ENEMY_SET != "ROYAL_FLUSH") return "WIN";
    if(SET == "SQUARE" && ENEMY_SET != "FLUSH" && ENEMY_SET != "ROYAL_FLUSH") return "WIN";
    if(SET == "FULL" && ENEMY_SET != "ROYAL_FLUSH" && ENEMY_SET != "SQUARE") return "WIN";
    if(SET == "COLOR" && ENEMY_SET != "ROYAL_FLUSH" && ENEMY_SET != "SQUARE" && ENEMY_SET != "FULL") return "WIN";
    if(SET == "5_OF_A_KIND" && ENEMY_SET != "ROYAL_FLUSH" && ENEMY_SET != "SQUARE" && ENEMY_SET != "FULL" && ENEMY_SET != "COLOR") return "WIN";
    if(SET == "2_PAIR" && ENEMY_SET != "5_OF_A_KIND" && ENEMY_SET != "ROYAL_FLUSH" && ENEMY_SET != "SQUARE" && ENEMY_SET != "FULL" && ENEMY_SET != "COLOR") return "WIN";
    if(SET == "HIGH_CARDS" && ENEMY_SET != "HIGH_CARDS") return "LOOSE";
    
    if(SET == "HIGH_CARDS" && ENEMY_SET == "HIGH_CARDS"){
        var highestMe = 0;
        var highestEnemy = 0;
        for(var i = 0; i< RANK.length; i++){
            if(cardsValue[RANK[i]] > highestMe){
                highestMe = cardsValue[RANK[i]]
            }
        }

        

        for(var i = 0; i< ENEMY_RANK.length; i++){
            if(cardsValue[ENEMY_RANK[i]] > highestMe){
                highestEnemy = cardsValue[ENEMY_RANK[i]]
            }
        }


        if(highestEnemy > highestMe){
            return "LOOSE"
        }else{
            return "WIN"
        }
    };

    // ENEMY WIN : 
    return "LOOSE"
    
}

