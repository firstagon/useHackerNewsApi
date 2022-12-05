import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouteMatch, Route } from "react-router-dom";
import { getNewsDetail } from "../store/news-actions";

import NewsCard from "../ui/newscard";

const bodyElement = document.querySelector('body');

const NewsItem = (props) => {
  const match = useRouteMatch();
  const params = useParams();

  const dispatch = useDispatch();

  const { newsId } = params;

  const themeState = useSelector((state) => state.ui.theme);
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

  if (themeState) {
    bodyElement.className = '';
  } else {
    bodyElement.classList.add("white-mode");
  }

  return (
    <React.Fragment>
      <Route path={`${match.path}`} exact>
        <NewsCard currentStory={currentStory} getRefresh={props.getRefresh}/>
      </Route>
    </React.Fragment>
  );
};

export default NewsItem;
