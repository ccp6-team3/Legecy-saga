import "../../styles/Homepage.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const HPMovies = (props) => {
  const { movieArray, setMoviePopup, setSelection } = props

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
      </Card>
    )
  };

  return (
    <div className="movieSection">
      {movieArray.map(renderCard)}
    </div>
  )
}

export default HPMovies;