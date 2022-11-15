import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouteMatch, Route } from "react-router-dom";
import { getNewsDetail } from "../store/news-actions";

import NewsCard from "../ui/newscard";
import classes from "./NewsItem.module.css";


const NewsItem = () => {
  const match = useRouteMatch();
  const params = useParams();

  const dispatch = useDispatch();

  const { newsId } = params;

  const newsStore = useSelector((state) => state.data.news);
  const itemStore = useSelector((state) => state.data.currentStory);
  const currItem = newsStore.find((item) => item.id === +newsId);

  const [currentStory, setCurrentStory] = useState(null);

  useEffect(() => {
    dispatch(getNewsDetail(newsId));
  }, [newsId, dispatch]);

  useMemo(() => {
    if (currItem === undefined) {
      // console.log("if Working");
      setCurrentStory(itemStore);
      
    } else {
      // console.log("else working");
      setCurrentStory(currItem);
    }
  }, [itemStore, currItem]);


  return (
    <React.Fragment>
      <Route path={`${match.path}`} exact>
        <NewsCard currentStory={currentStory} />
      </Route>
    </React.Fragment>
  );
};

export default NewsItem;
