import { Pokemon, PokemonClient } from "pokenode-ts";

const cacheOptions = {
  ttl: 5000,
  exclude: { query: false },
  clearOnStale: true,
};

export const api = new PokemonClient({ cacheOptions });

export const getPokemonByName = async (
  name: string
): Promise<Pokemon | undefined> => {
  try {
    const response: Pokemon = await api.getPokemonByName(name);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};
