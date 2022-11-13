import React, { useCallback, useMemo } from "react";
import classes from "./newsletter.module.css";
import { Link } from "react-router-dom";

const Newsletter = (props) => {
  
  return (
    <React.Fragment>
      <ul className={classes.news_container}>
        {props.news.map((item) => {
          return (
            <li key={item.id} className={classes.news}>
              <div className={classes.nickname}> {item.by} </div>
              <Link to={`/storyid${item.id}`} className={classes.title}>
                {" "}
                {item.title}{" "}
              </Link>
              <div className={classes["news_container__date-score"]}>
                <div className={classes.score}> {item.score} </div>
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
