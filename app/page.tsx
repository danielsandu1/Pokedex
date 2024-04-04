"use client";

import React, { useEffect, useState } from "react";
import { PokemonClient, NamedAPIResource, Pokemon } from "pokenode-ts";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";
import { Separator } from "@/components/ui/separator";

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const api = new PokemonClient();

      try {
        const { results } = await api.listPokemons();
        const pokemonData: Pokemon[] = await Promise.all(
          results.map(async ({ name }: NamedAPIResource) => {
            const pokemon: Pokemon = await api.getPokemonByName(name);
            return pokemon;
          })
        );
        setPokemonList(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setError("Failed to fetch Pokémon. Please try again later.");
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
      <SearchBar />
      <Separator className="mb-4" />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {pokemonList.map((pokemonData) => (
            <PokemonCard key={pokemonData.id} pokemon={pokemonData} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
