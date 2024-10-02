/**
 * Hook para converter um objeto para um array
 * (e.g. axios retornando um objeto ao invés de um array)
 */
const convertObjectToArray = (object) => {
  const dataResponse = [];
  Object.keys(object)
    .forEach((key) => dataResponse.push({ ...object[key] }));
  return dataResponse;
};

export default convertObjectToArray;