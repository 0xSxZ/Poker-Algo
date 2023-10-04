
function evaluerMain(cartes) {
    // Vous pouvez implémenter une logique plus sophistiquée ici pour évaluer la force de la main.
    // Pour cet exemple, nous attribuons simplement une valeur basée sur les deux premières cartes.

    const valeursCartes = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14,
    };
    const carte1Valeur = valeursCartes[cartes[0].split('_')[1][0]];
    const carte2Valeur = valeursCartes[cartes[1].split('_')[1][0]];

    // Calcul de la valeur de la main (plus la valeur est élevée, plus la main est forte)
    const valeurMain = carte1Valeur + carte2Valeur

    return valeurMain;
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


function urgenceFunc(decision, last, isLastLoose, urgence){
        while(true){
            decision = urgence[Math.floor(Math.random()*urgence.length)].toLowerCase();

            if(last){
                if((decision == last) == true && isLastLoose == true){
                    continue
                }else{
                    break
                }
            }else{
                break
            }
        }

    return decision
}

exports.prendreDecision = (cartes, last, isLastLoose, LastsArr) => {
    const allEqual = arr => arr.every( v => v === arr[0] )


    var Double = true;
    var Relance = true;
    var SeCoucher = true;
    var Suivre = true;
    var isAllEqual = false;

    var decision;
    const urgence = ["Se coucher", "Double", "Relancer", "Suivre"]

    const combinaisons = require("../calculation/combinaisons")
    const converts = require("../utils/converts");
    const RANKS = converts.getRanks(cartes)
    const BestHands = require("../utils/cards").BestHands
    const WorstHands = require("../utils/cards").WorstHands
    const combinaison = combinaisons.verifierCombinaison(cartes);
    const valeurMain = evaluerMain(cartes);

    if(allEqual(LastsArr) == true){
        isAllEqual = true
    }

    if(last && isLastLoose){
        if(last == "double" && isLastLoose == true && isAllEqual == false && LastsArr.includes("Double") == false){
            Double = false;
        }else if(last == "se coucher" && isLastLoose == true && isAllEqual == false && LastsArr.includes("Se coucher") == false){
            SeCoucher = false;
        }else if(last == "relancer" == isLastLoose == true && isAllEqual == false && LastsArr.includes("Relancer") == false){
            Relance = false;
        }else if(last == "suivre" == isLastLoose == true && isAllEqual == false && LastsArr.includes("Suivre") == false){
            Suivre = false;
        }
    }


    if(CheckIfHand(RANKS, BestHands) == true && Double != false) return "Double";
    if(CheckIfHand(RANKS, WorstHands) == true && SeCoucher != false) return "Se coucher";
    

    if(combinaison == "Quinte flush" && Double != false){
        decision = "Double";
    }else if(combinaison == "Quinte flush royale" && Double != false){
        decision = "Double";
    }else if(combinaison == "Carré" && Double != false){
        decision = "Double";
    }else if(combinaison == "Full" && Double != false){
        decision = "Double";
    }else if(combinaison == "Brelan" && Relance != false){
        decision = "Relancer";
    }else if(combinaison == "Double Paire" && Relance != false){
        decision = "Relancer";
    }else if(combinaison == "Paire" && Relance != false){
        decision = "Relancer";
    }else if(combinaison == "Couleur" && Relance != false){
        decision = "Relancer";
    }

    if(Suivre != true){
        decision = "Suivre";
    }

    if(!decision && isAllEqual == false && LastsArr.includes("No Decisions") == false ){
        decision = "No Decisions"
    }

    if(!decision){
        decision = urgenceFunc(decision, last, isLastLoose, urgence)
    }
    return decision

}



