"use client";

import React, { useState } from "react";
import { Pokemon } from "pokenode-ts";

import usePokemonApi from "@/hooks/usePokemonApi";
import usePokemonFilter from "@/hooks/usePokemonFilter";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";
import { Separator } from "@/components/ui/separator";

const Home: React.FC = () => {
  const { pokemons, pokemonTypes, loading, error } = usePokemonApi();
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    filteredResults,
    loading: filterLoading,
    error: errorFilter,
  } = usePokemonFilter(pokemons, searchInput, selectedType);

  React.useEffect(() => {
    setSearchResults(filteredResults);
  }, [filteredResults]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleTypeSelectChange = (type: string | null) => {
    setSelectedType(type);
  };

  const errorMsg = error || errorFilter;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
      <SearchBar
        onSearchInputChange={handleSearchInputChange}
        onTypeSelectChange={handleTypeSelectChange}
        options={pokemonTypes}
      />
      <Separator className="mb-4" />

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : (
        <div>
          {searchResults.map((result) => (
            <PokemonCard key={result.id} pokemon={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
