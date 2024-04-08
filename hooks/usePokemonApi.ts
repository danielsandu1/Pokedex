import { useState, useEffect } from "react";

import usePokemons from "./usePokemons";

const POKEMON_LIMIT = 1305;

const usePokemonApi = () => {
  const {
    fetchPokemons,
    fetchPokemonTypes,
    loading: clientLoading,
    error: clientError,
  } = usePokemons();
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pokemonList, types] = await Promise.all([
          fetchPokemons(0, POKEMON_LIMIT),
          fetchPokemonTypes(),
        ]);
        setPokemons(pokemonList);
        setPokemonTypes(types);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(clientLoading);
  }, [clientLoading]);

  useEffect(() => {
    setError(clientError);
  }, [clientError]);

  return { pokemons, pokemonTypes, loading, error };
};

export default usePokemonApi;
