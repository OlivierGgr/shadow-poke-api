import axios from "axios";
import { useState, useMemo } from "react";

export default function useGetPokeData(offset = 0, query) {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const findSprites = async (pokeData) => {
    for await (const result of pokeData) {
      result.sprite = (
        await axios.get(result.url)
      )?.data?.sprites?.front_default;
    }

    return pokeData;
  };

  const getPokeData = async () => {
    try {
      setLoading(true);
      let res = [];
      if (query !== "") {
        res = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`))
          ?.data;

        res.sprite = res.sprites?.front_default;
        setPokeData([res]);
      } else {
        res = (
          await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
          )
        )?.data?.results;

        res = await findSprites(res);
        setPokeData((old) => [...old, ...res]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useMemo(async () => {
    await getPokeData();
  }, [offset, query]);

  return { pokeData, loading };
}
