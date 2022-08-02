import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import useFilterPlanetsByName from '../hooks/useFilterPlanetsByName';
import useFetchAPI from '../hooks/useFetchAPI';
import useFilterColumnByNumber from '../hooks/useFilterColumnByNumber';
import support from '../data/support';

const Provider = ({ children }) => {
  const { column, comparison } = support;

  const [API, setAPI] = useState([]);
  const [cloneAPI, setCloneAPI] = useState([]);
  const [filterByName, setFilterByName] = useState({
    name: '',
  });
  const [optionsFilterByNumber, setOptionsFilterByNumber] = useState(column);
  const [optionSortByNumber, setOptionSortByNumber] = useState(column);
  const [filterColumn, setFilterColumn] = useState({
    column: optionsFilterByNumber[0],
    comparison: 'maior que',
    value: 0,
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  useFetchAPI(setAPI, setCloneAPI);
  useFilterPlanetsByName(API, setCloneAPI, filterByName.name);
  useFilterColumnByNumber(API, filterByNumericValues, setCloneAPI);

  const onClickFilterColumnByNumber = () => {
    setFilterByNumericValues([...filterByNumericValues, filterColumn]);
    const filter = optionsFilterByNumber
      .filter((option) => option !== filterColumn.column);
    setOptionsFilterByNumber(filter);
    setFilterColumn({ ...filterColumn, column: filter[0] });
  };

  const onClickRemoveFilter = (option) => {
    setOptionsFilterByNumber([...optionsFilterByNumber, option]);
    const filter = filterByNumericValues.filter((obj) => obj.column !== option);
    setFilterByNumericValues(filter);
  };

  const onClickRemoveAllFilters = () => {
    setFilterByNumericValues([]);
    setOptionsFilterByNumber(column);
  };

  const onClickSortFilters = () => {
    let planetsOrder = [];

    if (order.sort === 'ASC') {
      const filterForNumber = cloneAPI.filter(
        (planet) => planet[order.column] !== 'unknown',
      );
      const planetsSortASC = filterForNumber.sort(
        (a, b) => a[order.column] - b[order.column],
      );
      const filterForUnknow = cloneAPI.filter(
        (planet) => planet[order.column] === 'unknown',
      );
      planetsOrder = [...planetsSortASC, ...filterForUnknow];
    }

    if (order.sort === 'DESC') {
      const filterForNumber = cloneAPI.filter(
        (planet) => planet[order.column] !== 'unknown',
      );
      const planetsSortDESC = filterForNumber.sort(
        (a, b) => b[order.column] - a[order.column],
      );
      const filterForUnknow = cloneAPI.filter(
        (planet) => planet[order.column] === 'unknown',
      );
      planetsOrder = [...planetsSortDESC, ...filterForUnknow];
    }

    setCloneAPI(planetsOrder);
  };

  const contextValue = {
    API,
    setAPI,
    order,
    setOrder,
    cloneAPI,
    setCloneAPI,
    comparison,
    filterByName,
    setFilterByName,
    filterColumn,
    setFilterColumn,
    filterByNumericValues,
    optionsFilterByNumber,
    setOptionsFilterByNumber,
    optionSortByNumber,
    setOptionSortByNumber,
    setFilterByNumericValues,
    onClickFilterColumnByNumber,
    onClickRemoveFilter,
    onClickRemoveAllFilters,
    onClickSortFilters,
  };

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
