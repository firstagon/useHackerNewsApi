import { uiActions } from "./ui-actions";
import { newsActions } from "./news-slice";

// import { newsActions } from './fetchNews';

const fromNews = 200;
const toNews = fromNews + 10;
const numOfNews = 10;

let fetchedNews = [];

export const fetchNews = (dispatch) => {
  const news = [];

  fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then((response) => {
      // console.log("feching");
      return response.json();
    })
    .then((data) => {
      const allNewsIds = Array.from(data);
      const newsIds = allNewsIds.splice(fromNews, toNews);
      // console.log(newsIds)

      newsIds.forEach((item) => {
        // console.log(item)

        fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
          .then((resp) => {
            // console.log('fethced')
            // console.log(resp)
            dispatch(
              uiActions.showNotification({
                status: "loading",
                title: "getting new 100 news",
                message: "just wait",
              })
            );

            return resp.json();
          })
          .then((data) => {
            // console.log(data.kids.length)
            if (data.kids) {
              // console.log('find kido')
              if (data.kids.length >= 3) {
                news.push(data);
              } else if (!data.kids) {
                console.log('not exist')
                
              }
              else {
                // console.log('break')
                return
                
              }
            } else {
              // console.log('not find kido')
              return
            }
   
            
            // dispatch(newsActions.getNews({ items: data}),
            // )
            // news.push(data);
            // console.log(news);
            // console.log(news.length)
            if (news.length >= numOfNews) {
              dispatch(newsActions.getNews({ items: news }));
              dispatch(uiActions.hideNotification());
            }

            // console.log(news)
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
};

export const getNewsDetail = (newsId) => {
  // fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     // console.log(data)
  //     // return dispatch(newsActions.setCurrentStory( { item: data} ))
  //     return data

  //   }).catch(err => {
  //     console.warn(err)
  //   })
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
      // console.log('WTF')
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
      dispatch(newsActions.setCurrentComments( { items: commData } ));
    } catch(error) {
      throw new Error('cant get a comments');
    }
  };
};

export const getCurrentComments = (comm) => {
  const comments = [];
  console.log(comm);
  return async (dispatch) => {
    comm.forEach(ids => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${ids}.json?print=pretty`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // console.log(data)
        comments.push(data)
        if (comments.length) {
          dispatch(newsActions.setCurrentComments({ items: comments }));
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
    })
    }
  
}