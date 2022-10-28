import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Reviews.css";
import { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';





const Reviews = (props) => {
  const {selection} = props;

  const movieID = selection.movieID

  const [reviews, setReviews] = useState([])
  const [userReview, setUserReview] = useState("")
  const [submit, setSubmit] = useState(false);

  const getReviews = (movieID) => {
    fetch("/reviewsMovie", {
          headers: {
            'movieID': selection.movieID
          }
        })
        .then((data) => data.json())
        .then((arr) => {  
          setReviews(arr)
        })
  }

  useEffect(()=> {
    getReviews(movieID)
  },[])

  const renderCard = (card) => {
    return (
      <Card key={card.movieID} className="review-card">
        <Card.Title className="review-title">
          {card.author}
        </Card.Title>
        <Card.Text className="review-text">
          {card.review}
        </Card.Text>
      </Card>
    )
  };

  const postReview = (userReview) => {
    fetch("/movie/userReviewToDB", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movieID: movieID,
        review: userReview
      })
    })
    getReviews(movieID)
    showConfirmed()
  }

  const showConfirmed = () => {
    setSubmit(true);
  }


  return (
    <>
      <h5><em>Leave a review:</em></h5>
      <Form className="form">
        <Form.Group controlId="exampleForm.ControlTextarea1" className="form-group">
          <Form.Label>
            Your review will be anonymous, so please share your opinion.
          </Form.Label>
          <Form.Control as="textarea" rows="3" className="review-input" onChange={(e) => setUserReview(e.target.value)} type="text" placeholder="Write your review here" />
        </Form.Group>
        {submit ? <Alert className="review-success">🎉 Review submitted 🎉</Alert> : <Button className="submit-btn" onClick={() => {postReview(userReview)}} variant="outline-primary">Submit</Button>}
      </Form>
      <div className="review-section">
        {reviews.map(renderCard)}
      </div>
    </>
  )
}

export default Reviews;