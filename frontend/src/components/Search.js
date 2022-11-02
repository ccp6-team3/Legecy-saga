import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const Search = (props) => {
	const [search, setSearch] = useState([""]);
	const [searchResultArray, setSearchResultArray] = useState([]);

	useEffect(() => {
		fetch(`/search/${search}`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setSearchResultArray(data);
			});
	}, [search]);

	const renderCard = (card) => {
		return (
			<Card key={card.movieID} className="movieCard">
				<Card.Img
					// onClick={() => {
					// 	setMoviePopup(true);
					// 	setSelection(card);
					// }}
					className="moviePoster"
					alt={`${card.movieTitle} poster`}
					src={card.moviePoster}
				></Card.Img>
				<Card.Title
					// onClick={() => {
					// 	setMoviePopup(true);
					// 	setSelection(card);
					// }}
					className="movieTitle"
				>
					{card.movieTitle}
				</Card.Title>
			</Card>
		);
	};

	return (
		<>
			<p>This is from the Search</p>
			<input
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			></input>
			<div className="movieSection">{searchResultArray.map(renderCard)}</div>
			{/* {searchResultArray.forEach((data) => {
				<div className="movieHeader">HELLO</div>;
				console.log(data);
			})} */}
		</>
	);
};

export default Search;
