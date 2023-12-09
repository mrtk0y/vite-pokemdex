import PokemonItem from "./PokemonItem.jsx"

const PokemonList = ({ pokemons, searchInput }) => {
  return (
    <div className='grid grid-cols-8 gap-2'>
      {pokemons.map((pokemon) => (
        <PokemonItem
          isShow={pokemon.name.includes(searchInput)}
          key={pokemon.id}
          imageUrl={pokemon.imageUrl}
          id={pokemon.id}
          name={pokemon.name}
          typeNames={pokemon.typeNames}
        />
      ))}
    </div>
  )
}

export default PokemonList
