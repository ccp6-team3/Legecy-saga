import "../styles/Tvshows.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

const TVFilter = (props) => {
  const {} = props;

  // useEffect(() => {
  //   fetch("/showGenres")
  //   .then((data) => data.json())
  //   .then((arr) => {      
  //     setMovieGenres(arr);
  //   })
  // },[])

  const [showGenre, setShowGenre] = useState("");

  return (
    <div className="filter-container">
      <h1 className="filter-title">Filter by:</h1>
      <ButtonGroup className="btn-group">
        <DropdownButton as={ButtonGroup} title="Genre">
          <Dropdown.Item eventKey="1">Dropdown Link 1</Dropdown.Item>
          <Dropdown.Item eventKey="2">Dropdown Link 2</Dropdown.Item>
          <Dropdown.Item eventKey="3">Dropdown Link 3</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </div>
  )
}

export default TVFilter;