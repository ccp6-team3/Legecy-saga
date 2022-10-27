import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Popup.css";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import Reviews from './Reviews.js';
import HPFooter from '../homepage/HPFooter';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const MoviePopup = (props) => {
  const { setMoviePopup, selection } = props;

  const closePopup = () => {
    setMoviePopup(false)
  }

  // const [reviews, setReviews] = useState([])
  // const getReviews = (movieID) =>{
  //   fetch("/reviewsMovie", {
  //     headers: {
  //       'movieID': movieID
  //     }
  //   })
  //   .then((data) => data.json())
  //   .then((arr) => {  
  //     setReviews(arr)
  //   })
  // }
  // useEffect(() => {
  //   getReviews(movieID)
  // },[movieID])


  

  return (
    <Modal show={true} onHide={closePopup}>
      <Card className="popup-container">
        <CloseButton className="closeBtn" onClick={closePopup}/>
        <Card.Img className="cardImg" src={selection.moviePoster}></Card.Img>
        <Card.Body className="cardBody">
          <h1 className="description">{selection.movieTitle}</h1>
          <h2 className="description">Rating: <strong>{selection.movieRating} / 10</strong></h2>
          <h3 className="description">Release: {selection.releaseDate}</h3>
          <p className="description">{selection.movieDescription ? selection.movieDescription : <em>*No description*</em>}</p>
        </Card.Body>
        <Reviews selection={selection} />
      </Card>
    </Modal>
    // <div className="popup-page">
    //   <div className="popup-header"></div>
      // <Card className="popup-container">
      //   <CloseButton className="closeBtn" onClick={closePopup}/>
      //   <Card.Img className="cardImg" src={selection.moviePoster}></Card.Img>
      //   <Card.Body className="cardBody">
      //     <h1 className="description">{selection.movieTitle}</h1>
      //     <h2 className="description">Rating: <strong>{selection.movieRating} / 10</strong></h2>
      //     <h3 className="description">Release: {selection.releaseDate}</h3>
      //     <p className="description">{selection.movieDescription ? selection.movieDescription : <em>*No description*</em>}</p>
      //   </Card.Body>
      //   <Reviews />
      // </Card>
    //   <HPFooter />
    // </div>
  )
}

export default MoviePopup;