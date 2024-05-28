import { Route, Routes } from "react-router"
import Home from "./Pages/Home"
import './index.css';
import ShowsPLP from "./Pages/ShowsPLP";
import MoviesPLP from "./Pages/MoviesPLP";
import Search from "./Components/Search";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import MoviesPDP from "./Pages/MoviesPDP";
import ShowsPDP from "./Pages/ShowsPDP";


function App() {
  
  return (
    <>
    <Analytics />
    <SpeedInsights />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviesplp" element={<MoviesPLP />} />
        <Route path="/showsplp" element={<ShowsPLP />} />
        <Route path="/movie/pdp/:id" element={<MoviesPDP />} />
        <Route path="moviesPLP/movie/pdp/:id" element={<MoviesPDP />} />
        <Route path="/show/pdp/:id" element={<ShowsPDP />} />
        <Route path="showsPLP/movie/pdp/:id" element={<ShowsPDP />} />
        <Route path="/search" element = {<Search />} />
      </Routes>
    </>
  )
}

export default App
