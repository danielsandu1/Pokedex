import { useState, useEffect } from "react";

import usePokemons from "./usePokemons";

const POKEMON_LIMIT = 1305;

const usePokemonApi = () => {
  const { fetchPokemons, fetchPokemonTypes, loading, error } = usePokemons();
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [pokemonList, types] = await Promise.all([
        fetchPokemons(0, POKEMON_LIMIT),
        fetchPokemonTypes(),
      ]);
      setPokemons(pokemonList);
      setPokemonTypes(types);
    };
    fetchData();
  }, []);

  return { pokemons, pokemonTypes, loading, error };
};

export default usePokemonApi;
