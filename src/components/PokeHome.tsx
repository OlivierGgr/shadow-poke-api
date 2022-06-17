import React, { useRef, useEffect, useState } from "react";
import useGetPokeData from "../hooks/useGetPokeData";
import PokeGrid from "./PokeGrid";

export default function PokeHome() {
  const loadMore = useRef(null);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState("");
  const { pokeData, loading } = useGetPokeData(offset, query);

  useEffect(() => {
    if (!loadMore.current || loading || query) return;

    const handleObserver = (entries) => {
      if (loading) return;
      const target = entries[0];

      if (target.intersectionRatio !== 0) {
        setOffset((prev) => prev + 20);
        return observer.disconnect();
      }
    };

    const option = {
      root: null,
      rootMargin: "10px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(loadMore.current);
  }, [loading, query]);

  return (
    <>
      <h1 className="poke-title">My Pokedex</h1>
      <input
        type="text"
        className="poke-search-input"
        placeholder="pikachu"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          setQuery(target.value);
          if (target.value === "") {
            setOffset(0);
          }
        }}
      />
      <PokeGrid pokeData={pokeData} />
      <div ref={loadMore} />
      {loading && "chargement..."}
    </>
  );
}
