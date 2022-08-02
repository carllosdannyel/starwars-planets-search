import { useEffect } from 'react';

const useFilterColumnByNumber = (API, array, callback) => {
  useEffect(() => {
    let filteredColumn = [...API];
    array.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        const biggerThen = filteredColumn
          .filter((item) => Number(item[column]) > Number(value));
        filteredColumn = [...biggerThen];
      }
      if (comparison === 'menor que') {
        const lessThan = filteredColumn
          .filter((item) => Number(item[column]) < Number(value));
        filteredColumn = [...lessThan];
      }
      if (comparison === 'igual a') {
        const equalTo = filteredColumn
          .filter((item) => Number(item[column]) === Number(value));
        filteredColumn = [...equalTo];
      }
    });
    callback(filteredColumn);
  }, [array]);
};

export default useFilterColumnByNumber;
