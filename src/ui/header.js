import React, { useState } from "react";
import classes from "./header.module.css";
import { useDispatch } from "react-redux";
import { fetchNews } from "../store/news-actions";
import { uiActions } from "../store/ui-actions";
import { useHistory } from "react-router-dom";

const Header = (props) => {

  const history = useHistory();

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

  const backHandler = () => {
    history.push('/')
  }

  const refreshHandler = () => {
    props.refresh(true);

  }

  const headerMain = (
    <div className={classes.header} >
      <button
      onClick={themeHandler}
      className={`${classes.button} ${currTheme}`}
      > Theme </button>
      <button
      onClick={refreshNewsHandler}
      className={`${classes.button} ${currTheme}`}
      > Refresh news</button>
  </div>
  );

  const headerItem = (
    <div className={classes.headerItem} >
      <div className={classes.headerItem_container}>
        <button
        onClick={backHandler}
        className={classes.button + ' ' + currTheme}> Back</button>
        <button
        onClick={themeHandler}
        className={`${classes.button} ${currTheme}`}> Theme </button>
      </div>
      <button
      onClick={refreshHandler}
      className={classes.button + ' ' + currTheme}> Refresh
      </button>
    </div>
  )
  

  return (
    <React.Fragment>
      {props.isItem ? headerItem : headerMain}

    </React.Fragment>
  );
};

export default Header;
