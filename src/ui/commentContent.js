import React from "react";
import classes from "./commentContent.module.css";

const CommentContent = (props) => {
  const themeMode = props.themeMode ? '' : ' ' + classes['_white'];
  const themeModeDate = props.themeMode ? '' : ' ' + classes['_whiteDate']
  return (
    <div
      className={classes.comment}
    >
      <div className={classes.username + themeMode}> {props.item.dead || props.item.deleted ? props.item.type : props.item.by } </div>
      {props.item.dead || props.item.deleted ? ( <div className={classes.text + themeMode}> DELETED </div>) : (
        <div className={classes.text + themeMode}> {props.item.text} </div>)}
        
      <div className={classes.date + themeModeDate}>
        {new Date(props.item.time * 1000).toLocaleString()}
      </div>
    </div>
  );
};

export default CommentContent;
