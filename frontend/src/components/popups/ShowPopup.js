import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Popup.css";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import Reviews from './Reviews.js';
import HPFooter from '../homepage/HPFooter';

const ShowPopup = (props) => {
  const { setShowPopup, selection } = props;

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="popup-page">
      <div className="popup-header"></div>
      <Card className="popup-container">
        <CloseButton className="closeBtn" onClick={closePopup}/>
        <Card.Img className="cardImg" src={selection.TvPoster}></Card.Img>
        <Card.Body className="cardBody">
          <h1 className="description">{selection.TvTitle}</h1>
          <h2 className="description">Rating: <strong>{selection.TvRating} / 10</strong></h2>
          <p className="description">{selection.TvDescription ? selection.TvDescription : <em>*No Description*</em>}</p>
        </Card.Body>
        <Reviews />
      </Card>
      <HPFooter />
    </div>
  )
}

export default ShowPopup;