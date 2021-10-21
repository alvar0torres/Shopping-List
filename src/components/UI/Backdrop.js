import classes from "./Backdrop.module.css";

const Backdrop = (props) => {

    const closeHandler = () => {
        props.close()
    }

    return <div onClick={closeHandler} className={classes.backdrop}></div>
}

export default Backdrop;