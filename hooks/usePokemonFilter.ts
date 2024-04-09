import { useState, useEffect } from "react";
import { Pokemon } from "pokenode-ts";
import { debounce } from "lodash";

import { getPokemonByName } from "@/api/pokemonApi";

const usePokemonFilter = (
  pokemonNames: string[],
  searchInput: string,
  selectedType: string | null
) => {
  const [filteredResults, setFilteredResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    let filteredPokemons: (Pokemon | undefined)[] = [];

    const fetchFilteredPokemons = debounce(async () => {
      setLoading(true);
      if (searchInput) {
        const filteredNames = pokemonNames.filter((n) =>
          n.toLowerCase().includes(searchInput.toLowerCase())
        );

        try {
          const pokemonPromises = filteredNames.map(async (name) => {
            const pokemon = await getPokemonByName(name);
            return pokemon;
          });

          const resolvedPokemons = await Promise.all(pokemonPromises);
          filteredPokemons = resolvedPokemons;
        } catch (error) {
          console.error("Error fetching Pokemon:", error);
          setError("Error fetching Pokemon");
        }

        filteredPokemons = filteredPokemons.filter(
          (pokemon) => pokemon !== undefined
        );

        if (selectedType) {
          filteredPokemons = filteredPokemons.filter((pokemon) =>
            pokemon!.types.some((type) => type.type.name === selectedType)
          );
        }

        setFilteredResults(filteredPokemons as Pokemon[]);
        setLoading(false);
      } else {
        setFilteredResults([]);
        setLoading(false);
      }
    }, 300);

    fetchFilteredPokemons();

    return () => {
      fetchFilteredPokemons.cancel();
    };
  }, [pokemonNames, searchInput, selectedType]);

  return { filteredResults, loading, error };
};

export default usePokemonFilter;
