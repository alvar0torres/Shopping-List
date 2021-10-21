import { useRef, useState } from "react";
import Alert from "@mui/material/Alert";

import Modal from "../UI/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import classes from "./SignUp.module.css";

const SignUp = (props) => {
  const emailInput = useRef();
  const passInput = useRef();
  const [error, setError] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const data = {
      email: emailInput.current.value,
      password: passInput.current.value,
      returnSecureToken: true,
    };

    emailInput.current.value = "";
    passInput.current.value = "";

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOVo9o852i-1OwehsPZMMoHqOFMxfjQyk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error.message);
          setError(data.error.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal>
      <div>
        <h1 className={classes.title}>Sign Up</h1>
      </div>
      <form className={classes.signup} onSubmit={onSubmitHandler}>
        <TextField
          className={classes.user}
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          type="email"
          inputRef={emailInput}
        />
        <TextField
          className={classes.pass}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          inputRef={passInput}
        />
        <Button className={classes.btn} variant="contained" type="submit">
          Register
        </Button>
      </form>
      {error && (
        <Alert className="alerta" severity="error">
          {error}
        </Alert>
      )}
    </Modal>
  );
};

export default SignUp;
