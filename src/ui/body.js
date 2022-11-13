import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { newsActions } from "../store/news-slice";
import { fetchNews } from "../store/news-actions";

import classes from "./body.module.css";

import Newsletter from "./newsletter";

const Body = (props) => {
  const dispatch = useDispatch();
  // const checkLoad = useSelector( (state) => state.data.loaded)
  const newsStore = useSelector((state) => state.data.news);
  const themeState = useSelector((state) => state.ui.theme)

  useMemo(() => {console.warn(themeState)}, [themeState]);

  useEffect(() => {
    dispatch(fetchNews);
  }, [dispatch]);

  const newsHandler = () => {
    // dispatch(newsData)
    // dispatch(getStories)
  };

  const newsCheck = () => {
    // dispatch(newsActions.checkNews());
    console.warn(newsStore);
  };

  let themeMode;

if (themeState) {
  themeMode = '';
} else {
  themeMode = classes['white-mode'];
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
