import { useRef } from "react";
import { useDispatch } from "react-redux";
import { listActions } from "../../store/listSlice";
import TextField from "@mui/material/TextField";

import classes from "./Input.module.css";

const Input = () => {
  const dispatch = useDispatch();

  let inputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let enteredItem = inputRef.current.value;

    const data = { text: enteredItem, id: Date.now() };

    inputRef.current.value = "";

    dispatch(listActions.addItem(data));

    fetch("https://shopping-list-f3bcd-default-rtdb.europe-west1.firebasedatabase.app/list.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    
  };

  return (
    <div className={classes.div}>
      <form onSubmit={onSubmitHandler}>
        <TextField
          className={classes.input}
          id="standard-basic"
          label="Add item"
          variant="standard"
          inputRef={inputRef}
        />
      </form>
    </div>
  );
};

export default Input;
