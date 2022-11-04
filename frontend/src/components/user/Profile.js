import "../../styles/User.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useEffect } from "react";
import authService from "../services/auth.service";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Profile = (props) => {
  const { setLoginView } = props;

  const [err, setErr] = useState("");

  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Container className="profile">
        <h1>Your Profile</h1>

        <Card className="profile-card">
          <Card.Title className="user-name">{user[0].userName}</Card.Title>
          <Card></Card>
          <Card.Title className="card-title">user id:</Card.Title>
          <Card.Text className="card-text">{user[0].userId}</Card.Text>
          <Card.Title className="card-title">email address</Card.Title>
          <Card.Text className="card-text">{user[0].userEmail}</Card.Text>
        </Card>
        <Button
          className="button"
          onClick={() => {
            authService.logout();
            setLoginView("login");
          }}
        >
          Log out
        </Button>
      </Container>
    </>
  );
};

export default Profile;
