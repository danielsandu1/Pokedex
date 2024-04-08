import { useState, useEffect } from "react";
import { Pokemon } from "pokenode-ts";

import usePokemons from "./usePokemons";

const usePokemonFilter = (
  pokemonNames: string[],
  searchInput: string,
  selectedType: string | null
) => {
  const [filteredResults, setFilteredResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    fetchPokemonByName,
    loading: clientLoading,
    error: clientError,
  } = usePokemons();

  useEffect(() => {
    setLoading(true);
    setError(null);

    let filteredPokemons: Pokemon[] = [];

    if (searchInput) {
      const filteredNames = pokemonNames.filter((n) =>
        n.toLowerCase().includes(searchInput.toLowerCase())
      );

      Promise.all(
        filteredNames.map(async (name) => {
          try {
            const pokemon = await fetchPokemonByName(name);
            if (pokemon) {
              filteredPokemons.push(pokemon);
            }
          } catch (error) {
            console.error(`Error fetching data ${name}:`, error);
            setError(`Error fetching data ${name}`);
          }
        })
      ).then(() => {
        if (selectedType) {
          filteredPokemons = filteredPokemons.filter((pokemon) =>
            pokemon.types.some((type) => type.type.name === selectedType)
          );
        }
        setFilteredResults(filteredPokemons);
        setLoading(false);
      });
    } else {
      setFilteredResults([]);
      setLoading(false);
    }
  }, [searchInput, selectedType]);

  return { filteredResults, loading, error };
};

export default usePokemonFilter;
