import React, { useContext } from 'react';
import context from '../context/context';
import support from '../data/support';
import '../styles/Table.css';

const PlanetsTable = () => {
  const { cloneAPI } = useContext(context);

  return (
    <table className="table-container">
      <thead>
        <tr>
          {support.tableHeader.map((header) => (
            <th
              key={ header }
              style={ { border: '1px solid black' } }
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cloneAPI.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default PlanetsTable;
