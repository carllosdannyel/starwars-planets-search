import React, { useContext } from 'react';
import context from '../context/context';
import '../styles/FilterPlanetsByName.css';

const FilterPlanetsByName = () => {
  const { filterByName, setFilterByName } = useContext(context);

  return (
    <div className="input-search-container">
      <input
        id="search"
        data-testid="name-filter"
        value={ filterByName.name }
        onChange={ (e) => setFilterByName({ name: e.target.value }) }
        placeholder="Filter Planets By Name"
      />
    </div>
  );
};

export default FilterPlanetsByName;
