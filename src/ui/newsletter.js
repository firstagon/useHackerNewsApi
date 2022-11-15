import React, { useCallback, useMemo } from "react";
import classes from "./newsletter.module.css";
import { NavLink } from "react-router-dom";

const Newsletter = (props) => {
  
  return (
    <React.Fragment>
      <ul className={classes.news_container}>
        {props.news.map((item) => {
          return (
            <li key={item.id} className={classes.news}>
              <div className={classes.nickname}> {item.by} </div>
              <NavLink to={`/storyid${item.id}`} className={classes.title}>
                {" "}
                {item.title}{" "}
              </NavLink>
              <div className={classes["news_container__date-score"]}>
                <div className={classes.score}> {item.score} </div>
                <div> {item.kids ? item.kids.length : ''} </div>
                <div className={classes.date}>
                  {" "}
                  {new Date(item.time * 1000).toLocaleString("default")}
                </div>{" "}
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );

};

export default  Newsletter
