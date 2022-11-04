import "../../styles/User.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useEffect } from "react";
import authService from "../services/auth.service";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = (props) => {
  const { user, setUser, setLoginView } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  return (
    <>
      <Container className="login">
        <h1>Log in</h1>
        <Form>
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

          <Button
            className="button"
            variant="primary"
            type="submit"
            onClick={async () => {
              await authService.login(email, password).then((res) => {
                authService.getUserData(res.accessToken).then((res) => {
                  localStorage.setItem("userData", JSON.stringify(res));
                  if (err === "") {
                    setLoginView("profile");
                  }
                });
              });
            }}
          >
            Log in
          </Button>

          <br />
          <div id="signup-div">
            <Form.Label>Need an Account?</Form.Label>
            <Button
              id="signup"
              variant="link"
              onClick={() => {
                setLoginView("registration");
              }}
            >
              Sign up
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
