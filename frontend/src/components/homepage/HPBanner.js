import "../../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

const HPBanner = (props) => {
  const { bannerArray } = props;

  const renderCard = (card) => {
    return (
        <Carousel.Item key={card.movieID} className="banner">
          <img 
            className="moviePoster" 
            src={card.moviePoster}
            alt={`${card.movieTitle} poster`}
          />
          <Carousel.Caption className="caption firstCaption">
            <h1>{card.movieTitle}</h1>
            <h2>Rating: <strong>{card.movieRating} / 10</strong></h2>
            <h3>Release Date</h3>
            <p>{card.movieDescription}</p>
            <Button>Click for details</Button>
          </Carousel.Caption>
        </Carousel.Item>
    )
  };

  return (
    <>
      <Carousel interval={null}>
        {bannerArray.map(renderCard)}
      </Carousel>
    </>
  )
};

export default HPBanner;