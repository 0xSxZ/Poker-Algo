var _ = require('underscore');


const getRanks = (hand) => {
    const FINAL_ARR = []
    for(var i = 0; i < hand.length; i++){
        FINAL_ARR.push(hand[i].split("_")[1])
    }

    return FINAL_ARR
}
const equalsCheck = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

const CheckIfHand = (hand, list) => {
    for(var i = 0; i < list.length; i++){
        if(equalsCheck(list[i], hand)){
            return true
            break
        }
    }

    return false
}

exports.pick = (hand, cards) => { 
    const RANKS = getRanks(hand)
    
    const str = hand
    
    const WorstHands = [
        ["1", "1"],
        ["7", "2"],
        ["3", "2"],
        ["2", "2"],
        ["4","2"],
        ["5","3"]
    ]
    
    const MiddleHands = [
        ["10", "10"],
        ["9", "9"],
        ["8", "8"],
        ["7", "7"],
        ["6", "6"]
    ]

    const BestHands = [
        ["Ace", "Ace"],
        ["Queen", "Queen"],
        ["King", "King"],
        ["Jack", "Jack"],
        ["Ace", "King"],
        ["10", "10"],
        ["Ace","Queen"],
        ["Ace","Jack"],
        ["King","Queen"],
        ["Ace", "10"],
        ["King", "Jack"],
        ["Ace", "King"],
        ["9", "9"],
        ["Jack", "Queen"]
    ]

    
    if(CheckIfHand(RANKS, WorstHands) == true) return "FOLD"
    if(CheckIfHand(RANKS, BestHands) == true) return "RAISE"
    if(CheckIfHand(RANKS, MiddleHands) == true) return "STAY";

    return "FOLD"

    

    
}