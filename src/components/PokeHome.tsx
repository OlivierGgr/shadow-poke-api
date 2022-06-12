import { useRef, useCallback, useEffect, useState } from "react";
import "../App.css";
import useGetPokeData from "../hooks/useGetPokeData.ts";
import PokeGrid from "./PokeGrid.tsx";

export default function PokeHome() {
  const loadMore = useRef(null);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState("");
  const { pokeData, loading } = useGetPokeData(offset, query);
  <h1>Mon Pokedex</h1>;

  const handleObserver = useCallback(
    (entries) => {
      if (loading) return;
      const target = entries[0];

      if (target.intersectionRatio !== 0) {
        setOffset((prev) => prev + 20);
      }
    },
    [loading, query]
  );

  useEffect(() => {
    if (!loadMore.current || loading || query) return;
    const option = {
      root: null,
      rootMargin: "10px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(loadMore.current);
  }, [loading]);

  return (
    <>
      <h1 className="poke-title">My Pokedex</h1>
      <input
        type="text"
        className="poke-search-input"
        placeholder="pikachu"
        onInput={(e) => {
          setQuery(e.target.value);
          if (e.target.value === "") {
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
