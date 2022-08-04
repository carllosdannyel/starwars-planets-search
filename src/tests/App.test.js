import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

describe('Testa o componente App', () => {

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData)
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Testa o filtro de busca por nome digitando "oo"', async () => {
    render(<App />)

    const inputFilter = screen.getByPlaceholderText(/filter planets by name/i)
    const thead = document.getElementsByTagName('th')
    const tbody = ['Naboo', 'Tatooine' ]
    
    userEvent.clear(inputFilter)
    userEvent.type(inputFilter, 'oo')
    
    expect(thead).toHaveLength(13)
    
    const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})

    planets.forEach((planet, index) => expect(planet).toHaveTextContent(tbody[index]))
    expect(planets).toHaveLength(2)
  })

  it('Testa o botão de filtrar, filtrando por "população maior que 200.000"', async () => {
    render(<App />)
    const thead = document.getElementsByTagName('th')
    const tbody = ['Alderaan', 'Bespin', 'Coruscant', 'Endor', 'Kamino', 'Naboo']
    const buttonFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})
    const column = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter')

    userEvent.selectOptions(column, 'population')
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '2000000')
    userEvent.click(buttonFilter)

    expect(thead).toHaveLength(13)

    const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})

    planets.forEach((planet, index) => expect(planet).toHaveTextContent(tbody[index]))
    expect(planets).toHaveLength(6)
  })

  it('Testa o botão de filtrar com múltiplos filtros', async () => {
    render(<App />)
    const thead = document.getElementsByTagName('th')
    const buttonFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})
    const column = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter')

    userEvent.selectOptions(column, 'population')
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '2000000')
    userEvent.click(buttonFilter)
    userEvent.selectOptions(column, 'orbital_period')
    userEvent.selectOptions(comparison, 'menor que')
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '400')
    userEvent.click(buttonFilter)
    userEvent.selectOptions(column, 'diameter')
    userEvent.selectOptions(comparison, 'igual a')
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '12500')
    userEvent.click(buttonFilter)

    expect(thead).toHaveLength(13)

    const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})

    expect(planets[0]).toHaveTextContent('Alderaan')
  })

  it('Testa se não há filtros repetidos', async () => {
    render(<App />)

    const column = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter')
    const buttonFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})

    userEvent.selectOptions(column, 'population')
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '2000000')
    userEvent.click(buttonFilter)

    expect(column).toHaveLength(4)
  })

  it('Testa o botão de remover filtro individual', async () => {
    render(<App />)

    const column = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter')
    const buttonFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})

    userEvent.selectOptions(column, 'population')
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '2000000')
    userEvent.click(buttonFilter)

    const buttonRemoveFilter = screen.getByRole('button', { name: /X/i })
    expect(buttonRemoveFilter).toBeDefined()
    userEvent.click(buttonRemoveFilter)
    expect(buttonRemoveFilter).toBeTruthy()
  })

  it('Testa o botão de remover todos os Filtros', async () => {
    render(<App />)

    const column = screen.getByTestId('column-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter')
    const buttonFilter = await screen.findByTestId('button-filter', '', {timeout: 5000})
    const buttonRemoveAllFilters = screen.getByRole('button', {name: /remove all filters/i})

    userEvent.selectOptions(column, 'population')
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '2000000')
    userEvent.click(buttonFilter)

    const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})

    expect(planets).toHaveLength(6)
    expect(column).toHaveLength(4)

    userEvent.click(buttonRemoveAllFilters)

    const planets1 = await screen.findAllByTestId('planet-name', '', {timeout: 5000})

    expect(planets1).toHaveLength(10)
    expect(column).toHaveLength(5)
  })


  it('Testa se os planetas estão ordenado por nome', async () => {
    render(<App />);
    const planetList = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];
    
    const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
    expect(planets).toHaveLength(10)
    
    planets.forEach((planet, index) => expect(planet).toHaveTextContent(planetList[index]))
  }, 30000)

  it('Testa o input de Ordenar por Ascendente', async () => {
    render(<App />);
    const planetList = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Dagobah', 'Hoth'];
    
    const buttonOrder = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
      const column = screen.getByTestId('column-sort')
      const radio = screen.getByTestId('column-sort-input-asc')
      userEvent.selectOptions(column, 'population')
      userEvent.click(radio)
      userEvent.click(buttonOrder)
      const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
      expect(planets).toHaveLength(10)

      planets.forEach((planet, index) => expect(planet).toHaveTextContent(planetList[index]))
  }, 30000)

  it('Testa o input de Ordenar por Descendente', async () => {
    render(<App />);
    const planetList = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV', 'Dagobah', 'Hoth'];
    
    const buttonOrder = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
      const column = screen.getByTestId('column-sort')
      const radio = screen.getByTestId('column-sort-input-desc')
      userEvent.selectOptions(column, 'population')
      userEvent.click(radio)
      userEvent.click(buttonOrder)
      const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
      expect(planets).toHaveLength(10)

      planets.forEach((planet, index) => expect(planet).toHaveTextContent(planetList[index]))
  }, 30000)
})
