import React, { useState, useEffect } from "react";

const Search = (props) => {
	const [searchResult, setSearchResult] = useState([]);

	// useEffect(() => {
	// 	fetch("/search").then((res) => res.json());
	// });

	return (
		<>
			<p>This is from the Search</p>
			<button
				onClick={() => {
					fetch("/search")
						.then((res) => res.json())
						.then((arr) => console.log(arr));
				}}
			></button>
		</>
	);
};

export default Search;
