import React from 'react';
import FilterColumnByNumber from '../components/FilterColumnByNumber';
import FilterPlanetsByName from '../components/FilterPlanetsByName';
import PlanetsTable from '../components/PlanetsTable';

const StarWars = () => (
  <main>
    <FilterPlanetsByName />
    <FilterColumnByNumber />
    <PlanetsTable />
  </main>
);

export default StarWars;
