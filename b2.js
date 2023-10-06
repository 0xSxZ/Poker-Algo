const { flop,communityCards , three, addOne} = require("../game/generation");
const { cards, cardsValue, BestHands, WorstHands } = require("../game/cards")
const { verifierGagnant } = require("../calculation/winLoose")
const { arraysEqual, splitCards, randomNumber, percentage } = require("../utils/utils");
const { detectPairTwoPairThreeOfAKind, isRoyalFlush, isStraightFlush, isFourOfAKind } = require("../calculation/combinaisons");


const Players = 2;
const stratPlayed = [0,0,0] // Fold, Check, Double


function returnDec (FirstDecision, bet, pot, balance){
    
    var f;
    if(FirstDecision == "FOLD"){
        Folded = true
        f = "FOLD"
    }else if(FirstDecision == "BET"){
        f = "BET"
        bet = bet * randomNumber(3, 6);
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }else if(FirstDecision == "ALL_IN"){
        f = "ALL IN"
        bet = balance
        Player1_Allin = true
    }else{
        f = "FOLLOW"
        bet = bet + bet
        if(bet > balance){
            bet = balance
        }
        pot = pot + bet
    }

    return [f, pot, bet]

}

function returnRating(_cards){
    const c1 = _cards[0].slice(0, -1)
    const c2 = _cards[1].slice(0, -1)

    const rating = Number(cardsValue[c1]) + Number(cardsValue[c2])

    return rating
}

function PickFirstDecision(_cards, bet, balance){
    var BH = false;
    var WH = false;
    const c1 = _cards[0].slice(0, -1)
    const c2 = _cards[1].slice(0, -1)
    _cardss = [c1, c2]
    var AKQJ;
    var AKQJL = ["A", "K", "Q", "J"]
    if(AKQJL.includes(c1) || AKQJL.includes(c2)){
        AKQJ = true
    }else{
        AKQJ = false
    }

    
    for(var i = 0; i < BestHands.length; i++){
        if(arraysEqual(_cardss, BestHands[i])){
            BH = true
        }
    }
    
    
    /*for(var i = 0; i < WorstHands.length; i++){
        if(arraysEqual(_cardss, WorstHands[i])){
            WH = true
        }
    }*/

    

    if(BH == true){
        return "BET"
    }else if(WH == true){
        return "FOLD"
    }

    if(detectPairTwoPairThreeOfAKind(_cards) == "Paire" && cardsValue[c1] >= 10){
        return "BET"
    }else if(detectPairTwoPairThreeOfAKind(_cards) == "Paire" && bet <= balance / 3.5){
        return "FOLLOW"
    }else if(detectPairTwoPairThreeOfAKind(_cards) == "Paire" && bet >= balance / 3.5){
        return "FOLD"
    }
    
    if(bet >= balance / 4){
        return "FOLD"
    }

    if(returnRating(_cards) < 12 && AKQJ == false){
        return "FOLD"
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








function AppearsMore(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}


function percentCalculation(a, b){
    var c = (parseFloat(a)*parseFloat(b))/100;
    return parseFloat(c);
}
  
exports.runCFR = (hand, commu) => {
    var balance = 10000;
    var totalWin = 0
    var startingBalance = balance;

    var bet = 100;
    var increment = 100;

    var betWins = 0
    var followWins = 0
    var allinWins = 0

    var betLooses = 0;
    var followLooses = 0;
    var allinLooses = 0;
    
    var wins = 0;
    var played = 0;
    var played2 = 0
    var lost = 0;
    var FinalDecisions = []
    var isW;
    
    var PWSD;
    var PWSDECI;

    isW = play(hand, commu, balance, bet, undefined)
    
    console.log(isW)
    /*
    return {
        Decisions : PWSDECI,
        Percent:percentage(wins, played),
        FinalBalance: balance,
        startingBalance: startingBalance,
        dividedBalance: dividedBalance,
        playedGames:played + played2
    }
    */
}