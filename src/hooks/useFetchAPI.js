import { useEffect } from 'react';

const useFetchAPI = (setAPI, setCloneAPI) => {
  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((Response) => Response.json())
      .then((results) => {
        const MENOSUM = -1;
        const resultsFilter = results
          .results.filter((planets) => delete planets.residents);
        const planetsSort = resultsFilter.sort((a, b) => {
          if (a.name < b.name) return MENOSUM;
          if (a.name > b.name) return 1;
          return 0;
        });
        setAPI(planetsSort);
        setCloneAPI(planetsSort);
      });
  }, []);
};

export default useFetchAPI;
