import "../../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import HPBanner from "./HPBanner.js";
import HPMovies from "./HPMovies.js";
import HPShows from "./HPShows.js";
import HPFooter from "./HPFooter";

const HomePage = () => {
  const [movieArray, setMovieArray] = useState([]);
  const [bannerArray, setBannerArray] = useState([]);
  const [showArray, setShowArray] = useState([]);

  useEffect(() => {
    fetch("/popularMovies")
      .then(res => res.json())
      .then(arr => {
        setMovieArray(arr.slice(5))
        setBannerArray(arr.slice(0, 5))
      })
  })

  useEffect(() => {
    fetch("/popularTV")
      .then(res => res.json())
      .then(arr => setShowArray(arr))
  })

  return (
    <>
      <HPBanner bannerArray={bannerArray} />
      <h1 className="movieHeader">Popular Movies</h1>
      <HPMovies movieArray={movieArray} />
      <h1 className="showHeader">Popular TV Shows</h1>
      <HPShows showArray={showArray} />
      <HPFooter />
    </>
  )
};

export default HomePage;