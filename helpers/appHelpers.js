// Obtener la sumatoria de los arreglos
const getArrayTotal = (array) => {
  return array.reduce((acc, cur) => acc + cur, 0);
};

module.exports = { getArrayTotal };
