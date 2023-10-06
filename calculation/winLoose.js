
exports.verifierGagnant = (hand1, hand2)  => {
    
    const { getCardValue } = require("../utils/converts")
    const { isRoyalFlush, isFourOfAKind, isStraightFlush, isFullHouse, detectPairTwoPairThreeOfAKind} = require("../calculation/combinaisons")
    const { cardsValue } = require("../game/cards")
    const _ = require("underscore")
    const order = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"]

    const H1 = [hand1[0].slice(0, -1), hand1[1].slice(0, -1)]
    const H11 = [hand1[0].slice(0, -1), hand1[1].slice(0, -1)]

    const H2 = [hand2[0].slice(0, -1), hand2[1].slice(0, -1)]
    const H22 = [hand2[0].slice(0, -1), hand2[1].slice(0, -1)]

    
    var HC1
    var HC12

    var HC2
    var HC22

    if(hand2[2] && !hand2[6]){
        HC2 = [
            hand2[2].slice(0, -1),
            hand2[3].slice(0, -1)
        ]
        HC22 = [
            hand2[2].slice(0, -1),
            hand2[3].slice(0, -1)
        ]
    
    }else if(hand2[2] && hand2[6]){
        HC2 = [        
            hand2[2].slice(0, -1),
            hand2[3].slice(0, -1),
            hand2[4].slice(0, -1),
            hand2[5].slice(0, -1),
            hand2[6].slice(0, -1)
        ]
        HC22 = [        
            hand2[2].slice(0, -1),
            hand2[3].slice(0, -1),
            hand2[4].slice(0, -1),
            hand2[5].slice(0, -1),
            hand2[6].slice(0, -1)
        ]
        
    }


    if(hand1[2] && !hand1[6]){
        HC1 = [
            hand1[2].slice(0, -1),
            hand1[3].slice(0, -1)
        ]
        HC12 = [
            hand1[2].slice(0, -1),
            hand1[3].slice(0, -1)
        ]
    
    }else if(hand1[2] && hand1[6]){
        HC1 = [        
            hand1[2].slice(0, -1),
            hand1[3].slice(0, -1),
            hand1[4].slice(0, -1),
            hand1[5].slice(0, -1),
            hand1[6].slice(0, -1)
        ]
        HC12 = [        
            hand1[2].slice(0, -1),
            hand1[3].slice(0, -1),
            hand1[4].slice(0, -1),
            hand1[5].slice(0, -1),
            hand1[6].slice(0, -1)
        ]
        
    }

    hand1 = H1.concat(HC1)
    var Highest = 14;
    if(HC2[0]){
        for(var i = 0; i<HC2.length; i++){
            if(order.indexOf(HC2[i]) < Highest){
                Highest = order.indexOf(HC2[i])
            }
            
        }
    }


    

    if(order.indexOf(H1[0]) < order.indexOf(H1[1])){
        H1[0] = H1[0]
    }else{
        H1[0] = H1[1]
        H1[1] = H11[0]
    }

    if(order.indexOf(H2[0]) < order.indexOf(H2[1])){
        H2[0] = H2[0]
    }else{
        H2[0] = H2[1]
        H2[1] = H22[0]
    }
    
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



    if(detectPairTwoPairThreeOfAKind(hand1) == "Brelan" && detectPairTwoPairThreeOfAKind(hand2) == "Brelan"){
        if(cardsValue[H1[0]] > cardsValue[H2[0]] && cardsValue[order[Highest]] < cardsValue[H1[0]]){
            return "Joueur 1 gagne avec un Brelan"
        }else{
            return "Joueur 2 gagne avec un Brelan"
        }
    }

    if(detectPairTwoPairThreeOfAKind(hand1) == "Double Paire" && detectPairTwoPairThreeOfAKind(hand2) == "Double Paire"){
        if(cardsValue[H1[0]] > cardsValue[H2[0]]){
            return "Joueur 1 gagne avec une Double Paire"
        }else{
            return "Joueur 2 gagne avec une Double Paire"
        }
    }

    if(detectPairTwoPairThreeOfAKind(hand1) == "Paire" && detectPairTwoPairThreeOfAKind(hand2) == "Paire"){
        if(cardsValue[H1[0]] > cardsValue[H2[0]]){
            return "Joueur 1 gagne avec une Paire"
        }else{
            //console.log("Joueur 2 gagne avec une Paire",cardsValue[H1[0]], cardsValue[H2[0]], H1[0], H2[0])
            return "Joueur 2 gagne avec une Paire"
        }
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



