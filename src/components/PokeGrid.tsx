import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { CapitalizeString } from "../utils/functions.ts";

export default function PokeGrid({ pokeData }): JSX.Element {
  const navigate = useNavigate();
  if (!pokeData || pokeData.length === 0) return <></>;

  return (
    <div className="pokemon-grid">
      {pokeData.map((pokemon) => {
        return (
          <div className="pokemon-grid-card" key={uuid()}>
            {pokemon.sprite ? (
              <img
                src={pokemon.sprite}
                alt={`${pokemon.name}-sprite`}
                className="pokemon-grid-card-image"
                onClick={() => navigate(`/pokemon/${pokemon.name}`)}
              />
            ) : (
              "Pas d'image"
            )}
            <p>{CapitalizeString(pokemon.name)}</p>
          </div>
        );
      })}
    </div>
  );
}
