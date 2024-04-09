import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Pokemon } from "pokenode-ts";

import "@/app/globals.css";
import { getPokemonByName } from "@/api/pokemonApi";
import { convertHeightToMeters, convertWeightToKilograms } from "@/utils";
import { Badge } from "@/components/ui";
import Header from "@/components/shared/Header";

interface PokemonPageProps {
  pokemon: Pokemon;
}

const PokemonPage: React.FC<PokemonPageProps> = ({ pokemon }) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className="max-w-lg mx-auto p-4 md:pt-7">
      <Header />
      <h1 className="text-2xl text-center font-bold mb-4">{name}</h1>

      <div className="flex items-center justify-center sm:flex-row flex-col-reverse">
        <div className="md:w-2/3 md:mr-4">
          <h2 className="text-lg font-semibold mb-2">Details:</h2>
          <div className="mb-2">
            <p className="text-gray-600">
              <span className="font-medium">Height:</span>{" "}
              {convertHeightToMeters(pokemon.height)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Category:</span>{" "}
              {pokemon.species.name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Weight:</span>{" "}
              {convertWeightToKilograms(pokemon.weight)}
            </p>
          </div>
          <div>
            <span className="font-medium">Abilities:</span>{" "}
            {pokemon.abilities.map((ability) => (
              <Badge
                key={ability.ability.name}
                className="mr-1"
                variant="secondary"
              >
                {ability.ability.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="md:w-1/3">
          <Image
            src={pokemon?.sprites?.other?.home?.front_default || ""}
            alt={name as string}
            width={130}
            height={130}
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;

export async function getServerSideProps(context: { query: { name: any } }) {
  const { name } = context.query;

  try {
    const pokemon = await getPokemonByName(name as string);
    if (!pokemon)
      return {
        notFound: true,
      };
    return { props: { pokemon } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: {} };
  }
}
