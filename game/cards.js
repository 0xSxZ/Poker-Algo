
exports.cards = ["2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S", "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS", "AC", "AD", "AH", "AS"]




exports.cardsValue = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11, 
    "10": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2
}





exports.WorstHands = [
    [ '2', '7' ],  [ '7', '2' ],  [ '2', '8' ],
    [ '8', '2' ],  [ '2', '9' ],  [ '9', '2' ],
    [ '2', '10' ], [ '10', '2' ], [ '3', '7' ],
    [ '7', '3' ],  [ '3', '8' ],  [ '8', '3' ],
    [ '3', '9' ],  [ '9', '3' ],  [ '3', '10' ],
    [ '10', '3' ], [ '4', '7' ],  [ '7', '4' ],
    [ '4', '8' ],  [ '8', '4' ],  [ '4', '9' ],
    [ '9', '4' ],  [ '4', '10' ], [ '10', '4' ],
    [ '5', '7' ],  [ '7', '5' ],  [ '5', '8' ],
    [ '8', '5' ],  [ '5', '9' ],  [ '9', '5' ],
    [ '5', '10' ], [ '10', '5' ], [ '6', '7' ],
    [ '7', '6' ],  [ '6', '8' ],  [ '8', '6' ],
    [ '6', '9' ],  [ '9', '6' ],  [ '6', '10' ],
    [ '10', '6' ]
]



exports.BestHands = [
    ["A", "A"],
    ["Q", "Q"],
    ["K", "K"],
    ["J", "J"],
    ["A", "K"],
    ["K", "A"],
    ["10", "10"],
    ["A","Q"],
    ["Q","A"],
    ["A","J"],
    ["J","A"],
    ["K","Q"],
    ["Q","K"],
    ["A", "10"],
    ["10", "A"],
    ["K", "J"],
    ["J", "K"],
    ["9", "9"],
    ["J", "Q"],
    ["Q", "J"],
]
