import React, { useState, useEffect } from "react";
import CommentItem from "./commentItem";
import SwitchButton from "./switchButton";
import useHttp from "../hooks/useRequest";
import { getCommentsIds } from '../libs/api'

//  33543946

const ExtraComments = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [commentsState, setCommentsState] = useState(null);
  const commentIds = props.commenstIds;
  const buttTitle = isShown ? "Hide branch" : "Show branch";

  useEffect(() => {
    if (!commentIds) {
      return;
    } else {
      let arrComm = [];
      commentIds.forEach((element) => {
        getCommentsIds(element)
          .then((data) => {
            arrComm.push(data);
            return arrComm.length === commentIds.length
              ? setCommentsState(arrComm)
              : "";
          })
          .catch((err) => {
            throw new Error(err);
          });
      });
    }
  }, []);

  const showHandler = () => {
    setIsShown((prevState) => {
      return !prevState;
    });
  };

  return (
    <React.Fragment>
      <SwitchButton onClick={showHandler} title={buttTitle}>
        {" "}
      </SwitchButton>
      {isShown && <CommentItem items={commentsState} isExtra={true} />}
      {isShown && (
        <SwitchButton onClick={showHandler} title={buttTitle}>
          {" "}
        </SwitchButton>
      )}
    </React.Fragment>
  );
};

export default ExtraComments;
