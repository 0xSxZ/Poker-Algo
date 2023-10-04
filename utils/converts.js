
exports.getTypes = (hand) => {
    const FINAL_ARR = []
    for(var i = 0; i < hand.length; i++){
        FINAL_ARR.push(hand[i].split("_")[0])
    }

    return FINAL_ARR
}

exports.getRanks = (hand) => {
    const FINAL_ARR = []
    for(var i = 0; i < hand.length; i++){
        FINAL_ARR.push(hand[i].split("_")[1])
    }

    return FINAL_ARR
}


// Fonction pour mélanger un deck
exports.shuffleDeck = (deck) =>{
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}


exports.getCardValue = (card) => {
    const { cardsValue } = require("../game/cards")
    if(card.length > 2){
        return cardsValue[card.split(card.split(card[1])[0] + card.split(card[1])[1])[0]]
    }else{
        return cardsValue[card.split(card[1])[0]]
    }
}