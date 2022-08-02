import React, { useContext } from 'react';
import context from '../context/context';
import '../styles/ShowFilters.css';

const ShowFilters = () => {
  const { filterByNumericValues, onClickRemoveFilter } = useContext(context);

  return filterByNumericValues.map(({ column, comparison, value }) => (
    <div
      data-testid="filter"
      key={ column }
      className="filters-container"
    >
      <button
        type="button"
        onClick={ () => onClickRemoveFilter(column) }
      >
        X
      </button>
      {' '}
      <p>{`${column} ${comparison} ${value}`}</p>
    </div>
  ));
};

export default ShowFilters;
