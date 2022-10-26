import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Upcoming.css";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";


const Upcoming = (props) => {
  const { newMovieArray, setNewMovieArray } = props;

  useEffect(() => {
    fetch("/upcomingMovies")
      .then(res => res.json())
      .then(arr => setNewMovieArray(arr))
  }, []);

  const renderCard = (card) => {
    return (
      <Card key={card.movieID} className="movieCard">
        <Card.Img className="moviePoster" alt={`${card.movieTitle} poster`} src={card.moviePoster}></Card.Img>
        <Card.Title className="movieTitle">{card.movieTitle}</Card.Title>
        <Card.Body className="releaseDate">{`Release Date: ${card.releaseDate}`}</Card.Body>
      </Card>
    )
  };

  return (
    <div className="movieSection">
      <h1 className="page-title">Upcoming Movies</h1>
      {newMovieArray.map(renderCard)}
    </div>
  )
}
export default Upcoming