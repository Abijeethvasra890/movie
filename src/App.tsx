import { Route, Routes } from "react-router"
import Home from "./Pages/Home"
import PDP from "./Pages/PDP"
import './index.css';
import ShowsPLP from "./Pages/ShowsPLP";
import MoviesPLP from "./Pages/MoviesPLP";
import Search from "./Components/Search";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';


function App() {
  
  return (
    <>
    <Analytics />
    <SpeedInsights />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviesplp" element={<MoviesPLP />} />
        <Route path="/showsplp" element={<ShowsPLP />} />
        <Route path="/pdp/:id" element={<PDP />} />
        <Route path="/search" element = {<Search />} />
      </Routes>
    </>
  )
}

export default App
