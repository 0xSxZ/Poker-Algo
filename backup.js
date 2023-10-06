

function PlayWithTable(_cards, commu){
    
    var balance = 1000;
    var pot = 30 * Players
    var bet = 30;

    var Folded = false
    var _decisions = []
    var Player1_Allin = false;
    var Player2_Allin = false
    
    if(commu.length == 4){
        commu = commu.concat(addOne(cards))
        _cards = _cards.concat(commu)
        var enemyCards = flop(cards)
        enemyCards = enemyCards.concat(commu)
    }else if(commu.length == 3){
        var Flop2 = flop(cards)
        commu = commu.concat(Flop2)
        _cards = _cards.concat(commu)
        var enemyCards = flop(cards)
        enemyCards = enemyCards.concat(commu)
    }else if(commu.length == 5){
        _cards = _cards.concat(commu)
        var enemyCards = flop(cards)
        enemyCards = enemyCards.concat(commu)
        
    }


    
    const SecDecision = PickSecondDecision(_cards)
    const SecEnemyDecision = PickSecondDecision(enemyCards)

    

    if(SecDecision == "FOLD" && Player1_Allin == false){
        Folded = true
        _decisions.push("FOLD")
    }else if(SecDecision == "BET" && Player1_Allin == false){
        _decisions.push("BET")
        bet = bet * randomNumber(3, 6);
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }else if(SecDecision == "ALL_IN"){
        _decisions.push("ALL IN")
        bet = balance
        Player1_Allin = true
    }else if(Player1_Allin == false){
        _decisions.push("FOLLOW")
        bet = bet + bet
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }
    

    if(commu.length < 4){
        _cards = _cards.concat(flop(cards))
        enemyCards = enemyCards.concat(flop(cards))
        
        const ThDecision = PickSecondDecision(_cards)
        const ThEnemyDecision = PickSecondDecision(enemyCards)
        
        if(ThDecision == "FOLD" && Player1_Allin == false){
            Folded = true
            _decisions.push("FOLD")
        }else if(ThDecision == "BET" && Player1_Allin == false){
            _decisions.push("BET")
            bet = bet * randomNumber(3, 6);
            if(bet > balance){
                bet = balance
            }
            pot = pot + bet
        }else if(ThDecision == "ALL_IN"){
            _decisions.push("ALL IN")
            bet = balance
            Player1_Allin = true
        }else if(Player1_Allin == false){
            _decisions.push("FOLLOW")
            bet = bet + bet
            if(bet > balance){
                bet = balance
            }
            pot = pot + bet
        }
        const IsWin = verifierGagnant(_cards, enemyCards)
        
        if(Folded == true) return [false, _decisions]
        
        if(IsWin.includes("Joueur 1 gagne")){
            return [true, _decisions]
        }else{
            return [false, _decisions]
        }

    }else{
        const IsWin = verifierGagnant(_cards, enemyCards)
        if(Folded == true) return [false, _decisions]
        
        if(IsWin.includes("Joueur 1 gagne")){
            return [true, _decisions]
        }else{
            return [false, _decisions]
        }
    }

}





