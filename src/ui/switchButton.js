import classes from "./switchButton.module.css";

const SwitchButton = (props) => {
  // console.log(props.title);
  return (
    <button onClick={props.onClick} className={classes.button}>

      {props.title}
      
    </button>
  );
};

export default SwitchButton;
