exports.percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
} 
 
exports.arraysEqual = (a, b) =>{
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  


exports.splitCards = (cardString) => {
    // Utilise une expression régulière pour faire la séparation
    const regex = /(\d{2}|[2-9TJQKA])([CDHS])/g;
    const matches = cardString.match(regex);

    if (matches) {
        return matches.map(match => {
            if (match.length === 2) {
                // Carte de 2 caractères (ex. "AH")
                return match;
            } else {
                // Carte de 3 caractères (ex. "10H")
                return `${match[0]} ${match[1]}`;
            }
        });
    } else {
        // Aucune carte valide trouvée
        return [];
    }
}

exports.randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}