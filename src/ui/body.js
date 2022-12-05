import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../store/news-actions";
import Newsletter from "./newsletter";

import classes from "./body.module.css";

const bodyElement = document.querySelector('body');

const Body = () => {
  const dispatch = useDispatch();
  const newsStore = useSelector((state) => state.data.news);
  const themeState = useSelector((state) => state.ui.theme);

  useEffect(() => {
    dispatch(fetchNews);
  }, [dispatch]);

  let themeMode;

  if (themeState) {
    themeMode = "";
    bodyElement.className = '';
  } else {
    themeMode = classes["white-mode"];
    bodyElement.classList.add("white-mode");
  }

  return (
    <React.Fragment>
      <div className={`${classes.body} ${themeMode}`}>
        <Newsletter news={newsStore} />
      </div>
    </React.Fragment>
  );
};

export default Body;
