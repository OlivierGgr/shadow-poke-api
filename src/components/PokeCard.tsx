import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CapitalizeString } from "../utils/functions.ts";

type Sprites = {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
};

type Types = {
  types: { name: string };
};

type Stats = {
  stats: { name: string };
};

type PokemonDataProps = {
  species: { name: string };
  sprites: Sprites;
  types: Types;
  stats: Stats;
};

export default function PokeCard(): JSX.Element {
  const [pokemonData, setPokemonData] = useState<PokemonDataProps>({});

  const { name } = useParams();
  const navigate = useNavigate();
  useMemo(async () => {
    setPokemonData(
      (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`))?.data
    );
  }, [name]);

  const typesCard = (types) => {
    if (!types) return;
    return types.map((t) => {
      console.log(t);
      let backgroundColor = "#fff";
      let color = "#fff";
      switch (t.type.name) {
        case "grass":
          backgroundColor = "#7CFC00";
          break;
        case "poison":
          backgroundColor = "#800080";
          break;
        case "fire":
          backgroundColor = "#e25822";
          break;
        case "water":
          backgroundColor = "#d4f1f9";
          color = "#000";
          break;
        case "bug":
          backgroundColor = "#A8B820";
          break;
        case "electric":
          backgroundColor = "#e0e21a";
          color = "#000";
          break;
        default:
          color = "#000";
      }

      return (
        <div
          style={{
            backgroundColor,
            color,
          }}
          className="pokemon-profile-card-type-tags"
          key={t.type.name}
        >
          {t.type.name}
        </div>
      );
    });
  };

  const baseStats = (stats) => {
    if (!stats) return <></>;
    const headers: string[] = [];
    const rows: number[] = [];

    for (const stat of stats) {
      if (!stat.stat.name) continue;
      headers.push(stat.stat.name);
      rows.push(stat.base_stat);
    }

    return (
      <table className="pokemon-profile-stats-table">
        <tr>
          {headers?.map((h) => (
            <th>{h}</th>
          ))}
        </tr>
        {rows?.map((r) => (
          <td>{r}</td>
        ))}
      </table>
    );
  };

  return (
    <div className="pokemon-profile-card">
      <button
        className="pokemon-profile-return-btn"
        onClick={() => navigate("/")}
      >
        Retour
      </button>
      <h2 className="pokemon-profile-name">
        {CapitalizeString(pokemonData?.species?.name)}
      </h2>
      {typesCard(pokemonData?.types)}
      <div className="pokemon-profile-imgs">
        <img src={pokemonData?.sprites?.front_default} alt="front-default" />
        <img src={pokemonData?.sprites?.back_default} alt="back_default" />
        <img src={pokemonData?.sprites?.front_shiny} alt="front_shiny" />
        <img src={pokemonData?.sprites?.back_shiny} alt="back_shiny" />
      </div>
      {baseStats(pokemonData?.stats)}
    </div>
  );
}
