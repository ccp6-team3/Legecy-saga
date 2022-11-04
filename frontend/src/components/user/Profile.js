import "../../styles/User.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useEffect } from "react";
import authService from "../services/auth.service";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Profile = (props) => {
  const { user, setLoginView } = props;

  const [err, setErr] = useState("");


  return (
    <>
      {user === "" && (
        <Button/>
      )}

      <Container className="profile">
        <h1>Your Profile</h1>
        <h2>user id: {user[0].userId}</h2>
        <h2>username: {user[0].userName}</h2>
        <h2>email address: {user[0].userEmail}</h2>
        <Button
          onClick={()=>{
            // authService.logout()
            setLoginView("login")
          }}
        >
          Log out
        </Button>
      </Container>
    </>
  );
};

export default Profile;
