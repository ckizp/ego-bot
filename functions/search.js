function search(word, dictionary) {
  let minDistance = Number.MAX_VALUE;
  let result = '';
  for (let i = 0; i < dictionary.length; i++) {
    const distance = levenshteinDistance(word, dictionary[i]);
    if (distance < minDistance) {
      minDistance = distance;
      result = dictionary[i];
    }
  }
  return result;
}

function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let matrix = [];

  // Initialisation de la première ligne et de la première colonne de la matrice
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Remplissage de la matrice
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // suppression
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

module.exports = { search }
