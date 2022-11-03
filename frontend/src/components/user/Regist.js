// import "../../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useEffect } from "react";
import { signup } from "../services/auth.service";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Regist = async (props) => {
  const { setCurrentView } = props;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <Container>
    </Container>
    </>
  )
};

export default Regist