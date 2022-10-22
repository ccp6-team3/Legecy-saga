import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'




const NavigationBar = () => {
    return (
        <>
            <Nav fill variant="tabs" defaultActiveKey="/home">
              <Navbar.Brand href="#home">Saga</Navbar.Brand>
              <Nav.Item>
                <Nav.Link eventKey="/genre">Genre</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/releasedate">Date of Release</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/rating">Rating</Nav.Link>
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