import React, { useState } from "react";
import classes from "./header.module.css";
import { useDispatch } from "react-redux";
import { fetchNews } from "../store/news-actions";
import { uiActions } from "../store/ui-actions";

const Header = (props) => {

  const dispatch = useDispatch();

  const [buttClass, setButtClass] = useState({
    darkTheme: classes._dark,
    lightTheme: classes._white,
    isBlack: true,
  });

  let currTheme;

  if (buttClass.isBlack) {
    currTheme = buttClass.darkTheme;
  } else {
    currTheme = buttClass.lightTheme;
  }

  const themeHandler = () => {
    setButtClass((prevState) => {
      return { ...prevState, isBlack: !prevState.isBlack };
    });

    dispatch(uiActions.toggleTheme())
  };

  const refreshNewsHandler = () => {
    dispatch(fetchNews)
  }

  return (
    <React.Fragment>
      <div className={classes.header}>
        <p> something </p>
        <button
          onClick={themeHandler}
          className={`${classes.button} ${currTheme}`}
        > Theme </button>
        <button
          onClick={refreshNewsHandler}
          className={`${classes.button} ${currTheme}`}
        > Refresh news</button>
      </div>
    </React.Fragment>
  );
};

export default Header;
