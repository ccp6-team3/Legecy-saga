import "../styles/Tvshows.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Tvshows = () => {
  const [showSort, setShowSort] = useState([]);
  const [showGenres, setShowGenres] = useState([]);
  const [showArray, setShowArray] = useState([]);

  useEffect(() => {
    fetch("/tvGenres")
    .then((data) => data.json())
    .then((arr) => {      
      setShowGenres(arr);
    })
  },[])
  
  // console.log(showGenres)

  useEffect(() => {
    fetch("/tvSortBy")
    .then((data) => data.json())
    .then((arr) => {  
      setShowSort(arr);
    })
  },[])

  const filterByGenre = (genre) => {
    fetch("/searchTV", {
      headers: {
        'genre': genre
      }
    })
    .then((data) => data.json())
    .then((arr) => {  
      setShowArray(arr.slice(0,4)) 
    })
  }

  const filterByRating = (rating) => {
    fetch("/searchTV", {
      headers: {
        'rating': rating
      }
    })
    .then((data) => data.json())
    .then((arr) => {  
      setShowArray(arr.slice(0,4))
    })
  }

  const filterByOther = (otherField) => {
    fetch("/searchTV", {
      headers: {
        'sort_by': otherField
      }
    })
    .then((data) => data.json())
    .then((arr) => {  
      setShowArray(arr.slice(0,4))
    })
  }

  const showCards = (arrayEl) => {
    return (
      <Card key={arrayEl.TvId} className="movieCard">
        <Card.Img className="moviePoster" alt={`${arrayEl.TvTitle} poster`} src={arrayEl.TvPoster} />
        <Card.Title className="movieTitle">{arrayEl.TvTitle}</Card.Title>
      </Card>
    )
  }

  const mapGenresArr = (arr) => {
    return (
      <NavDropdown.Item /*href={`#${arr.name}`}*/ onClick = {() => filterByGenre(arr.id)} >{arr.name}</NavDropdown.Item>
    )
  }

  let showRateArr = [0,1,2,3,4,5,6,7,8,9];

  const mapShowRate = (i) => {
    return (
      <NavDropdown.Item /*href={`#${i}`}*/ onClick = {() => filterByRating(i)}>{i} and up</NavDropdown.Item>
      )
  }

  const mapOtherArr = (arr) => {
    return (
      <NavDropdown.Item /*href={`#${arr}`}*/ onClick = {() => filterByOther(arr)}>{arr}</NavDropdown.Item>
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
              {showGenres.map(mapGenresArr)}
            </NavDropdown>

            <NavDropdown title="Rating" id="navbarScrollingDropdown">
              {showRateArr.map(mapShowRate)}
            </NavDropdown>

            <NavDropdown title="Other" id="navbarScrollingDropdown">
              {showSort.map(mapOtherArr)}
            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div className="movieSection">
      {showArray.length>0 ? showArray.map(showCards) : <div></div>}
    </div>

  </>
  )
}
export default Tvshows;