import React from "react";
import classes from "./commentContent.module.css";

const CommentContent = (props) => {
  return (
    <div className={classes.comment + " " + (props.extraComment ? classes.extraComment : '') }>
      <div className={classes.username}> {props.item.by} </div>
      {props.item.dead || props.item.deleted ? (
        "DELETED"
      ) : (
        <div className={classes.text}> {props.item.text} </div>
      )}
      <div className={classes.date}>
        {new Date(props.item.time * 1000).toLocaleString()}
      </div>
    </div>
  );
};

export default CommentContent;
