import { Route, Routes } from "react-router"
import Home from "./Pages/Home"
import './index.css';
import ShowsPLP from "./Pages/ShowsPLP";
import MoviesPLP from "./Pages/MoviesPLP";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import MoviesPDP from "./Pages/MoviesPDP";
import ShowsPDP from "./Pages/ShowsPDP";
import SearchPage from "./Pages/SearchPage";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <Route path="showsPLP/show/pdp/:id" element={<ShowsPDP />} />
        <Route path="/search" element = {<SearchPage />} />
        <Route path="/search/movie/pdp/:id" element = {<MoviesPDP />} />
        <Route path="/register" element= {<Register />} />
        <Route path="/login" element= {<Login />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
