import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import '../styles/Navbar.css';

import "bootstrap/dist/css/bootstrap.min.css";





const NavigationBar = (props) => {
  const { navState, setNavState } = props;

  // const renderFunction = (state) => {
  //   if (state === "home") {

  //   } else if (state === "movies") {

  //   } else if (state === "shows") {

  //   } else if (state === "upcoming") {
      
  //   }
  // }

  // const changeState = (state) => {
  //   return setNavState(state);
  // }

    return (
        <>
          <div className="title-background">
            <h1 onClick={() => setNavState("home")} className="title">saga</h1>
          </div>

            {/* <Navbar.Brand onClick={() => setNavState("home")} id="navBrand" className="justify-content-md-center">Saga</Navbar.Brand> */}
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
                  // renderFunction(navState)
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
            {/* <Navbar bg="light" variant="light"></Navbar>
            
              <Navbar.Brand href="#home">Saga Home</Navbar.Brand>
              <Navbar.Link to="/genre">Genre</Navbar.Link>
              <Navbar.Link to="/releasedate">Date of Release</Navbar.Link>
             */}
        

        </>
    );
}

export default NavigationBar