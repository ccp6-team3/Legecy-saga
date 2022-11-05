import "../../styles/User.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useEffect } from "react";
import authService from "../services/auth.service";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Register = (props) => {
  const { setLoginView } = props;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [errPwd, setErrPwd] = useState("");

  return (
    <>
      <Container className="registration">
        <h1>Registration</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your user name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email address.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="form-label">Repeat Your Password</Form.Label>
            <Form.Control type="password" placeholder="Repeat your password" 
              onChange={(e) => {
                if(!e.target.value === password){
                  setErrPwd("passwords are wrong")
                } else {
                  setErrPwd("passwords confirmed")
                }
              }}/>
              <Form.Control.Feedback type="invalid">
              {errPwd}
              </Form.Control.Feedback>
          </Form.Group> */}

          <Button
            className="button"
            variant="primary"
            type="submit"
            onClick={() => {
              authService.signup(userName, email, password);
              if (err === "") {
                setLoginView("login");
              }
            }}
          >
            Sign up
          </Button>
          <br />

          <div className="login-div">
            <Form.Label>Do you have any accoust?</Form.Label>
            <Button
              id="signup"
              variant="link"
              onClick={() => {
                setLoginView("login");
              }}
            >
              Log in
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
