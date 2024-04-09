import React from "react";
import Image from "next/image";

import { Badge } from "@/components/ui";
import { convertHeightToMeters, convertWeightToKilograms } from "@/utils";
import Link from "next/link";

interface PokemonData {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

interface PokemonCardProps {
  pokemon: PokemonData;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Link href={`/${pokemon.name}`}>
      <div className="flex items-center border border-gray-300 p-2 mb-2 rounded-md group px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
        <div className="w-12 h-12 mr-4">
          <Image
            src={pokemon.sprites?.front_default ?? "/logo.svg"}
            alt={pokemon.name}
            width={96}
            height={96}
          />
        </div>
        <div className="grow">
          <h2 className="text-lg font-semibold">{pokemon.name}</h2>
          <div className="text-sm text-gray-600">
            Type:{" "}
            {pokemon?.types.map((type: { type: { name: string } }) => (
              <Badge key={type.type.name} className="mr-1" variant="secondary">
                {type.type.name}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Height: {convertHeightToMeters(pokemon.height)} | Weight:{" "}
            {convertWeightToKilograms(pokemon.weight)}
          </p>
        </div>
        <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none hidden sm:inline-block">
          -&gt;
        </span>
      </div>
    </Link>
  );
};

export default PokemonCard;
