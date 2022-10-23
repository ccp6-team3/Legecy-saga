// import logo from './logo.svg';
import './App.css';
import NavigationBar from './componets/Navbar.js'

import React from 'react';
import { useState, useEffect, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function App() {
  const [info, setInfo] = useState(null);
  // const [num, setNum] = useState(0);

  const Fetch = () => {
    return fetch('/test')
    .then((data) => {
      return data.json();
    })
    .then((dataJS) => {
      setInfo(dataJS);
    });
  };


  return (
    <>
    <NavigationBar />
    {/*<Container fluid variant='primary' key='primary'>
      <Row>
        {/* <Col>
          <h1 id='title'>Saga</h1>
        </Col> }

        <Col>
        </Col>
      </Row>
    </Container>*/}

    <Button variant="outline-primary" onClick={Fetch}>Fetch</Button>{' '}
    {info ? <div>{JSON.stringify(info)}</div> : <div></div>}
    {/* <button type="button" class="btn-success" onClick={fetch}>
          Fetch info:
    </button> */}
    </>
  );
}

export default App;
