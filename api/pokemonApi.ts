import { Pokemon, PokemonClient } from "pokenode-ts";

const cacheOptions = {
  ttl: 5000,
  exclude: { query: false },
  clearOnStale: true,
};

export const api = new PokemonClient({ cacheOptions });
