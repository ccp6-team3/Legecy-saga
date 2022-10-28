// import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/Navbar.js' 
import HomePage from './components/homepage/Homepage.js' 
import Movie from './components/Movie.js' 
import Shows from './components/Tvshows.js' 
import Upcoming from './components/Upcoming.js' 
import MoviePopup from './components/popups/MoviePopup.js'
import ShowPopup from './components/popups/ShowPopup.js'
// import Navbar from 'react-bootstrap/Navbar'

import React, { useState, useEffect, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';




function App() {
  const [info, setInfo] = useState(null);
  const [navState, setNavState] = useState("home");
  const [safe, setSafe] = useState(null);
  const [newMovieArray, setNewMovieArray] = useState([]);
  const [moviePopup, setMoviePopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selection, setSelection] = useState([])
  // const [movieTitle, setMovieTitle] = useState(null);
  // const [movieImg, setMovieImg] = useState(null);

  // const [num, setNum] = useState(0);


  useEffect(() => {
    fetch("/upcomingMovies")
      .then(res => res.json())
      .then(arr => setNewMovieArray(arr))
  }, []);

  const fetchInfo = () => {
    return fetch('/test')
    .then((data) => {
      return data.json();
    })
    .then((dataJS) => {
      setInfo(dataJS);
    });
  };

  if (navState === "home") {
    setNavState(<HomePage setSelection={setSelection} setShowPopup={setShowPopup} setMoviePopup={setMoviePopup} />)
  } else if (navState === "movie") {
    setNavState(<Movie setSelection={setSelection} setMoviePopup={setMoviePopup} />)
  } else if (navState === "shows") {
    setNavState(<Shows setSelection={setSelection} setShowPopup={setShowPopup} />)
  } else if (navState === "upcoming") {
    setNavState(<Upcoming setSelection={setSelection} setMoviePopup={setMoviePopup} newMovieArray={newMovieArray} />)
  }
  // console.log(navState)


  return (
    <>
    <NavigationBar navState={navState} setNavState={setNavState}/>
    {navState}
    {moviePopup === true && <MoviePopup selection={selection} setMoviePopup={setMoviePopup}/>}
    {showPopup === true && <ShowPopup selection={selection} setShowPopup={setShowPopup}/>}
    {/* {moviePopup ? <MoviePopup selection={selection} setMoviePopup={setMoviePopup}/> : showPopup ? <ShowPopup selection={selection} setShowPopup={setShowPopup}/> : navState} */}
    {/* {() => {
      if (navState === "home") {
        return <p>Hello</p>;
      } else if (navState === "movies") {
      
      } else if (navState === "shows") {
      
      } else if (navState === "upcoming") {
        
      }
    }} */}

    {/* {
      navState === "home" ? 
      <HomePage movieTitle={movieTitle} movieImg={movieImg}/>  
      :
      <div></div>
    }
    {
      navState === "shows" ? 
      <HomePage movieTitle={movieTitle} movieImg={movieImg}/>  
      :
      <div></div>
    }
    {
      navState === "upcoming" ? 
      <HomePage movieTitle={movieTitle} movieImg={movieImg}/>  
      :
      <div></div>
    } */}
    
    
    {/*<Container fluid variant='primary' key='primary'>
      <Row>
        {/* <Col>
          <h1 id='title'>Saga</h1>
        </Col> }

        <Col>
        </Col>
      </Row>
    </Container>*/}

    {/* <Button variant="outline-primary" onClick={fetchInfo}>Fetch</Button>{' '}
    {info ? <div>{JSON.stringify(info)}</div> : <div></div>} */}
    {/* <button type="button" class="btn-success" onClick={fetch}>
          Fetch info:
    </button> */}
    </>
  );
}

export default App;
