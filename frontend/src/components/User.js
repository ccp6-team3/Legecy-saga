import "../styles/User.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, Profiler } from "react";

import Login from "./user/Login";
import Register from "./user/Register";
import Profile from "./user/Profile";

const User = (props) => {
  const {} = props;

  const [loginView, setLoginView] = useState("login");

  return (
    <>
      <div className="user-dev">
        {loginView === "login" && (
          <Login
            setLoginView={setLoginView}
          />
        )}

        {loginView === "registration" && (
          <Register setLoginView={setLoginView} />
        )}

        {loginView === "profile" && (
          <Profile setLoginView={setLoginView}/>
        )}
      </div>
    </>
  );
};

export default User;
