import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Upcoming.css";
import Card from "react-bootstrap/Card";
import HPFooter from "./homepage/HPFooter";
import { useEffect } from "react";


const Upcoming = (props) => {
  const { newMovieArray, setMoviePopup, setSelection } = props;

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
      {newMovieArray.map(renderCard)}
      <HPFooter />
    </div>
  )
}
export default Upcoming