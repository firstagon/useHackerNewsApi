import React, { useState } from "react";
import classes from "./commentItem.module.css";
import ExtraComments from "./extraComments";
import { useHttp } from "../hooks/useRequest";

const CommentItem = (props) => {
  const [moreComments, setMoreComments] = useState(null);
  const isExtra = props.isExtra;


  console.log(props.items);
  let comments;

  if (props.items.length <= 3) {
    comments = props.items.map((item) => {
      return (
        <li key={props.items.indexOf(item)} className={classes.comment}>
          <div className={classes.username}> {item.by} </div>
          <div className={classes.text}> {item.text} </div>
          <div className={classes.date}>
            {" "}
            {new Date().toLocaleString(item.time * 1000)}
          </div>
        </li>
      );
    });
  } else if (props.items.length > 3) {
    // console.warn('more than 3')
    const getComments = Array.from(props.items);
    const tripleComment = (comments) => {
      return comments.splice(0, 3);
    };

    comments = tripleComment(getComments).map((item) => {
      // console.log(item);
      // console.log(getComments);
      return (
        <li key={props.items.indexOf(item)} className={classes.comment}>
          <div className={classes.username}> {item.by} </div>
          <div className={classes.text}> {item.text} </div>
          <div className={classes.date}>
            {" "}
            {new Date().toLocaleString(item.time * 1000)}
          </div>
          {item.kids && <ExtraComments commenstIds={item.kids} />}
        </li>
      );
    });
    
  }

  return (
    <React.Fragment>
      <div className={classes.comment_template}> Comments: </div>
      <ul className={classes.container}>{comments}</ul>
      {!isExtra && <button> show more </button>}
      <ul> {moreComments} </ul>
    </React.Fragment>
  );
};

export default CommentItem;
