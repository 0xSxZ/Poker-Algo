const { flop,communityCards , three} = require("../game/generation");
const { cards, cardsValue, BestHands, WorstHands } = require("../game/cards")
const { verifierGagnant } = require("../calculation/winLoose")
const { arraysEqual, splitCards, randomNumber, percentage } = require("../utils/utils");
const { detectPairTwoPairThreeOfAKind, isRoyalFlush, isStraightFlush, isFourOfAKind } = require("../calculation/combinaisons");


const Players = 2;
const stratPlayed = [0,0,0] // Fold, Check, Double


function PickFirstDecision(_cards){
    var BH = false;
    var WH = false;

    const c1 = _cards[0].slice(0, -1)
    const c2 = _cards[1].slice(0, -1)
    _cardss = [c1, c2]

    for(var i = 0; i < BestHands.length; i++){
        if(arraysEqual(_cardss, BestHands[i])){
            BH = true
        }
    }
    for(var i = 0; i < WorstHands.length; i++){
        if(arraysEqual(_cardss, WorstHands[i])){
            WH = true
        }
    }

    

    if(BH == true){
        return "BET"
    }else if(WH == true){
        return "FOLD"
    }

    if(detectPairTwoPairThreeOfAKind(_cards) == "Paire" && cardsValue[c1] >= 10){
        return "BET"
    }

    
    return "FOLLOW"
}


function PickSecondDecision(_cards, bet){
    
    if(isRoyalFlush(_cards)){
        return "ALL_IN"
    }
    if(isStraightFlush(_cards)){
        return "ALL_IN"
    }

    if(isFourOfAKind(_cards)){
        return "BET"
    }

    if(isFourOfAKind(_cards)){
        return "BET"
    }


    if(detectPairTwoPairThreeOfAKind(_cards) == "Paire" && bet < 1250){
        return "FOLLOW"
    }else if(detectPairTwoPairThreeOfAKind(_cards) == "Double Paire" || detectPairTwoPairThreeOfAKind(_cards) == "Brelan"){
        return "BET"
    }

    if(bet > 1250){
        return "FOLD"
    }

    return "FOLLOW"

}


function play(_cards){

    const _decisions = []
    var balance = 1000;
    var pot = 30 * Players
    var bet = 30;

    
    const th = three(cards)
    const fl = flop(cards)
    const commuCards = th.concat(fl)

    var EnemyFolded = false;
    var Folded = false;

    var enemyCards = flop(cards)

    var Player1_Allin = false;
    var Player2_Allin = false;

    const FirstDecision = PickFirstDecision(_cards)
    const FirstEnemyDecision = PickFirstDecision(enemyCards)
    
    
    if(FirstDecision == "FOLD"){
        Folded = true
        _decisions.push("FOLD")
    }else if(FirstDecision == "BET"){
        _decisions.push("BET")
        bet = bet * randomNumber(3, 6);
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }else if(FirstDecision == "ALL_IN"){
        _decisions.push("ALL IN")
        bet = balance
        Player1_Allin = true
    }else{
        _decisions.push("FOLLOW")
        bet = bet + bet
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
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

    // Second phase (2 + 3 cards)

    enemyCards = enemyCards.concat(th)
    _cards = _cards.concat(th)

    
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

    


    enemyCards = enemyCards.concat(flop(cards))
    _cards = _cards.concat(flop(cards))

        
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
    if(Folded == true) return [false, _decisions]
    
    if(IsWin.includes("Joueur 1 gagne")){
        return [true, _decisions]
    }else{
        return [false, _decisions]
    }
    
}

function percentCalculation(a, b){
    var c = (parseFloat(a)*parseFloat(b))/100;
    return parseFloat(c);
  }
  
exports.runCFR = (hand) => {
    var wins = 0;
    var played = 0;
    var lost = 0;
    var FinalDecisions = []

    for(var i = 0; i<= 1500; i++){

        const isW = play(hand)


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

        if(isW[0] == true){
            wins++
        }else{
            lost++
        }

        played++
    }
    
    if(FinalDecisions[0] == "FOLD"){
        FinalDecisions = "FOLD"
    }
    
    return {
        Decisions : FinalDecisions,
        Percent:percentage(wins, played)
    }
    
}