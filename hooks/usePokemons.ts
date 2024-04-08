import { useState } from "react";
import { api } from "@/api/pokemonApi";

const usePokemons = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = async (offset = 0, limit = 20) => {
    setLoading(true);
    try {
      const response = await api.listPokemons(offset, limit);
      setLoading(false);
      return response.results.map((result) => result.name);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      setError("Failed to fetch Pokemon list");
      setLoading(false);
      return [];
    }
  };

  const fetchPokemonTypes = async () => {
    setLoading(true);
    try {
      const { results } = await api.listTypes();
      setLoading(false);
      return results.map((r) => r.name);
    } catch (error) {
      console.error("Error fetching Pokemon types:", error);
      setError("Failed to fetch Pokemon types");
      setLoading(false);
      return [];
    }
  };

  const fetchPokemonByName = async (name: string) => {
    setLoading(true);
    try {
      const response = await api.getPokemonByName(name);
      setLoading(false);
      return response;
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setError("Failed to fetch Pokemon");
      setLoading(false);
      return undefined;
    }
  };

  return {
    fetchPokemons,
    fetchPokemonTypes,
    fetchPokemonByName,
    loading,
    error,
  };
};

export default usePokemons;
