import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./commentItem.module.css";
import ExtraComments from "./extraComments";
import CommentContent from "./commentContent";

const CommentItem = (props) => {
  const themeState = useSelector((state) => state.ui.theme);

  const sortByDate = (array) => {
    array.sort((a, b) => {
      return a.time - b.time;
    });
  };

  sortByDate(props.items);

  let themeMode = themeState ? "" : " " + classes._white;

  const [showMore, setShowMore] = useState(false);

  const isExtra = props.isExtra;
  const branchStyleCss = isExtra ? " " + classes["extra-branch"] : "";

  let isMore = false;
  let comments;
  let moreComments;

  const [hoveredLine, setHoveredLine] = useState(false);

  const cssHover = hoveredLine ? " " + classes.hoveredLine : "";

  if (props.items.length <= 3) {
    comments = props.items.map((item) => {
      return (
        <li key={props.items.indexOf(item)} className={classes.extraCoitainer}>
          {isExtra && (
            <div
              className={classes.lineBlock + cssHover}
              onClick={props.hideBranch}
              onMouseEnter={() => setHoveredLine(true)}
              onMouseLeave={() => setHoveredLine(false)}
            />
          )}
          <CommentContent themeMode={themeState} extraComment={false} item={item} />
        </li>
      );
    });
  } else if (props.items.length > 3) {
    if (isExtra) {
      comments = props.items.map((item) => {
        return (
          <li
            key={props.items.indexOf(item)}
            className={classes.extraCoitainer}
          >
            <div
              className={classes.lineBlock + cssHover}
              onClick={props.hideBranch}
              onMouseEnter={() => setHoveredLine(true)}
              onMouseLeave={() => setHoveredLine(false)}
            />
            <CommentContent themeMode={themeState} extraComment={true} item={item} />
            {item.kids && <ExtraComments commenstIds={item.kids} />}
          </li>
        );
      });
    } else {
      isMore = true;

      const getComments = Array.from(props.items);
      const tripleComment = (comments) => {
        return comments.splice(0, 3);
      };

      comments = tripleComment(getComments).map((item) => {
        return (
          <li
            key={props.items.indexOf(item)}
            className={classes.extraCoitainer}
          >
            <CommentContent themeMode={themeState} item={item} />
            {item.kids && <ExtraComments commenstIds={item.kids} />}
          </li>
        );
      });

      moreComments = getComments.map((item) => {
        return (
          <li key={props.items.indexOf(item)} className={classes.comment}>
            <CommentContent themeMode={themeState} item={item} />
            {item.kids && <ExtraComments commenstIds={item.kids} />}
          </li>
        );
      });
    }
  }

  const showMoreHandle = () => {
    setShowMore((prevState) => {
      return !prevState;
    });
  };

  const commentsCountCSS = props.items.length >= 10 ?  classes.commentsCount + ' ' + classes._fire : classes.commentsCount;
  const commentsCount = <div className={commentsCountCSS}> {props.items.length} </div>;

  if (props.items.length >= 10) {

  }

  return (
    <React.Fragment>
      {!isExtra && <div className={classes.comment_template}> {commentsCount} Comments: </div>}
      <ul className={classes.container + branchStyleCss}>{comments}</ul>
      {(isExtra ? false : isMore) && (
        <button className={classes.button + themeMode} onClick={showMoreHandle}>
          {showMore ? 'Hide more' : 'Show More'}
        </button>
      )}
      {(isExtra ? true : showMore) && (
        <ul className={classes.container}> {moreComments} </ul>
      )}
    </React.Fragment>
  );
};

export default CommentItem;
