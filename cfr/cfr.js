const { flop,communityCards , three, addOne} = require("../game/generation");
const { cards, cardsValue, BestHands, WorstHands } = require("../game/cards")
const { verifierGagnant } = require("../calculation/winLoose")
const { arraysEqual, splitCards, randomNumber, percentage } = require("../utils/utils");
const { detectPairTwoPairThreeOfAKind, isRoyalFlush, isStraightFlush, isFourOfAKind, detectAll } = require("../calculation/combinaisons");


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



function play(_cards, commu, balance, bet, deci){
    // TEMPORAIRE
    balance = 1000;
    bet = 30;
    
    var _decisions = []

    var pot = bet * Players


    var th = three(cards);
    var fl = flop(cards);
    
    enemyCards = flop(cards)
    enemyCards = enemyCards.concat(commu)
    _cards = _cards.concat(commu)

    for(var i = 0; i < 10; i++){
        if(_cards.length >= 7){
            break
        }
        var ao = addOne(cards);
        _cards = _cards.concat(ao)
        enemyCards = enemyCards.concat(ao)
    }

    

    var EnemyFolded = false;
    var Folded = false;


    var Player1_Allin = false;
    var Player2_Allin = false;

    var FirstDecision;
    var SecDecision;
    var ThDecision;

    if(deci == undefined || deci == ""){
        FirstDecision = PickFirstDecision(_cards, bet, balance);
    }else{
        FirstDecision = deci;
    }
    
    const FirstEnemyDecision = PickFirstDecision(enemyCards, bet, balance)



    var Dec = returnDec(FirstDecision, bet, pot, balance)
    bet = Dec[2]
    pot = Dec[1]
    _decisions.push(Dec[0])


    var Dec2 = returnDec(FirstEnemyDecision, bet, pot, balance)
    
    pot = Dec2[1]
    bet = Dec[2]
    
    
    if(_cards.length <= 4){
        _cards = _cards.concat(th)
    }


    if(deci == undefined || deci == ""){
        SecDecision = PickSecondDecision(_cards, bet, balance);
    }else{
        SecDecision = deci;
    }
    
    const SecEnemyDecision = PickSecondDecision(enemyCards)
    
    var Dec = returnDec(SecDecision, bet, pot, balance)
    bet = Dec[2]
    pot = Dec[1]
    _decisions.push(Dec[0])

    
    var Dec2 = returnDec(SecEnemyDecision, bet, pot, balance)
    pot = Dec2[1]
    bet = Dec[2]



    if(deci == undefined || deci == ""){
        ThDecision = PickSecondDecision(_cards, bet, balance);
    }else{
        ThDecision = deci;
    }

    const ThEnemyDecision = PickSecondDecision(enemyCards)
    
    
    var Dec = returnDec(ThDecision, bet, pot, balance)
    bet = Dec[2]
    pot = Dec[1]
    _decisions.push(Dec[0])

    
    var Dec2 = returnDec(ThEnemyDecision, bet, pot, balance)
    pot = Dec2[1]
    bet = Dec[2]

    //console.log(_cards)
    if(pot > balance * 2) pot = balance * 2;
    if(_decisions.includes("FOLD")) Folded = true;
    if(Folded == true) return [false, _decisions];
    
    const IsWin = verifierGagnant(_cards, enemyCards)
    //console.log(IsWin, _cards, enemyCards)
    const dA = detectAll(_cards)
    if(dA == "ROYAL FLUSH"){
        _decisions = ["ALL IN", "ALL IN", "ALL IN"]
    }
    if(IsWin.includes("Joueur 1 gagne")){
        return [true, _decisions, pot, bet, dA]
    }else{
        return [false, _decisions, pot, bet, dA]
    }
    
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

    var combi;
    var profit = 0
    var TotalGames = 2500;
    var balance = 10000;
    var totalWin = 0
    var startingBalance = balance;

    var bet = 100;
    var increment = 100;

    var betWins = 0
    var followWins = 0
    var allinWins = 0

    var betBalance = 10000;
    var betLooses = 0;
    var betProfit = 0;
    var followBalance = 10000;
    var followLooses = 0;
    var followProfit = 0;
    var allinLooses = 0;

    var foldBalance = 10000;
    
    var wins = 0;
    var played = 0;
    var played2 = 0
    var lost = 0;
    var FinalDecisions = []
    var isW;
    
    var PWSD;
    var PWSDECI;

    for(var i = 0; i< TotalGames - 1; i++){

        isW = play(hand, commu, betBalance, bet, "BET") // return [true, _decisions, pot, bet]
        
        if(isW[0] == true){ 
            betWins = betWins + 1
            betBalance = betBalance - isW[3] + isW[2]
            betProfit = betProfit + isW[2] - isW[3] 
        }else{
            betBalance = betBalance - isW[3]
            betProfit = betProfit - isW[3]
        }
        
        combi = isW[4]
        played = played + 1

    }

    for(var i = 0; i< TotalGames - 1; i++){

        isW = play(hand, commu, betBalance, bet, "FOLLOW") // return [true, _decisions, pot, bet]
        
        if(isW[0] == true){ 
            followWins = followWins + 1
            followBalance = followBalance - isW[3] + isW[2]
            followProfit = followProfit + isW[2] - isW[3] 
        }else{
            followBalance = followBalance - isW[3]
            followProfit = followProfit - isW[3]
        }

        played = played + 1
        combi = isW[4]
    }


    
    //console.log(followProfit / 2500, betProfit / 2500)
    
    if(followProfit / 2500 > betProfit / 2500){
        PWSDECI = "FOLLOW"
        profit = followProfit / 2500
        balance = followBalance 
    }else if(followProfit / 2500 < betProfit / 2500){
        PWSDECI = "BET"
        profit = betProfit / 2500
        balance = betBalance
    }


    if(followProfit / 2500 < 800 && betProfit / 2500 < 800){
        PWSDECI = "FOLD"
        profit = 0
        startingBalance = 0
        balance = 0
    }

    bw = 0;
    if(PWSDECI == "BET"){
        bw = betWins
    }else if(PWSDECI == "FOLLOW"){
        bw = followWins
    }

    
    if(percentage(bw, TotalGames) > 90) {
        PWSDECI = "BET"
    }
    

    return {
        Decisions : PWSDECI,
        Percent:percentage(bw, TotalGames),
        FinalBalance: balance,
        startingBalance: startingBalance,
        dividedBalance: startingBalance + profit ,
        playedGames:TotalGames * 2,
        combinaison:combi
    }
    
}