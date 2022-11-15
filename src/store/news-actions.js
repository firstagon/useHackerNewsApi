import { uiActions } from "./ui-actions";
import { newsActions } from "./news-slice";
const numOfNews = 25;
const fromNews = 200;

export  const fetchNews = (dispatch) => {
  
  const news = [];
  
  fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const allNewsIds = Array.from(data);
      const newsIds = allNewsIds.splice(fromNews, numOfNews);
      
      newsIds.forEach((item) => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
          .then((resp) => {
            dispatch(
              uiActions.showNotification({
                status: "loading",
                title: `prepairing ${numOfNews} news`,
                message: "just wait",
              })
            );
            return resp.json();
          })
          .then((data) => {
            news.push(data);
            if (news.length === numOfNews) {
              dispatch(newsActions.getNews({ items: news }));
              dispatch(uiActions.hideNotification());
              
            }
            return;
          })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .then(() => {
      dispatch(
        uiActions.showNotification({
          status: "loading",
          title: `prepairing ${numOfNews} news`,
          message: "just wait",
        })
      );
    })
    .catch((err) => {
      throw new Error(
        err.messgae || "Still have problems with fetching news data"
      );
    });
};

export const getNewsDetail = (newsId) => {
  return async (dispatch) => {
    const fetchItem = async () => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`
      );

      if (!response.ok) {
        throw new Error("cant fetch single news");
      }

      const data = await response.json();

      return data;
    };

    try {
      const itemData = await fetchItem();
      dispatch(newsActions.setCurrentStory({ item: itemData }));
    } catch (error) {
      throw new Error("cant fetch data item");
    }
  };
};

export const getComment = (id) => {
  return async (dispatch) => {
    const fetchComm = async () => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );

      if (!response.ok) {
        throw new Error("cant fetch comments");
      }

      const data = await response.json();

      return data;
    };

    try {
      const commData = await fetchComm();
      dispatch(newsActions.setCurrentComments({ items: commData }));
    } catch (error) {
      throw new Error("cant get a comments");
    }
  };
};

export const getCurrentComments = (comm) => {
  const comments = [];
  console.log(comm);
  return async (dispatch) => {
    comm.forEach((ids) => {
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${ids}.json?print=pretty`
      )
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          // console.log(data)
          comments.push(data);
          if (comments.length) {
            dispatch(newsActions.setCurrentComments({ items: comments }));
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  };
};
