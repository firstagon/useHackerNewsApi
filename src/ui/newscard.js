import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import classes from "../pages/NewsItem.module.css";
import CommentItem from "./commentItem";

const NewsCard = (props) => {
  const [comments, setComments] = useState(["nothing fetched"]);
  const [newsComment, setNewsComment] = useState(props.currentStory.kids ? props.currentStory.kids : false);

  const themeState = useSelector((state) => state.ui.theme);

  let themeMode;

  if (themeState) {
    themeMode = "";
  } else {
    themeMode = classes["white-mode"];
  }

  // const newsComment = props.currentStory.kids ? props.currentStory.kids : false;

  useMemo(() => {
    if (props.currentStory.kids) {
    setNewsComment(props.currentStory.kids)
    }
  } , [props.currentStory.kids])
 

  useEffect(() => {
    if (!newsComment) {
      return;
    } else {
      let arrComm = [];

      // newsComment.forEach((element) =>
      for (let element of newsComment) {
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
        )
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            arrComm.push(data);
            return arrComm.length === newsComment.length
              ? setComments(arrComm)
              : "";
          })
          .catch((err) => {
            throw new Error(err);
          });
      };
    }
  }, [newsComment]);

  useEffect(() => {
    // console.log(props.getRefresh);

    if (props.getRefresh) {
      // console.log('referesad')
        setNewsComment(props.currentStory.kids)
    }
  }, [props.getRefresh, props.currentStory.kids])





  const newsCard = (
    <div className={classes.container + " " + themeMode}>
      <div className={classes["news-page_header"]}>
        <div> {props.currentStory.by} </div>
        <div> {new Date(props.currentStory.time * 1000).toLocaleString()} </div>
      </div>
      <a className={classes.link}
        target="_blank"
        rel="nofollow noopener noreferrer"
        href={`${props.currentStory.url}`}
      >
        {props.currentStory.title}{" "}
      </a>
      {newsComment && <CommentItem items={comments} isExtra={false} />}
      {!newsComment && <div> No comment here </div>}
    </div>
  );

  const loadPlate = (
    <div className={classes.container + " " + themeMode}>
      <div> Loading... </div>
    </div>
  );

  return props.currentStory ? newsCard : loadPlate;
};

export default NewsCard;
