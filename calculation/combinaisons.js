
const { getCardValue } = require("../utils/converts")

exports.isRoyalFlush = (hand) => {
    const royalFlush = ["10", "J", "Q", "K", "A"];
    const suits = new Set(hand.map(card => card.slice(-1))); // Obtient les couleurs

    if (suits.size === 1 && royalFlush.every(value => hand.includes(value + suits.values().next().value))) {
        return true;
    }
    return false;
}

// Fonction pour vérifier si une main est un Carré
exports.isFourOfAKind = (hand) => {
    const values = hand.map(getCardValue);
    for (const value of values) {
        if (values.filter(v => v === value).length === 4) {
            return true;
        }
    }
    return false;
}

// Fonction pour vérifier si une main est une Quinte Flush
exports.isStraightFlush = (hand) => {
    const suits = new Set(hand.map(card => card.slice(-1))); // Obtient les couleurs
    if (suits.size !== 1) return false; // Toutes les cartes doivent avoir la même couleur

    const values = hand.map(getCardValue).sort((a, b) => a - b);
    const minValue = values[0];
    const maxValue = values[4];

    return maxValue - minValue === 4;
}

// Fonction pour vérifier si une main est un Full
exports.isFullHouse = (hand) => {
    const values = hand.map(getCardValue);
    values.sort((a, b) => a - b);

    // Le Full doit avoir trois cartes de la même valeur suivies de deux cartes de la même valeur
    if ((values[0] === values[1] && values[1] === values[2] && values[3] === values[4]) ||
        (values[0] === values[1] && values[2] === values[3] && values[3] === values[4])) {
        return true;
    }
    return false;
}


exports.detectPairTwoPairThreeOfAKind = (cards) => {
    const cardCount = {};
    
    // Compter le nombre d'occurrences de chaque valeur de carte
    for (const card of cards) {
        const cardValue = card.charAt(0);
        if (cardCount[cardValue]) {
            cardCount[cardValue]++;
        } else {
            cardCount[cardValue] = 1;
        }
    }
    
    let hasPair = false;
    let hasTwoPair = false;
    let hasThreeOfAKind = false;
    
    // Parcourir les comptes de cartes
    for (const value in cardCount) {
        if (cardCount[value] === 2) {
            if (hasPair) {
                hasTwoPair = true;
            } else {
                hasPair = true;
            }
        } else if (cardCount[value] === 3) {
            hasThreeOfAKind = true;
        }
    }
    
    if (hasThreeOfAKind) {
        return "Brelan";
    } else if (hasTwoPair) {
        return "Double Paire";
    } else if (hasPair) {
        return "Paire";
    } else {
        return "Aucune combinaison";
    }
}
