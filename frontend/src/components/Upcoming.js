import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Upcoming.css";
import Card from "react-bootstrap/Card";
import HPFooter from "./homepage/HPFooter";
import { useEffect, useState } from "react";

const Upcoming = (props) => {
  const { safe, newMovieArray, setMoviePopup, setSelection } = props;

  const [movieArray, setMovieArray] = useState(newMovieArray)

  useEffect(()=> {
    setMovieArray(newMovieArray)
  },[safe])
  
  const renderCard = (card) => {
    return (
      <Card key={card.movieID} className="movieCard">
        <Card.Img 
          onClick={() => {
            setMoviePopup(true)
            setSelection(card)
          }} 
          className="moviePoster" 
          alt={`${card.movieTitle} poster`} 
          src={card.moviePoster}
        ></Card.Img>
        <Card.Title 
          onClick={() => {
            setMoviePopup(true)
            setSelection(card)
          }} 
          className="movieTitle"
        >{card.movieTitle}</Card.Title>
        <Card.Body className="releaseDate">{`Release Date: ${card.releaseDate}`}</Card.Body>
      </Card>
    )
  };



  return (
    <div className="movieSection">
      <h1 className="page-title">Upcoming Movies</h1>
      {movieArray.length == 0 ? <h3>"Sorry, there are no movies with your current search options"</h3> : movieArray.map(renderCard)}
      <HPFooter />
    </div>
  )
}
export default Upcoming