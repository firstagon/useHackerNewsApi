import React, { useEffect, useMemo } from "react";
import classes from "./newsletter.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



const Newsletter = (props) => {
  const themeState = useSelector((state) => state.ui.theme);

  const themeMode = themeState ? "" : " " + classes["_white"];
  const themeDate = themeState ? "" : " " + classes["_whiteDate"];
  let sorted;

  if (props.news) {
    sorted = [...props.news];
    sorted.sort((a, b) => a.time - b.time);
  }



  return (
    <React.Fragment>
      <ul className={classes.news_container}>
        {sorted.map((item) => {
          return (
            <li key={item.id} className={classes.news}>
              <div className={classes.nickname + themeMode}> {item.by} </div>
              <div className={classes.title + themeMode}>
                <NavLink to={`/storyid${item.id}`} className={classes.link}>
                  {item.title}
                </NavLink>
              </div>
              <div className={classes["news_container__date-score"] + themeDate}>
                <div className={classes.score_container}>
                  <div className={classes.score}> score: {item.score} </div>
                  <div> {item.kids ? 'comments: ' + item.kids.length : ""} </div>
                </div>
                <div className={classes.date}>
                  {new Date(item.time * 1000).toLocaleString("default")}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Newsletter;
