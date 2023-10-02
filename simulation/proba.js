const { flop } = require("../simulation/flop");
const { full } = require("../simulation/flop");

const cards = ["2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S", "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS", "AC", "AD", "AH", "AS"]
const cardsValue = {
    "A":14,
    "K":13,
    "Q":12,
    "J":10,
    "10":9,
    "9":8,
    "8":7,
    "7":6,
    "6":5,
    "5":4,
    "4":3,
    "3":2,
    "2":1
}

function getPairs(values) {
    const pairs = [];
    const counts = {};

    for (const value of values) {
        if (counts[value]) {
            counts[value]++;
            if (counts[value] === 2) {
                pairs.push(value);
            }
        } else {
            counts[value] = 1;
        }
    }

    return pairs;
}

function isRoyalFlush(hand) {
    const royalFlush = ["10", "J", "Q", "K", "A"];
    const suits = new Set(hand.map(card => card.slice(-1))); // Obtient les couleurs

    if (suits.size === 1 && royalFlush.every(value => hand.includes(value + suits.values().next().value))) {
        return true;
    }
    return false;
}

// Fonction pour vérifier si une main est un Carré
function isFourOfAKind(hand) {
    const values = hand.map(getCardValue);
    for (const value of values) {
        if (values.filter(v => v === value).length === 4) {
            return true;
        }
    }
    return false;
}

// Fonction pour vérifier si une main est une Quinte Flush
function isStraightFlush(hand) {
    const suits = new Set(hand.map(card => card.slice(-1))); // Obtient les couleurs
    if (suits.size !== 1) return false; // Toutes les cartes doivent avoir la même couleur

    const values = hand.map(getCardValue).sort((a, b) => a - b);
    const minValue = values[0];
    const maxValue = values[4];

    return maxValue - minValue === 4;
}

// Fonction pour vérifier si une main est un Full
function isFullHouse(hand) {
    const values = hand.map(getCardValue);
    values.sort((a, b) => a - b);

    // Le Full doit avoir trois cartes de la même valeur suivies de deux cartes de la même valeur
    if ((values[0] === values[1] && values[1] === values[2] && values[3] === values[4]) ||
        (values[0] === values[1] && values[2] === values[3] && values[3] === values[4])) {
        return true;
    }
    return false;
}


// Fonction pour simuler une main de poker
function simulatePokerHand(deck, hand, communityCards) {
    const remainingDeck = deck.filter(card => !hand.includes(card) && !communityCards.includes(card));
    const remainingPlayers = 1; // Changez-le selon le nombre d'adversaires

    let wins = 0;
    const simulations = 60000; // Le nombre de simulations

    for (let i = 0; i < simulations; i++) {
        const shuffledDeck = shuffleDeck([...remainingDeck]); // Mélangez le deck restant
        const opponentHands = [];

        // Distribuez les cartes aux adversaires
        for (let j = 0; j < remainingPlayers; j++) {
            opponentHands.push([shuffledDeck.pop(), shuffledDeck.pop()]);

        }

        // Comparez vos cartes avec celles des adversaires
        const yourHand = hand.concat(full(cards));
        let yourWin = true;

        for (const opponentHand of opponentHands) {
            
            const opponentWin = determineWinner(yourHand, opponentHand.concat(full(cards)));
            if (!opponentWin.includes("Joueur 1 gagne")) {
                yourWin = false;
                break;
            }
        }

        if (yourWin == true) {
            wins++;
        }
    }

    return (wins / simulations) * 100;
}

// Fonction pour mélanger un deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function getCardValue(card){
    if(card.length > 2){
        return cardsValue[card.slice(0, -1)]
    }else{
        return cardsValue[card.split(card[1])[0]]
    }
}

