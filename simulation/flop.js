
exports.flop = (cards) => {
    return cards.sort(() => Math.random() - Math.random()).slice(0, 2)
}

exports.full = (cards) => {
    return cards.sort(() => Math.random() - Math.random()).slice(0, 3)
}