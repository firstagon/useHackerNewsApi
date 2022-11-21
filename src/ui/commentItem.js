import React, { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./commentItem.module.css";
import ExtraComments from "./extraComments";

const CommentItem = (props) => {
  const themeState = useSelector((state) => state.ui.theme);

  let themeMode = themeState ? "" : " " + classes._white;

  const [showMore, setShowMore] = useState(false);

  const isExtra = props.isExtra;
  const branchStyleCss = isExtra ? " " + classes["extra-branch"] : "";

  let isMore = false;
  let comments;
  let moreComments;

  const [hoveredLine, setHoveredLine] = useState(false);
  const [hoverClick, setHoverClick] = useState(false);

  const cssHover = hoveredLine ? " " + classes.hoveredLine : "";



  if (props.items.length <= 3) {
    comments = props.items.map((item) => {
      return (
        <div className={classes.extraCoitainer}>
          <div
            key={props.items.indexOf(item) + 10}
            className={classes.lineBlock + cssHover}
            // onClick={lineClick}
            // onMouseEnter={() => setHoveredLine(true)}
            // onMouseLeave={() => setHoveredLine(false)}
          />
          <li
            key={props.items.indexOf(item)}
            className={classes.comment + " " + classes.extraComment}
          >
            <div className={classes.username}> {item.by} </div>
            {item.dead || item.deleted ? (
              "DELETED"
            ) : (
              <div className={classes.text}> {item.text} </div>
            )}
            <div className={classes.date}>
              {new Date().toLocaleString(item.time * 1000)}
            </div>
          </li>
        </div>
      );
    });
  } else if (props.items.length > 3) {
    if (isExtra) {
      comments = props.items.map((item) => {
        return (
          <div className={classes.extraCoitainer}>
            <div
              key={props.items.indexOf(item) + 1}
              className={classes.lineBlock + cssHover}
              // onClick={lineClick}
              // onMouseEnter={() => setHoveredLine(true)}
              // onMouseLeave={() => setHoveredLine(false)}
            />
            <li
              key={props.items.indexOf(item)}
              className={classes.comment + " " + classes.extraComment}
            >
              <div className={classes.username}> {item.by} </div>
              {item.dead || item.deleted ? (
                "DELETED"
              ) : (
                <div className={classes.text}> {item.text} </div>
              )}
              <div className={classes.date}>
                {new Date().toLocaleString(item.time * 1000)}
              </div>
              {item.kids && (
                <ExtraComments
                  // hoverClick={hoverClick}
                  commenstIds={item.kids}
                />
              )}
            </li>
          </div>
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
          <div className={classes.extraCoitainer}>
            <li key={props.items.indexOf(item)} className={classes.comment}>
              <div className={classes.username}> {item.by} </div>
              {item.dead || item.deleted ? (
                "DELETED"
              ) : (
                <div className={classes.text}> {item.text} </div>
              )}
              <div className={classes.date}>
                {new Date().toLocaleString(item.time * 1000)}
              </div>
              {item.kids && <ExtraComments commenstIds={item.kids} />}
            </li>
          </div>
        );
      });

      moreComments = getComments.map((item) => {
        return (
          <li key={props.items.indexOf(item)} className={classes.comment}>
            <div className={classes.username}> {item.by} </div>
            {item.dead || item.deleted ? (
              "DELETED"
            ) : (
              <div className={classes.text}> {item.text} </div>
            )}
            <div className={classes.date}>
              {new Date().toLocaleString(item.time * 1000)}
            </div>
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

  return (
    <React.Fragment>
      {!isExtra && <div className={classes.comment_template}> Comments: </div>}
      <ul className={classes.container + branchStyleCss}>{comments}</ul>
      {(isExtra ? false : isMore) && (
        <button className={classes.button + themeMode} onClick={showMoreHandle}>
          {" "}
          show more{" "}
        </button>
      )}
      {(isExtra ? true : showMore) && (
        <ul className={classes.container}> {moreComments} </ul>
      )}
    </React.Fragment>
  );
};

export default CommentItem;
