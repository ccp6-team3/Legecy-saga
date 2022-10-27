import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Popup.css";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import Reviews from './Reviews.js';
import HPFooter from '../homepage/HPFooter';

const MoviePopup = (props) => {
  const { setMoviePopup, selection } = props;

  const closePopup = () => {
    setMoviePopup(false)
  }

  return (
    <div className="popup-page">
      <div className="popup-header"></div>
      <Card className="popup-container">
        <CloseButton className="closeBtn" onClick={closePopup}/>
        <Card.Img className="cardImg" src={selection.moviePoster}></Card.Img>
        <Card.Body className="cardBody">
          <h1 className="description">{selection.movieTitle}</h1>
          <h2 className="description">Rating: <strong>{selection.movieRating} / 10</strong></h2>
          <h3 className="description">Release: {selection.releaseDate}</h3>
          <p className="description">{selection.movieDescription ? selection.movieDescription : <em>*No description*</em>}</p>
        </Card.Body>
        <Reviews />
      </Card>
      <HPFooter />
    </div>
  )
}

export default MoviePopup;