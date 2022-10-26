import "../../styles/Homepage.css";

const HPFooter = () => {
  return (
    <div className="footer-container">
      <p className="disclaimer">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      <img className="dblogo" alt="TMDB logo" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"></img>
      <p><a href="https://www.themoviedb.org/">https://www.themoviedb.org/</a></p>
    </div>
  )
}

export default HPFooter;