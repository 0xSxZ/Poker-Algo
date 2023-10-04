
exports.verifierGagnant = (hand1, hand2)  => {
    const { getCardValue } = require("../utils/converts")
    const { isRoyalFlush, isFourOfAKind, isStraightFlush, isFullHouse, detectPairTwoPairThreeOfAKind} = require("../calculation/combinaisons")
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

    if(detectPairTwoPairThreeOfAKind(hand1) == "Brelan" && detectPairTwoPairThreeOfAKind(hand2) != "Brelan"){
        return "Joueur 1 gagne avec un Brelan";
    }else if(detectPairTwoPairThreeOfAKind(hand1) == "Double Paire" && detectPairTwoPairThreeOfAKind(hand2) != "Double Paire"){
        return "Joueur 1 gagne avec une Double Paire";
    }else if(detectPairTwoPairThreeOfAKind(hand1) == "Paire" && detectPairTwoPairThreeOfAKind(hand2) != "Paire"){
        return "Joueur 1 gagne avec une Paire";
    }
    // ... Ajoutez d'autres conditions spéciales ici

    // Si aucune condition spéciale n'est remplie, comparez les valeurs des cartes
    for (let i = 0; i < values1.length; i++) {
        if (values1[i] > values2[i]) return "Joueur 1 gagne avec une Hauteur supérieure";
        if (values1[i] < values2[i]) return "Joueur 2 gagne avec une Hauteur supérieure";
    }

    return "Égalité avec une Hauteur égale";
}



