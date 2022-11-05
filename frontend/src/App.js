import "./App.css";
import NavigationBar from "./components/Navbar.js";
import HomePage from "./components/homepage/Homepage.js";
import Movie from "./components/Movie.js";
import Shows from "./components/Tvshows.js";
import User from "./components/User.js";
import Upcoming from "./components/Upcoming.js";
import Watchlist from "./components/Watchlist.js";
import MoviePopup from "./components/popups/MoviePopup.js";
import ShowPopup from "./components/popups/ShowPopup.js";
import Search from "./components/Search";
import DangerToast from "./components/DangerToast";

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
	const [isToastVisible, setToastVisible] = useState(false);

	//FOR SEARCH FUNCTION
	const [search, setSearch] = useState("");
	const [searchMoviesResultArray, setSearchMoviesResultArray] = useState([]);
	const [searchTVResultArray, setSearchTVResultArray] = useState([]);

	useEffect(() => {
		if (search === "") {
			setSearchMoviesResultArray([]);
			setSearchTVResultArray([]);
			setNavState("home");
		} else {
			fetch(`/searchMovies/${search}`, {
				headers: {
					location: location,
					Filter: safe,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setSearchMoviesResultArray(data);
					setNavState("search");
				});
			fetch(`/searchTV/${search}`, {
				headers: {
					location: location,
					Filter: safe,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setSearchTVResultArray(data);
					setNavState("search");
				});
		}
	}, [search]);

	const [isDanger, setDanger] = useState(false);
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
					setSelection={setSelection}
					setMoviePopup={setMoviePopup}
					setShowPopup={setShowPopup}
					search={search}
					setNavState={setNavState}
					searchMoviesResultArray={searchMoviesResultArray}
					searchTVResultArray={searchTVResultArray}
				/>
			);
		} else if (navState === "user") {
			setNavState(
				<User
					safe={safe}
					setSelection={setSelection}
					setMoviePopup={setMoviePopup}
					newMovieArray={newMovieArray}
				/>
			);
		} else if (navState === "watchlist") {
			setNavState(
				<Watchlist
					safe={safe}
					setSelection={setSelection}
					setMoviePopup={setMoviePopup}
					newMovieArray={newMovieArray}
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

	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			window.scrollY >= 300 ? setToastVisible(true) : setToastVisible(false);
		});
	});

	return (
		<>
			{!safe && isToastVisible && (
				<div className="sticky-top">
					<DangerToast
						isToastVisible={isToastVisible}
						setToastVisible={setToastVisible}
					/>
				</div>
			)}
			<NavigationBar
				navState={navState}
				setNavState={setNavState}
				setSafe={setSafe}
				isDanger={isDanger}
				setDanger={setDanger}
				safe={safe}
				isToastVisible={isToastVisible}
				setSearch={setSearch}
			/>
			{navState}
			{moviePopup === true && (
				<MoviePopup selection={selection} setMoviePopup={setMoviePopup} />
			)}
			{showPopup === true && (
				<ShowPopup selection={selection} setShowPopup={setShowPopup} />
			)}
		</>
	);
}

export default App;
