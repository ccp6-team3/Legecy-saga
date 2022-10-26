import "../../styles/Homepage.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const HPMovies = (props) => {
  const { movieArray } = props

  const renderCard = (card) => {
    return (
      <Card key={card.movieID} className="movieCard">
      <Card.Img className="moviePoster" alt={`${card.movieTitle} poster`} src={card.moviePoster}></Card.Img>
      <Card.Title className="movieTitle">{card.movieTitle}</Card.Title>
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