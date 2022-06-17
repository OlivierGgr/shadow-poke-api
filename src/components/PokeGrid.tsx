import { useNavigate } from "react-router-dom";
import React, { Children } from "react";

export default function PokeGrid({ pokeData }): JSX.Element {
  const navigate = useNavigate();
  if (!pokeData || pokeData.length === 0) return <></>;

  return (
    <div className="pokemon-grid">
      {Children.toArray(
        pokeData.map((pokemon) => {
          return (
            <div className="pokemon-grid-card">
              {pokemon.sprites?.front_default ? (
                <img
                  src={pokemon.sprites?.front_default}
                  alt={`${pokemon.name}-sprite`}
                  className="pokemon-grid-card-image"
                  onClick={() => navigate(`/pokemon/${pokemon.name}`)}
                />
              ) : (
                "Pas d'image"
              )}
              <p>{pokemon.name}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
