import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Popup.css";
import { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';





const TV_Reviews = (props) => {
  const {selection} = props;

  const TvID = selection.TvID

  console.log(TvID)

  const [TVreviews, setTVReviews] = useState([])
  const [userReview, setUserReview] = useState("")

  const getTVReviews = (TvID) => {
    fetch("/reviewsTv", {
          headers: {
            'TvID': selection.TvID
          }
        })
        .then((data) => data.json())
        .then((arr) => {  
            setTVReviews(arr)
        })
  }

  useEffect(()=> {
    getTVReviews(TvID)
  },[])

  const renderCard = (card) => {
    return (
      <Card key={card.TvID} className="movieCard">
        <Card.Title className="movieTitle">
          {card.author}
        </Card.Title>
        <Card.Text>
          {card.review}
        </Card.Text>
      </Card>
    )
  };

  const postReview = (userReview) => {
    fetch("/TV/userReviewToDB", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tv_show_id: TvID,
        review: userReview
      })
    })
  }




  return (
    <>
      <h5><em>Users Reviews:</em></h5>
      <div className="movieSection">
        {TVreviews.map(renderCard)}
      </div>
      <h5><em>*This is the review submit form</em></h5>
      <Form>
        <Form.Group>
          <Form.Label>
            Your review will be anonymous, so please share your opinion.
          </Form.Label>
          <Form.Control onChange={(e) => setUserReview(e.target.value)} type="text" placeholder="Write your review here" />
        </Form.Group>
        <Button onClick={() => {postReview(userReview)}} variant="primary">
        Submit
        </Button>
      </Form>
    </>
  )
}

export default TV_Reviews;