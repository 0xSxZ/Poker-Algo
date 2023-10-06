
exports.flop = (cards) => {
    return cards.sort(() => Math.random() - Math.random()).slice(0, 2)
}

exports.three = (cards) => {
    return cards.sort(() => Math.random() - Math.random()).slice(0, 3)
}

exports.communityCards = (cards) => {
    return cards.sort(() => Math.random() - Math.random()).slice(0, 5)
}

exports.addOne = (cards) => {
    return cards.sort(() => Math.random() - Math.random()).slice(0, 1)
}