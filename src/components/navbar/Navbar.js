import Button from "@mui/material/Button";
import classes from "./Navbar.module.css";

import { authActions } from "../../store/auth-context";
import { useDispatch } from "react-redux";

const Navbar = (props) => {
  const dispatch = useDispatch();

  const showSignupHandler = () => {
    props.setSignup(true);
  };

  const showLoginHandler = () => {
    props.setLogin(true);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className={classes.navbar}>
      <h2>Shopping List</h2>
      <ul className={classes.list}>
        {!props.isLoggedIn && (
          <li>
            <Button onClick={showSignupHandler} variant="contained">
              Sign Up
            </Button>
          </li>
        )}
        {!props.isLoggedIn && (
          <li>
            <Button onClick={showLoginHandler} variant="contained">
              Login
            </Button>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Button onClick={logoutHandler} variant="contained">
              Logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
