import axios from "axios";
import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import { PokemonDataProps } from "../types";

export default function useGetPokeData(offset = 0, query) {
  const [pokeData, setPokeData] = useState<PokemonDataProps[]>([]);
  const [loading, setLoading] = useState(true);

  const findSprites = async (pokeData) => {
    for await (const result of pokeData) {
      result.sprites = {};
      result.sprites.front_default = (
        await axios.get(result.url)
      )?.data?.sprites?.front_default;
    }

    return pokeData;
  };

  const getPokeData = async () => {
    try {
      setLoading(true);
      if (query !== "") {
        const sprites = {
          front_default: "",
        };

        const res = (
          await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`)
        )?.data;

        sprites.front_default = res.sprites?.front_default;

        setPokeData([{ ...res, ...sprites }]);
      } else {
        const res = (
          await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
          )
        )?.data?.results;

        const pokeDataWithSprites = await findSprites(res);

        setPokeData((old) => [...old, ...pokeDataWithSprites]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedPokeSearch = useDebounce(query, 500);

  useEffect(() => {
    const fetchData = async () => await getPokeData();
    fetchData();
  }, [debouncedPokeSearch, offset]);

  return { pokeData, loading };
}
