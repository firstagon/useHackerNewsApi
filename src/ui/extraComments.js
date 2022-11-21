import React, { useState, useEffect, useRef } from "react";
import CommentItem from "./commentItem";
import SwitchButton from "./switchButton";
import { getCommentsIds } from "../libs/api";

//  33543946

const ExtraComments = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [commentsState, setCommentsState] = useState(null);
  const commentIds = props.commenstIds;
  const buttTitle = isShown ? "Hide branch" : "Show branch";

    const [isActive, setIsActive] = useState(false);

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
  }, [commentIds]);



  const showHandler = () => {
    setIsActive((prevState) => {
      return !prevState
    });
    setIsShown((prevState) => {
      return !prevState;
    });
  };

  return (
    <React.Fragment>
      <SwitchButton onClick={showHandler} isActive={isActive} title={buttTitle} />
      {isShown && <CommentItem items={commentsState} isExtra={true} />}
    </React.Fragment>
  );
};

export default ExtraComments;
