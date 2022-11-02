import Nav from 'react-bootstrap/Nav'
import '../styles/Navbar.css';
import { useEffect, useState, useRef } from "react";
import logo from "../sagaLarge.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const NavigationBar = (props) => {
  const { navState, setNavState, setSafe, isDanger, setDanger, safe } = props;
  const [adultFilter, setAdultFilter] = useState("Off")
  const homeRef = useRef(null)

  const toggleFilter = () => {
    if (adultFilter === "Off") {
      return "On";
    } else {
      return "Off";
    }
  }

  useEffect(() => {
    if (adultFilter === "On") {
      setSafe(true)
    }
    else {
      setSafe(false)
    }
  }, [adultFilter])

  return (
    <>

      <div className={isDanger ? "title-background" : "title-background-danger"}>
        <img className={isDanger ? "title" : "title-danger"} alt="saga logo" src={logo} onClick={() => setNavState("home")} ref={homeRef} />



        <Button className="float-end" size="lg" variant={isDanger ? "outline-danger" : "warning"}
          onClick={() => {
            homeRef.current.click()
            setSafe(!safe)
            setAdultFilter(toggleFilter);
            setDanger(!isDanger);
          }
          } >Safe mode: {`${adultFilter}`}</Button>


      </div>
      <Nav variant="tabs" className="nav justify-content-center" defaultActiveKey="#home">
        <Nav.Item className="nav-item" >
          <Nav.Link onClick={() => {
            setNavState("home")
          }}
            href="#home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("movie")
          }
          }
            href="#movie">Movies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("shows")
          }
          } href="#shows">TV Shows</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("upcoming")
          }
          } href="#upcoming">Upcoming</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default NavigationBar