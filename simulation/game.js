
exports.flop = (cards) => {
    return cards.sort(() => Math.random() - Math.random()).slice(0, 2)
}

exports.turn = (cards) => {
    return cards.sort(() => Math.random() - Math.random()).slice(0, 1)
}

exports.river = (cards) => {
    return cards.sort(() => Math.random() - Math.random()).slice(0, 1)
}