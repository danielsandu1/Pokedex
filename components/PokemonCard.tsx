import React from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";

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
    <div className="flex items-center border border-gray-300 p-2 mb-2 rounded-md">
      <div className="w-12 h-12 mr-4">
        <Image
          src={pokemon.sprites?.front_default ?? ""}
          alt={pokemon.name}
          width={96}
          height={96}
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{pokemon.name}</h2>
        <div className="text-sm text-gray-600">
          Type:
          {pokemon?.types.map((type: { type: { name: string } }) => (
            <Badge key={type.type.name} className="mr-1" variant="secondary">
              {type.type.name}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Height: {pokemon.height / 10} m | Weight: {pokemon.weight / 10} kg
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
