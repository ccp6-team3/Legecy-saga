import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Popup.css";
import { useState, useEffect } from "react";


const Reviews = (props) => {
  const {selection} = props;

  // const [reviews, setReviews] = useState([])

  // useEffect(()=> {
  //   setMovieID(selection.movieID)
  //   fetch("/reviewsMovie", {
  //     headers: {
  //       'movieID': selection.movieID
  //     }
  //   })
  //   .then((data) => data.json())
  //   .then((arr) => {  
  //     setReviews(arr)
  //   })
  // })

  // const headers = {
  //   'movieID': selection.movieID
  // }

  // useEffect(()=> {
  //   fetch("/reviewsMovie", headers)
  //   .then((data) => data.json())
  //   .then((arr) => {  
  //     setReviews(arr)
  //   })
  // })


  

  return (
    <>
      <h5><em>*This is the review submit form*</em></h5>
      <h5><em>bla</em></h5>
    </>
  )
}

export default Reviews;