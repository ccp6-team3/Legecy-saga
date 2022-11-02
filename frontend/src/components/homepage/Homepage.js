import "../../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import HPBanner from "./HPBanner.js";
import HPMovies from "./HPMovies.js";
import HPShows from "./HPShows.js";
import HPFooter from "./HPFooter";

const HomePage = (props) => {
  const { safe, setMoviePopup, setShowPopup, setSelection } = props;

  const [movieArray, setMovieArray] = useState([]);
  const [bannerArray, setBannerArray] = useState([]);
  const [showArray, setShowArray] = useState([]);

  const getPopularMovies = async () => {
    fetch("/popularMovies", {
      headers: {
        "Filter": safe
      }
    })
      .then(res => res.json())
      .then(arr => {
        setMovieArray(arr.slice(5))
        setBannerArray(arr.slice(0, 5))
      })
  }

  useEffect(() => {
    getPopularMovies()
  }, [safe])


  useEffect(() => {
    fetch("/popularTV")
      .then(res => res.json())
      .then(arr => setShowArray(arr))
  }, [])

  return (
    <>
      <HPBanner setSelection={setSelection} setMoviePopup={setMoviePopup} bannerArray={bannerArray} />
      <h1 className="movieHeader">Popular Movies</h1>
      <HPMovies setSelection={setSelection} setMoviePopup={setMoviePopup} movieArray={movieArray} />
      <h1 className="showHeader">Popular TV Shows</h1>
      <HPShows setSelection={setSelection} setShowPopup={setShowPopup} showArray={showArray} />
      <HPFooter />
    </>
  )
};

export default HomePage;