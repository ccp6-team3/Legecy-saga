import "../../styles/Homepage.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const HPShows = (props) => {
  const { showArray, setShowPopup, setSelection } = props

  const renderCard = (card) => {
    return (
      <Card key={card.TvID} className="movieCard">
      <Card.Img 
        onClick={() => {
          setShowPopup(true)
          setSelection(card)
        }} 
        className="moviePoster" 
        alt={`${card.TvTitle} poster`} 
        src={card.TvPoster}
      ></Card.Img>
      <Card.Title 
        onClick={() => {
          setShowPopup(true)
          setSelection(card)
        }} 
        className="movieTitle"
      >{card.TvTitle}</Card.Title>
      </Card>
    )
  };

  return (
    <div className="movieSection">
      {showArray.map(renderCard)}
    </div>
  )
}

export default HPShows;