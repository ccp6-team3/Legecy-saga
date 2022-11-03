import "../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import Login from "./user/Login";
import Regist from "./user/Regist";

const User = (props) => {
  const { safe, newMovieArray, setMoviePopup, setSelection } = props;

  const [user, setUser] = useState("");
  const [currentView, setCurrentView] = useState("login");

  return (
    <>
      <div className="user-dev">
        {currentView === "login" && (
          <Login
            user={user}
            setUser={setUser}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "registration" && (
          <Regist setCurrentView={setCurrentView} />
        )}
      </div>
    </>
  );
};

export default User;
