import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const Search = (props) => {
	const {
		setSelection,
		setMoviePopup,
		setShowPopup,
		searchMoviesResultArray,
		searchTVResultArray,
	} = props;

	const renderCardMovies = (card) => {
		return (
			<Card key={card.movieID} className="movieCard">
				<Card.Img
					onClick={() => {
						setMoviePopup(true);
						setSelection(card);
					}}
					className="moviePoster"
					alt={`${card.movieTitle} poster`}
					src={card.moviePoster}
				></Card.Img>
				<Card.Title
					onClick={() => {
						setMoviePopup(true);
						setSelection(card);
					}}
					className="movieTitle"
				>
					{card.movieTitle}
				</Card.Title>
			</Card>
		);
	};

	const renderCardTVShows = (card) => {
		return (
			<Card key={card.TvID} className="movieCard">
				<Card.Img
					onClick={() => {
						setShowPopup(true);
						console.log(card);
						setSelection(card);
					}}
					className="moviePoster"
					alt={`${card.TvTitle} poster`}
					src={card.TvPoster}
				></Card.Img>
				<Card.Title
					onClick={() => {
						setShowPopup(true);
						setSelection(card);
					}}
					className="movieTitle"
				>
					{card.TvTitle}
				</Card.Title>
			</Card>
		);
	};

	return (
		<>
			{searchMoviesResultArray.length > 0 ? (
				<h1 className="movieHeader">Movie Results</h1>
			) : (
				""
			)}
			<div className="movieSection">
				{searchMoviesResultArray.map(renderCardMovies)}
			</div>
			{searchMoviesResultArray.length > 0 ? (
				<h1 className="movieHeader">TV Show Results</h1>
			) : (
				""
			)}
			<div className="movieSection">
				{searchTVResultArray.map(renderCardTVShows)}
			</div>
		</>
	);
};

export default Search;
