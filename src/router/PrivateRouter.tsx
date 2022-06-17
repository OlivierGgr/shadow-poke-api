import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PokeCard from "../components/PokeCard";
import PokeHome from "../components/PokeHome";

export default function PrivateRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokeHome />} />
        <Route path="/pokemon/:name" element={<PokeCard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
