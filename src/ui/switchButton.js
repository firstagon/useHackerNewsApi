import classes from "./switchButton.module.css";
import { useSelector } from 'react-redux';

const SwitchButton = (props) => {
  // console.log(props.title);
  const themeState = useSelector((state) => state.ui.theme);
// console.log(props.isActive)
  let themeMode = themeState ? '' : ' ' + classes._white;

  let buttStyle = props.isActive ? ' ' + classes.isActive : '';
  // if (themeState) {
  //   themeMode = '';
  // } else {
  //   themeMode = classes['white-mode'];
  // }

  return (
    
    <button onClick={props.onClick} className={classes.button + buttStyle + themeMode}>

      <span className={classes.buttonText}> {props.title} </span>
      
    </button>

  );
};

export default SwitchButton;
