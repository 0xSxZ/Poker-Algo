
for(var i = 0; i<=10000; i++){
    BET = 100;
    if(BALANCE <= 0) break;
    TOTAL = TOTAL + 1;
    var HAND = [].concat(game.flop(cards))
    var ENEMY = [].concat(game.flop(cards))
        
    const PICK_OR_RAISE = pick.pick(HAND)

    if(PICK_OR_RAISE == "RAISE"){
        console.log("RAISE")
        BET = BET * 2
    }else if(PICK_OR_RAISE == "FOLD"){
        BALANCE = BALANCE - (BET) 
        return
    }else if(PICK_OR_RAISE == "PICK"){
        HAND = HAND.concat(game.turn(cards))
    }

    

    const SET = hands.hands(HAND ,cards)
    const ENEMY_SET = hands.hands(ENEMY ,cards)

    if(SET == "HIGH_CARDS") HAND = HAND.concat(game.river(cards));

    
    const RESULT = calculation.calculation(SET, HAND, ENEMY, ENEMY_SET, cardsValue)
    if(RESULT == "TIE"){
        TIE = TIE + 1
        BALANCE = BALANCE + (BET / 2) 
    }else if(RESULT == "WIN"){
        WIN = WIN + 1
        BALANCE = BALANCE + (BET) 
        WIN_HANDS.push(HAND)
    }else{
        LOOSE = LOOSE + 1
        BALANCE = BALANCE - (BET) 
        LOOSE_HANDS.push(HAND)
    }
}
