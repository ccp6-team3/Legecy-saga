import Nav from 'react-bootstrap/Nav'
import '../styles/Navbar.css';
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const NavigationBar = (props) => {
  const { navState, setNavState } = props;
  const [adultFilter, setAdultFilter] = useState("Off")

  const toggleFilter = () => {
    if (adultFilter === "Off") {
      return "On";
    } else {
      return "Off";
    }
  }

  return (
    <>
      <div className="title-background">
        <h1 onClick={() => setNavState("home")} className="title">saga</h1>
        <Button className="float-end" size="lg" variant="outline-danger" onClick={() => setAdultFilter(toggleFilter)}>Safe mode: {`${adultFilter}`}</Button>
      </div>
      <Nav variant="tabs" className="nav justify-content-center" defaultActiveKey="#home">
        <Nav.Item className="nav-item">
          <Nav.Link onClick={() => {
            setNavState("home")
          }}
          eventKey="#home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("movie")
            }
          }
          eventKey="#movie">Movies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("shows")
            }
          } eventKey="#shows">TV Shows</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("upcoming")
            }
          } eventKey="#upcoming">Upcoming</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default NavigationBar