function PlayWithSameDecision(_cards, commu, deci, balance, bet, increment){

    var Player1_Allin = false;
    var Player2_Allin = false;

    if(commu.length == 4){
        commu = commu.concat(addOne(cards))
        _cards = _cards.concat(commu)
        var enemyCards = flop(cards)
        enemyCards = enemyCards.concat(commu)
    }else if(commu.length == 3){
        var Flop2 = flop(cards)
        commu = commu.concat(Flop2)
        _cards = _cards.concat(commu)
        var enemyCards = flop(cards)
        enemyCards = enemyCards.concat(commu)
    }else if(commu.length == 5){
        _cards = _cards.concat(commu)
        var enemyCards = flop(cards)
        enemyCards = enemyCards.concat(commu) 
    }

    

    var th = three(cards);
    var fl = flop(cards);

    var pot = increment;

    //console.log(_cards, commu, deci, balance, bet, increment)

    var enemyCards = flop(cards)


    const FirstDecision = deci;
    const FirstEnemyDecision = PickFirstDecision(enemyCards, bet, balance)

    if(FirstDecision == "BET"){
        bet = bet * randomNumber(3, 6);
        if(bet > balance){
            bet = balance
        }
        pot = pot + (increment * 2)
        increment = increment * 2
    }else if(FirstDecision == "ALL_IN"){
        bet = balance
        increment = balance
        Player1_Allin = true
    }else{
        bet = bet + bet
        if(bet > balance){
            bet = balance
        }
        pot = pot + increment
    }


    
        
    if(FirstEnemyDecision == "FOLD"){
        EnemyFolded = true;
    }else if(FirstEnemyDecision == "BET"){
        bet = bet * randomNumber(3, 6);
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }else if(FirstEnemyDecision == "ALL_IN"){
        bet = balance
        Player2_Allin = true
    }else{
        bet = bet + bet
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }



    enemyCards = enemyCards.concat(th)
    _cards = _cards.concat(th)

    const SecDecision = deci
    const SecEnemyDecision = PickSecondDecision(enemyCards)

    if(SecDecision == "BET"){
        bet = bet * randomNumber(3, 6);
        if(bet > balance){
            bet = balance
        }
        pot = pot + (increment * 2)
        increment = increment * 2
    }else if(SecDecision == "ALL_IN"){
        bet = balance
        increment = balance
        Player1_Allin = true
    }else{
        bet = bet + bet
        if(bet > balance){
            bet = balance
        }
        pot = pot + increment
    }

    
    if(SecEnemyDecision == "FOLD"  && Player2_Allin == false){
        EnemyFolded = true;
    }else if(SecEnemyDecision == "BET"  && Player2_Allin == false){
        bet = bet * randomNumber(3, 6);
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }else if(SecEnemyDecision == "ALL_IN"){
        bet = balance
        Player2_Allin = true
    }else if( Player2_Allin == false){
        bet = bet + bet
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }



     
    const ThDecision = deci
    const ThEnemyDecision = PickSecondDecision(enemyCards)
    const THH = flop(cards)
    enemyCards = enemyCards.concat(THH)
    _cards = _cards.concat(THH)
    
    if(ThDecision == "FOLD"  && Player2_Allin == false){
        EnemyFolded = true;
    }else if(ThDecision == "BET"  && Player2_Allin == false){
        bet = bet * randomNumber(3, 6);
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }else if(ThDecision == "ALL_IN"){
        bet = balance
        Player2_Allin = true
    }else if( Player2_Allin == false){
        bet = bet + bet
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }


        
    if(ThEnemyDecision == "FOLD"  && Player2_Allin == false){
        EnemyFolded = true;
    }else if(ThEnemyDecision == "BET"  && Player2_Allin == false){
        bet = bet * randomNumber(3, 6);
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }else if(ThEnemyDecision == "ALL_IN"){
        bet = balance
        Player2_Allin = true
    }else if(Player2_Allin == false){
        bet = bet + bet
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }

    const IsWin = verifierGagnant(_cards, enemyCards)
    if(IsWin.includes("Joueur 1 gagne")){
        return [true,pot, bet]
    }else{
        return [false, pot, bet]
    }
}





for(var i = 0; i<= 2000 - 1; i++){
    if(commu == [] || commu == undefined || commu.length < 2){
        isW = play(hand, commu)
    }else{
        isW = PlayWithTable(hand, commu)
    }
    

    if(FinalDecisions.length < 3){
        FinalDecisions.push(isW[1][FinalDecisions.length])
    }else{
        if(FinalDecisions[0] != isW[1][0]){
            FinalDecisions[0] = isW[1][0]
        }            
        if(FinalDecisions[1] != isW[1][1]){
            FinalDecisions[1] = isW[1][1]
        }
        if(FinalDecisions[2] != isW[1][2]){
            FinalDecisions[2] = isW[1][2]
        }
    }
    
    const Ap = AppearsMore(FinalDecisions)

    if(isW[0] == true){
        if(Ap == "BET"){
            betWins = betWins + 1
            wins++
        }else if(Ap == "FOLLOW"){
            followWins = followWins + 1
            wins++
        }else if(Ap == "ALL IN"){
            allinWins = allinWins + 1
            wins++ 
        }
        
    }else{
        if(Ap == "BET"){
            betLooses = betLooses + 1
            lost++
        }else if(Ap == "FOLLOW"){
            followLooses = followLooses + 1
            lost++
        }else if(Ap == "ALL IN"){
            allinLooses = allinLooses + 1
            lost++
        }
        
    }

    played++
}
played2 = played


if(FinalDecisions[0] == "FOLD"){
    FinalDecisions = ["FOLD", "FOLD", "FOLD"]
}


if(FinalDecisions != ["FOLD", "FOLD", "FOLD"]){
    wins = 0
    played = 0
    if(followWins > betWins && followWins > allinWins){
        PWSDECI = "FOLLOW"
    }else if(betWins > followWins && betWins > allinWins){
        PWSDECI = "BET"
    }else if(allinWins > followWins && allinWins > betWins ){
        PWSDECI = "ALL_IN"
    }
    
    for(var i = 0; i<= 2500 - 1; i++){
        PWSD = PlayWithSameDecision(hand, commu, PWSDECI, balance, bet, increment)
        if(PWSD[0] == false){
            balance = balance - PWSD[2]
            totalWin = totalWin -  PWSD[2]
        }else if(PWSD[0] == true){
            wins = wins + 1
            totalWin = totalWin + PWSD[1]
            balance = (balance - PWSD[2]) +  PWSD[1]
        }
        
        played = played +1
        
        //console.log("POT : ", PWSD[1], "BET : ", PWSD[2], " WIN : ", PWSD[0])
    }

    
}


if(balance > startingBalance){
    FinalDecisions = PWSDECI 
}



if(balance == 0){
    PWSDECI = "FOLD"
}

if(percentage(wins, played) < 60){
    PWSDECI = "FOLD"
}

if(balance < startingBalance){
    PWSDECI = "FOLD"
}


var dividedBalance = startingBalance + (balance / played)
if(dividedBalance <= startingBalance + 100){
    dividedBalance = 0
    PWSDECI = "FOLD"
}