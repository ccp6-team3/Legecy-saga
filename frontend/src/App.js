
import "./App.css";
import NavigationBar from "./components/Navbar.js";
import HomePage from "./components/homepage/Homepage.js";
import Movie from "./components/Movie.js";
import Shows from "./components/Tvshows.js";
import Upcoming from "./components/Upcoming.js";
import MoviePopup from "./components/popups/MoviePopup.js";
import ShowPopup from "./components/popups/ShowPopup.js";
import Search from "./components/Search";


import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [navState, setNavState] = useState("home");
	const [safe, setSafe] = useState(false);
	const [newMovieArray, setNewMovieArray] = useState([]);
	const [moviePopup, setMoviePopup] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [selection, setSelection] = useState([]);
	const [location, setLocation] = useState("");

	const [search, setSearch] = useState([""]);
	// const [searchResultArray, setSearchResultArray] = useState([]);
	const [isDanger, setDanger] = useState(false)
	useEffect(() => {
		if (navState === "home") {
			setNavState(
				<HomePage
					safe={safe}
					setSelection={setSelection}
					setShowPopup={setShowPopup}
					setMoviePopup={setMoviePopup}
				/>
			);
		} else if (navState === "movie") {
			setNavState(
				<Movie
					safe={safe}
					setSelection={setSelection}
					setMoviePopup={setMoviePopup}
				/>
			);
		} else if (navState === "shows") {
			setNavState(
				<Shows setSelection={setSelection} setShowPopup={setShowPopup} />
			);
		} else if (navState === "upcoming") {
			setNavState(
				<Upcoming
					safe={safe}
					setSelection={setSelection}
					setMoviePopup={setMoviePopup}
					newMovieArray={newMovieArray}
				/>
			);
		} else if (navState === "search") {
			setNavState(
				<Search
					safe={safe}
					setSelection={setSelection}
					setMoviePopup={setMoviePopup}
					newMovieArray={newMovieArray}
					search={search}
				/>
			);
		}
	}, [safe, navState]);

	useEffect(() => {
		fetch("/userCountry")
			.then((res) => res.json())
			.then((result) => setLocation(result.location));
	}, []);

	useEffect(() => {
		fetch("/upcomingMovies", {
			headers: {
				location: location,
				Filter: safe,
			},
		})
			.then((res) => res.json())
			.then((arr) => setNewMovieArray(arr));
	}, [location, safe]);
	
  return (
    <>
			<Search></Search>
      <NavigationBar navState={navState} setNavState={setNavState} setSafe={setSafe} isDanger={isDanger} setDanger={setDanger} />
      {navState}
      {moviePopup === true && <MoviePopup selection={selection} setMoviePopup={setMoviePopup} />}
      {showPopup === true && <ShowPopup selection={selection} setShowPopup={setShowPopup} />}
    </>
  );
}

export default App;
