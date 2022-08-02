import React, { useContext } from 'react';
import context from '../context/context';
import '../styles/FilterColumnByNumber.css';
import ShowFilters from './ShowFilters';

const FilterColumnByNumber = () => {
  const {
    filterColumn,
    setFilterColumn,
    onClickFilterColumnByNumber,
    optionsFilterByNumber,
    comparison,
    onClickRemoveAllFilters,
    optionSortByNumber,
    order,
    setOrder,
    onClickSortFilters,
  } = useContext(context);

  return (
    <div>
      <form className="forms-container">
        <select
          onChange={
            (e) => setFilterColumn({ ...filterColumn, column: e.target.value })
          }
          value={ filterColumn.column }
          data-testid="column-filter"
        >
          {optionsFilterByNumber.map((column) => (
            <option key={ column }>{column}</option>
          ))}
        </select>
        <select
          onChange={
            (e) => setFilterColumn({ ...filterColumn, comparison: e.target.value })
          }
          value={ filterColumn.comparison }
          data-testid="comparison-filter"
        >
          {comparison.map((comparisonOption) => (
            <option key={ comparisonOption }>{comparisonOption}</option>
          ))}
        </select>
        <input
          onChange={
            (e) => setFilterColumn({ ...filterColumn, value: e.target.value })
          }
          value={ filterColumn.value }
          data-testid="value-filter"
          type="number"
        />
        <button
          data-testid="button-filter"
          onClick={ onClickFilterColumnByNumber }
          type="button"
        >
          FILTER
        </button>
        <button
          onClick={ onClickRemoveAllFilters }
          data-testid="button-remove-filters"
          type="button"
        >
          REMOVE ALL FILTERS
        </button>
        <select
          data-testid="column-sort"
          onChange={ (e) => setOrder({ ...order, column: e.target.value }) }
        >
          {optionSortByNumber.map((option) => <option key={ option }>{option}</option>)}
        </select>
        <div className="radio-container">
          <label htmlFor="sort">
            <input
              data-testid="column-sort-input-asc"
              value="ASC"
              type="radio"
              name="sort"
              onChange={ (e) => setOrder({ ...order, sort: e.target.value }) }
            />
            ASCENDENTE
          </label>
          <br />
          <label htmlFor="sort">
            <input
              data-testid="column-sort-input-desc"
              value="DESC"
              type="radio"
              name="sort"
              onChange={ (e) => setOrder({ ...order, sort: e.target.value }) }
            />
            DESCENDENTE
          </label>
        </div>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ onClickSortFilters }
        >
          ORDENAR
        </button>
      </form>
      <ShowFilters />
    </div>
  );
};

export default FilterColumnByNumber;
