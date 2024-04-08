import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Pokemon } from "pokenode-ts";

import "@/app/globals.css";
import { getPokemonByName } from "@/api/pokemonApi";

interface PokemonPageProps {
  pokemon?: Pokemon;
}

const PokemonPage: React.FC<PokemonPageProps> = ({ pokemon }) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className="w-[40rem] mx-auto p-4 pt-8">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>

      <div className="flex items-center">
        <div className="w-2/3 mr-4">
          <p className="text-gray-600 font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <Image
          src={pokemon?.sprites?.front_default || ""}
          alt={name as string}
          className="w-1/3"
          width={200}
          height={200}
        />
      </div>

      <div>
        <h2 className="mb-2">Details:</h2>
        <p>Height: {pokemon.height}</p>
        <p>Category: {pokemon.species.name}</p>
        <p>Weight: {pokemon.weight}kg</p>
        <p>
          Abilities:
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default PokemonPage;

export async function getServerSideProps(context: { query: { name: any } }) {
  const { name } = context.query;

  try {
    const pokemon = await getPokemonByName(name as string);
    return { props: { pokemon } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}
