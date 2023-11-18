import { useEffect, useState } from 'react'
import './App.css'
import PokemonItem from './components/PokemonItem'

// Move this function to a utility module (file)
const sortArrayAscendingById = (array) => array.sort((a, b) => { a.id - b.id })

// Move this function to a utility module (file)
const fetchData = async (url) => {
  let data
  let errors = []

  try {
    const response = await fetch(url)

    if (response.ok) {
      data = await response.json()
    } else {
      errors.push('Response error')
    }
  } catch (error) {
    errors.push('Request error')
  }

  if (data == undefined) {
    data = null
    errors.map((error, index) => ({ id: index, message: error }))
  }

  return [data, errors]
}

// Move this function to a model module (file) (based on MVC)
class Pokemon {
  constructor(name, imageUrl, imageDetail, height, weight, id, typeNames) {
    this.name = name
    this.imageUrl = imageUrl
    this.imageDetail = imageDetail
    this.height = height
    this.weight = weight
    this.id = id
    this.typeNames = typeNames
  }
}

function App() {
  const [pokemons, setPokemons] = useState([])
  const [errors, setErrors] = useState([])

  const fetchPokemons = async () => {
    const [allData, fetchErrors] = await fetchData("https://pokeapi.co/api/v2/pokemon/?limit=50")

    if (allData === null) {
      setErrors(fetchErrors)

      return
    }

    const pokemonData = allData.results
    const rawPokemons = []

    for (const pokemonDatum of pokemonData) {
      const [pokemonResponse, fetchErrors] = await fetchData(`${pokemonDatum.url}`)

      if (pokemonResponse === null) {
        console.error(fetchErrors)
      } else {
        rawPokemons.push(pokemonResponse)
      }
    }

    const sortedPokemons = sortArrayAscendingById(rawPokemons)
    const transformedPokemons = sortedPokemons.map(sortedPokemon => (
      new Pokemon(
        sortedPokemon.name,
        sortedPokemon.sprites.front_default,
        sortedPokemon.sprites.versions["generation-v"]["black-white"].animated.front_default, // TODO: rename `imageDetail`
        sortedPokemon.height / 10, // TODO: why `/ 10` ?
        sortedPokemon.weight / 10, // TODO: why `/ 10` ?
        sortedPokemon.id,
        sortedPokemon.types.map(type => type.type.name)
      )
    ))

    setPokemons(transformedPokemons)
  }

  useEffect(() => {
    fetchPokemons()
  }, [])

  const isLoading = pokemons.length === 0 && errors.length === 0

  // BTVN:
  // 1. Chuyển chức năng hiển thị chi tiết từng pokemon từ project cũ (js thuần) sang react
  // 2. Chuyển chức năng tìm kiếm pokemon từ project cũ sang project mới

  return (
    isLoading
    ? (
      <p>Loading...</p>
    )
    : (
      <>
      <div id="search-pokemon">
      <form action="">
        <label htmlFor="input-search"></label>
        <input type="text" id="input-search" placeholder="Search Pokemon" />
        <button type="submit">Search</button>
      </form>
    </div>
    {errors && (
      <div id="errors">
        {errors.map(error => (
          <p key={error.id} className='text-red'>{error.message}</p>
        ))}
      </div>
    )}
    <div id="pokemons-list-container">
      {pokemons.map(pokemon => (
        <PokemonItem
          key={pokemon.id}
          imageUrl={pokemon.imageUrl}
          id={pokemon.id}
          name={pokemon.name}
          typeNames={pokemon.typeNames}
        />
      ))}
    </div>
    <div id="pokemon-detail"></div>
      </>
    )
  )
}

export default App
