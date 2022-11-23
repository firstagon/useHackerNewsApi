import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./commentItem.module.css";
import ExtraComments from "./extraComments";
import CommentContent from "./commentContent";

const CommentItem = (props) => {
  const themeState = useSelector((state) => state.ui.theme);

  console.log(props.items)

  const sortByDate = (array) => {
    array.sort((a, b) => {
     return a.time - b.time;

    })
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
          <div
            className={classes.lineBlock + cssHover}
            onClick={props.hideBranch}
            onMouseEnter={() => setHoveredLine(true)}
            onMouseLeave={() => setHoveredLine(false)}
          />
          {/* <div className={classes.comment + " " + classes.extraComment}>
            <div className={classes.username}> {item.by} </div>
            {item.dead || item.deleted ? (
              "DELETED"
            ) : (
              <div className={classes.text}> {item.text} </div>
            )}
            <div className={classes.date}>
              {new Date().toLocaleString(item.time * 1000)}
            </div>
          </div> */}
          <CommentContent extraComment={false} item={item} />
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
            <CommentContent extraComment={true} item={item} />
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
            <CommentContent item={item} />
            {item.kids && <ExtraComments commenstIds={item.kids} />}
          </li>

          // <li
          //   key={props.items.indexOf(item)}
          //   className={classes.extraCoitainer}
          // >
          //   <div className={classes.comment}>
          //     <div className={classes.username}> {item.by} </div>
          //     {item.dead || item.deleted ? (
          //       "DELETED"
          //     ) : (
          //       <div className={classes.text}> {item.text} </div>
          //     )}
          //     <div className={classes.date}>
          //       {new Date().toLocaleString(item.time * 1000)}
          //     </div>
          //     {item.kids && <ExtraComments commenstIds={item.kids} />}
          //   </div>
          // </li>
        );
      });

      moreComments = getComments.map((item) => {
        return (
          <li key={props.items.indexOf(item)} className={classes.comment}>
            {/* <div className={classes.username}> {item.by} </div>
            {item.dead || item.deleted ? (
              "DELETED"
            ) : (
              <div className={classes.text}> {item.text} </div>
            )}
            <div className={classes.date}>
              {new Date().toLocaleString(item.time * 1000)}
            </div> */}
            <CommentContent item={item} />
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
