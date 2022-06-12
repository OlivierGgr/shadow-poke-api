import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokeCard from "../components/PokeCard.tsx";
import PokeHome from "../components/PokeHome.tsx";

export default function PrivateRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokeHome />} />
        <Route path="/pokemon/:name" element={<PokeCard />} />
      </Routes>
    </BrowserRouter>
  );
}
