import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { getComment } from "../store/news-actions";
import classes from "../pages/NewsItem.module.css";
import CommentItem from "./commentItem";

// const getCurrComment = (ids) => {
//   // console.log(ids)
//   fetch(`https://hacker-news.firebaseio.com/v0/item/${ids}.json?print=pretty`)
//     .then((resp) => {
//       return resp.json();
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });
// };

const NewsCard = (props) => {
  const [comments, setComments] = useState(["nothing fetched"]);

  const themeState = useSelector((state) => state.ui.theme);

  let themeMode;

  if (themeState) {
    themeMode = "";
  } else {
    themeMode = classes["white-mode"];
  }

  const newsComment = props.currentStory.kids ? props.currentStory.kids : false;

  useEffect(() => {
    if (!newsComment) {
      return;
    } else {
      let arrComm = [];

      newsComment.forEach((element) => {
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
      });
    }
  }, [newsComment]);

  const newsCard = (
    <div className={classes.container + " " + themeMode}>
      <div className={classes["news-page_header"]}>
        <div> {props.currentStory.by} </div>
        <div> {new Date(props.currentStory.time * 1000).toLocaleString()} </div>
      </div>
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href={`${props.currentStory.url}`}
      >
        {props.currentStory.title}{" "}
      </a>
      {newsComment && <CommentItem items={comments} isExtra={false} />}
      {!newsComment && <div> Nothing here </div>}
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
