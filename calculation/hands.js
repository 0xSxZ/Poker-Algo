const equalHand = (arr) => {
    return new Set(arr).size == 1;
}

const getTypes = (hand) => {
    const FINAL_ARR = []
    for(var i = 0; i < hand.length; i++){
        FINAL_ARR.push(hand[i].split("_")[0])
    }

    return FINAL_ARR
}

const Exacts = (R_HAND) => {
    uniqueCount = R_HAND;
    var b = [];
    var count = 0;
    uniqueCount.forEach(function(i) { if(b.includes(i)){
        count++
    }else{
        b.push(i)
    }
    });
    return count
}

const getRanks = (hand) => {
    const FINAL_ARR = []
    for(var i = 0; i < hand.length; i++){
        FINAL_ARR.push(hand[i].split("_")[1])
    }

    return FINAL_ARR
}


function multipleInArray(arr, values) {
    return values.every(value => {
      return arr.includes(value);
    });
  }
  

const check_duplicate_in_array=(input_array)=>{
    const duplicates =input_array.filter((item, index) =>input_array.indexOf(item) !== index);
    return Array.from(new Set(duplicates));
}




exports.hands = (hand, cards) => {

    const N_HAND = getTypes(hand)
    const R_HAND = getRanks(hand);


    if(R_HAND == ["Ace", "Ace", "Ace", "Ace"]){
        return "AS_SQUARE"
    }

    if(Exacts(R_HAND) == 3){
        return "SQUARE"
    }



    if(Exacts(R_HAND) == 3){
        return "3_OF_A_KIND"
    }

    if(multipleInArray(N_HAND, ["Heart", "Spade", "Diamond", "Club"])){
        return "FOUR_SUITE"
    }

    if(equalHand(N_HAND)){
        return "COLOR";
    }

    
    if(equalHand(R_HAND)){
        return "5_OF_A_KIND";
    }

    if(multipleInArray(N_HAND, ["Heart", "Spade", "Diamond", "Club"]) && hand.length == 5){
        return "FLUSH"
    }

    if(
        multipleInArray(hand, ["Heart_Ace", "Heart_King", "Heart_Queen", "Heart_Jack", "Heart_10"]) ||
        multipleInArray(hand, ["Spade_Ace", "Spade_King", "Spade_Queen", "Spade_Jack", "Spade_10"]) ||
        multipleInArray(hand, ["Diamond_Ace", "Diamond_King", "Diamond_Queen", "Diamond_Jack", "Diamond_10", "Diamond_9", "Diamond_8", "Diamond_7", "Diamond_6", "Diamond_5", "Diamond_4","Diamond_3" ,"Diamond_2"]) ||
        multipleInArray(hand, ["Club_Ace", "Club_King", "Club_Queen", "Club_Jack","Club_10","Club_9","Club_8","Club_7","Club_6","Club_5","Club_4","Club_3" ,"Club_2"])
    ){
        return "ROYAL_FLUSH"
    }



    if(check_duplicate_in_array(hand) && check_duplicate_in_array(hand).length > 0){
        return `${(check_duplicate_in_array(hand).length) / 1}_PAIR`
    }

    if(Exacts(R_HAND) == 3 && check_duplicate_in_array(hand) && check_duplicate_in_array(hand).length > 0){
        return "FULL"
    }

    return "HIGH_CARDS";

}