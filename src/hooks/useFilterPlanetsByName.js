import { useEffect } from 'react';

const useFilterPlanetsByName = (API, callback, filterByName) => {
  useEffect(() => {
    const inputValue = filterByName.toLowerCase();
    const filterPlanetsByName = API.filter(({ name }) => name
      .toLowerCase().includes(inputValue));
    callback(filterPlanetsByName);
  }, [API, callback, filterByName]);
};

export default useFilterPlanetsByName;
