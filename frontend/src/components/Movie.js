import "../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Movie = (props) => {
  const { safe, setMoviePopup, setSelection } = props;

  const [movieSort, setMovieSort] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieArray, setMovieArray] = useState([]);
  const [compoundFilter, setCompoundFilter] = useState({});

  const genreFetch = fetch("/movieGenres");
  const ratingFetch = fetch("/movieSortBy");

  useEffect(() => {
    Promise.all([genreFetch,ratingFetch])
    .then((promises) => {
      return Promise.all(promises.map(dataArr => dataArr.json()))
  
    })
    .then((arr) => {   
      setMovieGenres(arr[0]);
      setMovieSort(arr[1]);
    })

  },[])

  // combined search function that compounds searches 
  const updateCompound = (input) => {
    setCompoundFilter({...compoundFilter, ...input});
  }


  useEffect(() => {
    console.log(compoundFilter)
    if (Object.keys(compoundFilter).length !== 0) {
      fetch("/searchMovies", {
        headers: compoundFilter
      })
      .then((data) => data.json())
      .then((arr) => {  
        console.log(arr)
        setMovieArray(arr);
      })
    }
  },[compoundFilter])

  const resetShow = () => {
    setCompoundFilter({});
    setMovieArray([]);
  }

  const nameOverwrite = (imput) => {
    let y = ''
    for (let x=0; x < imput.length; x++) {
      if (imput[x] === '_' || imput[x] === ".") {
      y = y + " "
      } else {
       y = y + imput[x]
      }
    }
      return y
  }

  const movieCards = (arrayEl) => {


    return (
      <Card key={arrayEl.movieID} className="movieCard">
        {arrayEl.moviePoster !== "https://image.tmdb.org/t/p/originalnull" ? 
          <Card.Img 
            onClick={() => {
              setMoviePopup(true)
              setSelection(arrayEl)
            }} 
            className="moviePoster" 
            alt={`${arrayEl.movieTitle} poster`} 
            src={arrayEl.moviePoster} 
          />
          : <Card.Body className="moviePoster border d-flex align-items-center justify-content-center">
            Coming Soon
          </Card.Body>
        } 
        <Card.Title 
          onClick={() => {
            setMoviePopup(true)
            setSelection(arrayEl)
          }} 
          className="movieTitle">{arrayEl.movieTitle}
        </Card.Title>
      </Card>
    )
  }

  let movieRateArr = [0,1,2,3,4,5,6,7,8,9];



  const mapGenresArr = (arr) => {
    return (
      <NavDropdown.Item onClick = {() => updateCompound({"genre":arr.id , "Filter":safe})} >{arr.name}</NavDropdown.Item>
    )
  }

  const mapMovieRate = (i) => {
    return (
      <NavDropdown.Item onClick = {() => updateCompound({"rating":i , "Filter":safe})}>{i} and up</NavDropdown.Item>
      )
  }

  const mapOtherArr = (arr) => {
    return (
      <NavDropdown.Item onClick = {() => updateCompound({"sort_by":arr , "Filter":safe})}>{nameOverwrite(arr)}</NavDropdown.Item>
    )
  }

  return(
  <>
  <Navbar bg="light" expand="md">
    <Container fluid>
        <div >
          <h1 id="filter-by">Filter By:</h1>
        </div>

      <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '250px' }}
            navbarScroll
          >
            <NavDropdown title="Genre" id="navbarScrollingDropdown" >
              {movieGenres.map(mapGenresArr)}
            </NavDropdown>

            <NavDropdown title="Rating" id="navbarScrollingDropdown">
              {movieRateArr.map(mapMovieRate)}
            </NavDropdown>

            <NavDropdown title="Other" id="navbarScrollingDropdown">
              {movieSort.map(mapOtherArr)}
            </NavDropdown>

          </Nav>

          <Nav>
            <Button className="d-grid gap-2" variant="outline-dark" onClick={resetShow}>Reset Filters</Button>
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