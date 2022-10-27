import "../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Movie = () => {
  const [movieSort, setMovieSort] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieArray, setMovieArray] = useState([]);

  useEffect(() => {
    fetch("/movieGenres")
    .then((data) => data.json())
    .then((arr) => {      
      setMovieGenres(arr);
    })
  },[])

  useEffect(() => {
    fetch("/movieSortBy")
    .then((data) => data.json())
    .then((arr) => {  
      setMovieSort(arr);
    })
  },[])

  const filterByGenre = (genre) => {
    fetch("/searchMovies", {
      headers: {
        'genre': genre
      }
    })
    .then((data) => data.json())
    .then((arr) => {  
      setMovieArray(arr.slice(0,4))
    })
  }

  const filterByRating = (rating) => {
    fetch("/searchMovies", {
      headers: {
        'rating': rating
      }
    })
    .then((data) => data.json())
    .then((arr) => {  
      setMovieArray(arr.slice(0,4))
    })
  }

  const movieCards = (arrayEl) => {
    return (
      <Card key={arrayEl.movieID} className="movieCard">
        <Card.Img className="moviePoster" alt={`${arrayEl.movieTitle} poster`} src={arrayEl.moviePoster} />
        <Card.Title className="movieTitle">{arrayEl.movieTitle}</Card.Title>
      </Card>
    )
  }

  

  const mapGenresArr = (arr) => {
    return (
      <NavDropdown.Item href={`#${arr.name}`} onClick = {() => filterByGenre(arr.id)} >{arr.name}</NavDropdown.Item>
    )
  }

  let movieRateArr = [0,1,2,3,4,5,6,7,8,9];

  const mapMovieRate = (i) => {
    return (
      <NavDropdown.Item href={`#${i}`} onClick = {() => filterByRating(i)}>{i} and up</NavDropdown.Item>
      )
  }

  const mapOtherArr = (arr) => {
    return (
      <NavDropdown.Item href={`#${arr}`}>{arr}</NavDropdown.Item>
    )
  }

  return(
  <>
  <Navbar bg="light" expand="lg">
        <Container fluid>
        <div >
          <h1 id="filter-by">Filter By:</h1>
        </div>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Genre" id="navbarScrollingDropdown">
              {movieGenres.map(mapGenresArr)}
            </NavDropdown>

            <NavDropdown title="Rating" id="navbarScrollingDropdown">
              {movieRateArr.map(mapMovieRate)}
            </NavDropdown>

            <NavDropdown title="Other" id="navbarScrollingDropdown">
              {movieSort.map(mapOtherArr)}
            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div className="movieSection">
      {movieArray.length>0 ? movieArray.map(movieCards) : <div></div>}
    </div>

  </>
  )
}
export default Movie