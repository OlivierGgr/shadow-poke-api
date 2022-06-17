export type Sprites = {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
};

export type Types = [types: TypeDetails];
export type TypeDetails = { slot: number; type: { name: string; url: string } };

export type Stats = {
  stats: { name: string };
};

export type PokemonDataProps = {
  species: { name: string };
  sprites: Sprites;
  types: Types;
  stats: Stats;
  name: string;
};