// Fonction pour déterminer le gagnant entre deux mains (utilisée dans la simulation)
// Fonction pour déterminer le gagnant entre deux mains
function determineWinner(hand1, hand2) {
    const values1 = hand1.map(getCardValue);
    const values2 = hand2.map(getCardValue);

    // Triez les valeurs de chaque main par ordre décroissant
    values1.sort((a, b) => b - a);
    values2.sort((a, b) => b - a);

    // Vérifiez les combinaisons de mains spéciales en commençant par la plus forte
    if (isRoyalFlush(hand1)) return "Joueur 1 gagne avec une Quinte Flush Royale";
    if (isRoyalFlush(hand2)) return "Joueur 2 gagne avec une Quinte Flush Royale";

    if (isFourOfAKind(hand1)) return "Joueur 1 gagne avec un Carré";
    if (isFourOfAKind(hand2)) return "Joueur 2 gagne avec un Carré";

    // Vérifiez la Quinte Flush
    if (isStraightFlush(hand1) && isStraightFlush(hand2)) {
        if (values1[0] > values2[0]) return "Joueur 1 gagne avec une Quinte Flush";
        if (values1[0] < values2[0]) return "Joueur 2 gagne avec une Quinte Flush";
        return "Égalité avec une Quinte Flush";
    } else if (isStraightFlush(hand1)) {
        return "Joueur 1 gagne avec une Quinte Flush";
    } else if (isStraightFlush(hand2)) {
        return "Joueur 2 gagne avec une Quinte Flush";
    }

    const pairs1 = getPairs(values1);
    const pairs2 = getPairs(values2);
    if (pairs1.length === 1 && pairs2.length === 1) {
        // Une paire dans chaque main
        if (pairs1[0] > pairs2[0]) return "Joueur 1 gagne avec une Paire";
        if (pairs1[0] < pairs2[0]) return "Joueur 2 gagne avec une Paire";
        return "Égalité avec une Paire";
    } else if (pairs1.length === 1) {
        // Une paire dans la main du Joueur 1
        return "Joueur 1 gagne avec une Paire";
    } else if (pairs2.length === 1) {
        // Une paire dans la main du Joueur 2
        return "Joueur 2 gagne avec une Paire";
    }

    // Vérifiez le Full
    if (isFullHouse(hand1) && isFullHouse(hand2)) {
        if (values1[0] > values2[0]) return "Joueur 1 gagne avec un Full";
        if (values1[0] < values2[0]) return "Joueur 2 gagne avec un Full";
        return "Égalité avec un Full";
    } else if (isFullHouse(hand1)) {
        return "Joueur 1 gagne avec un Full";
    } else if (isFullHouse(hand2)) {
        return "Joueur 2 gagne avec un Full";
    }

    // ... Ajoutez d'autres conditions spéciales ici

    // Si aucune condition spéciale n'est remplie, comparez les valeurs des cartes
    for (let i = 0; i < values1.length; i++) {
        if (values1[i] > values2[i]) return "Joueur 1 gagne avec une Hauteur supérieure";
        if (values1[i] < values2[i]) return "Joueur 2 gagne avec une Hauteur supérieure";
    }

    return "Égalité avec une Hauteur égale";
}

exports.probability = (hand) => {
    
    var msg = "";
    var deci = "";
    const myHand = hand; 
    const communityCards = full(cards);
    
    const winningPercentage = simulatePokerHand(
        cards,
        myHand,
        communityCards
    );
    
    if(winningPercentage < 60){
        deci = "FOLD/CHECK"
        console.log(`[FOLD] Votre pourcentage de chance de gagner est de : ${winningPercentage}% `);
        msg =`[FOLD] Votre pourcentage de chance de gagner est de : ${winningPercentage}% `
    }else if(winningPercentage > 80){
        deci = "BET"
        msg =`[DOUBLE] Votre pourcentage de chance de gagner est de : ${winningPercentage}%`
        console.log(`[DOUBLE] Votre pourcentage de chance de gagner est de : ${winningPercentage}% `);
    }else{
        deci = "FOLLOW"
        msg = `[FOLLOW] Votre pourcentage de chance de gagner est de : ${winningPercentage}% `
        console.log(`[FOLLOW] Votre pourcentage de chance de gagner est de : ${winningPercentage}% `);
    }

    return { deciion : msg, percent:winningPercentage, deci: deci}

        
}
