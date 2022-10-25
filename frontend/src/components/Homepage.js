import "../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect, useRef } from 'react';


const HomePage = (props) => {
  const { movieTitle, movieImg } = props;

  return (
    <>
      <Container>
        <Row>
          {/* <Col md={{ span: 4, offset: 4 }}> */}
          <Card style={{ width: '90rem' }} className="text-center">
            <Card.Img variant="top" className="moviePoster" src="https://m.media-amazon.com/images/I/71BPuv+iRbL.jpg" />
            <Card.Body>
              {/* <Card.Title>{movieTitle}</Card.Title> */}
              <Card.Title>Back to the Future</Card.Title>
              {/* <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text> 
              <Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
          </Card>
          {/* </Col> */}
        </Row>
      </Container>
      <Container></Container>
      <Container></Container>
    </>
  )
};

export default HomePage;