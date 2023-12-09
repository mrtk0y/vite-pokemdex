import { useCallback, useEffect, useState } from "react";
import "./App.css";
import PokemonItem from "./components/Pokemon/PokemonItem.jsx"
import sortArrayByProperty from "./utilities/array/sortByProperty.js"
import PokemonList from "./components/Pokemon/PokemonList.jsx"

// TODO: Move this function to a utility module (file)
const fetchData = async (url) => {
  let data;
  let errors = [];

  try {
    const response = await fetch(url);

    if (response.ok) {
      data = await response.json();
    } else {
      errors.push("Response error");
    }
  } catch (error) {
    errors.push("Request error");
  }

  if (data == undefined) {
    data = null;
    errors.map((error, index) => ({ id: index, message: error }));
  }

  return [data, errors];
};

// Move this function to a model module (file) (based on MVC)
class Pokemon {
  constructor(name, imageUrl, imageDetail, height, weight, id, typeNames) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.imageDetail = imageDetail;
    this.height = height;
    this.weight = weight;
    this.id = id;
    this.typeNames = typeNames;
  }
}

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [errors, setErrors] = useState([]);

  const [inputValue, setInputValue] = useState('');


  const fetchPokemons = async () => {
    const [allData, fetchErrors] = await fetchData(
      "https://pokeapi.co/api/v2/pokemon/?limit=50"
    );

    if (allData === null) {
      setErrors(fetchErrors);

      return;
    }

    const pokemonData = allData.results;
    const rawPokemons = [];

    for (const pokemonDatum of pokemonData) {
      const [pokemonResponse, fetchErrors] = await fetchData(
        `${pokemonDatum.url}`
      );

      if (pokemonResponse === null) {
        console.error(fetchErrors);
      } else {
        rawPokemons.push(pokemonResponse);
      }
    }

    const sortedPokemons = sortArrayByProperty({ originalArray: rawPokemons, property: 'id' });
    const transformedPokemons = sortedPokemons.map(
      (sortedPokemon) =>
        new Pokemon(
          sortedPokemon.name,
          sortedPokemon.sprites.front_default,
          sortedPokemon.sprites.versions["generation-v"][
            "black-white"
          ].animated.front_default, // TODO: rename `imageDetail`
          sortedPokemon.height / 10, // TODO: why `/ 10` ?
          sortedPokemon.weight / 10, // TODO: why `/ 10` ?
          sortedPokemon.id,
          sortedPokemon.types.map((type) => type.type.name)
        )
    );

    setPokemons(transformedPokemons);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const isLoading = pokemons.length === 0 && errors.length === 0;

  // BTVN:
  // 1. Chuyển chức năng hiển thị chi tiết từng pokemon từ project cũ (js thuần) sang react
  // 2. Chuyển chức năng tìm kiếm pokemon từ project cũ sang project mới
  // const {debounceValue,updateInputValue} = useDebounceInput()
  // console.log("🚀 ~ App ~ debounceValue:", debounceValue)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputChange = useCallback((e) => {
      e.preventDefault();
      const inputValue = e.target.value;
      setInputValue(inputValue)
      },
    [],
  )

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="bg-indigo-300">
      {/* TODO: BEGIN Pokemon/Search component */}
      <div className="pt-4 mb-4">
        <form action="" onChange={handleInputChange} className="text-xl flex justify-center gap-4">
          <input type="text" placeholder="Search Pokemon" className="input input-bordered w-full max-w-xs" />
          <button className="btn">Search</button>
        </form>
        {errors && (
          <div id="errors">
            {errors.map((error) => (
              <p key={error.id} className="text-red-400">
                {error.message}
              </p>
            ))}
          </div>
        )}
      </div>
      {/* TODO: END Pokemon/Search component */}

      <PokemonList pokemons={pokemons} searchInput={inputValue} />
    </div>
  );
}

export default App;
