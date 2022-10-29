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

const Movie = (props) => {
  const { setMoviePopup, setSelection } = props;

  const [movieSort, setMovieSort] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieArray, setMovieArray] = useState([]);
  const [compoundFilter, setCompoundFilter] = useState({});
  
  const genreFetch = fetch("/movieGenres");
  const ratingFetch = fetch("/movieSortBy");

  useEffect(() => {
    Promise.all([genreFetch,ratingFetch])
    .then((promises) => {
      // returns two promises that need to be json() and passed on to next .then
      // return promises[0].json() // makes arr into genre array?
      return Promise.all(promises.map(dataArr => dataArr.json()))
  
    })
    .then((arr) => {   
      // console.log(arr)   
      setMovieGenres(arr[0]);
      setMovieSort(arr[1]);
    })

  },[])


  // useEffect(() => {
  //   fetch("/movieGenres")
  //   .then((data) => data.json())
  //   .then((arr) => {      
  //     setMovieGenres(arr);
  //   })
  // },[])

  // useEffect(() => {
  //   fetch("/movieSortBy")
  //   .then((data) => data.json())
  //   .then((arr) => {  
  //     setMovieSort(arr);
  //   })
  // },[])


  // combined search function that compounds searches 

  const updateCompound = (input) => {
    setCompoundFilter({...compoundFilter, ...input});
  }

  //{genre: 18, rating:6, sort_by:yay}

  useEffect(() => {
    //{type: id/num}
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

  // const filterByGenre = (genre) => {
  //   fetch("/searchMovies", {
  //     headers: {
  //       'genre': genre
  //     }
  //   })
  //   .then((data) => data.json())
  //   .then((arr) => {  
  //     // setMovieArray(arr.slice(0,10))
  //     setMovieArray(arr)
  //   })
  // }

  // const filterByRating = (rating) => {
  //   fetch("/searchMovies", {
  //     headers: {
  //       'rating': rating
  //     }
  //   })
  //   .then((data) => data.json())
  //   .then((arr) => {  
  //     // setMovieArray(arr.slice(0,10))
  //     setMovieArray(arr)
  //   })
  // }

  // const filterByOther = (otherField) => {
  //   fetch("/searchMovies", {
  //     headers: {
  //       'sort_by': otherField
  //     }
  //   })
  //   .then((data) => data.json())
  //   .then((arr) => {  
  //     // setMovieArray(arr.slice(0,10))
  //     setMovieArray(arr)
  //   })
  // }

  // async function fuckOff() {
  //   const typesOfFuck = ["asshole","because","bucket","bye"];
  //   const type = typesOfFuck[Math.floor(Math.random() * typesOfFuck.length)];
  //   const from = "Saga Team ;)"

  //   const result = await fetch(`https://foaas.com/${type}/${from}`,{
  //     headers: {
  //       'Accept': 'application/json'
  //     }
  //   })
  //   const jsResult = await result.json();
  //   return jsResult;
  // }
  const resetShow = () => {
    setCompoundFilter({});
    setMovieArray([]);
  }

  const movieCards = (arrayEl) => {
  //   let fuckOffMessage;
    
  //   fuckOff().then((data) => {
  //     fuckOffMessage = data.message + data.subtitle;
  //     console.log(fuckOffMessage)
  //     return fuckOffMessage;
  //   })

    return (
      <Card key={arrayEl.movieID} className="movieCard">
        <Card.Img 
          onClick={() => {
            setMoviePopup(true)
            setSelection(arrayEl)
          }} 
          className="moviePoster" 
          alt={`${arrayEl.movieTitle} poster`} 
          src={arrayEl.moviePoster} 
        />
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

  

  // const mapGenresArr = (arr) => {
  //   return (
  //     <NavDropdown.Item /*href={`#${arr.name}`}*/ onClick = {() => filterByGenre(arr.id)}>{arr.name}</NavDropdown.Item>
  //   )
  // }
  
  // const mapMovieRate = (i) => {
  //   return (
  //     <NavDropdown.Item /*href={`#${i}`}*/ onClick = {() => filterByRating(i)}>{i} and up</NavDropdown.Item>
  //     )
  // }

  // const mapOtherArr = (arr) => {
  //   return (
  //     <NavDropdown.Item /*href={`#${arr}`}*/ onClick = {() => filterByOther(arr)}>{arr}</NavDropdown.Item>
  //   )
  // }

  // using useEffect and compound
  let movieRateArr = [0,1,2,3,4,5,6,7,8,9];


  const mapGenresArr = (arr) => {
    return (
      <NavDropdown.Item /*href={`#${arr.name}`}*/ onClick = {() => updateCompound({"genre":arr.id})} >{arr.name}</NavDropdown.Item>
    )
  }

  const mapMovieRate = (i) => {
    return (
      <NavDropdown.Item /*href={`#${i}`}*/ onClick = {() => updateCompound({"rating":i})}>{i} and up</NavDropdown.Item>
      )
  }

  const mapOtherArr = (arr) => {
    return (
      <NavDropdown.Item /*href={`#${arr}`}*/ onClick = {() => updateCompound({"sort_by":arr})}>{arr}</NavDropdown.Item>
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