import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./ui/header.js";
import Body from "./ui/body";
import NewsItem from "./pages/newsItem";
import React from "react";

import Notification from "./ui/notification";

function App() {
  const notification = useSelector((state) => state.ui);

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Header />
          <Body />
        </Route>
        <Route path="/storyid:newsId">
          <Header isItem={true} />
          <NewsItem />
        </Route>
      </Switch>

      {notification.noteIsVisible && (
        <Notification
          status={notification.notification.status}
          title={notification.notification.title}
          message={notification.notification.message}
          note={notification.notification}
        />
      )}
    </Fragment>
  );
}

export default App;
