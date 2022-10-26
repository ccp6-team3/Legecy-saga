// import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/Navbar.js' 
import HomePage from './components/homepage/Homepage.js' 
import Movie from './components/Movie.js' 
import Shows from './components/Tvshows.js' 
import Upcoming from './components/Upcoming.js' 
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
  // const [movieTitle, setMovieTitle] = useState(null);
  // const [movieImg, setMovieImg] = useState(null);

  // const [num, setNum] = useState(0);

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
    setNavState(<HomePage/>)
  } else if (navState === "movie") {
    setNavState(<Movie/>)
  } else if (navState === "shows") {
    setNavState(<Shows/>)
  } else if (navState === "upcoming") {
    setNavState(<Upcoming newMovieArray={newMovieArray} setNewMovieArray={setNewMovieArray}/>)
  }
  // console.log(navState)


  return (
    <>
    <NavigationBar navState={navState} setNavState={setNavState}/>
    {navState}
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
