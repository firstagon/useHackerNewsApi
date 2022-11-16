import classes from "./switchButton.module.css";
import { useSelector } from 'react-redux';

const SwitchButton = (props) => {
  // console.log(props.title);
  const themeState = useSelector((state) => state.ui.theme);

  let themeMode = themeState ? '' : ' ' + classes._white;
  // if (themeState) {
  //   themeMode = '';
  // } else {
  //   themeMode = classes['white-mode'];
  // }

  return (
    
    <button onClick={props.onClick} className={classes.button + themeMode}>

      {props.title}
      
    </button>
  );
};

export default SwitchButton;
