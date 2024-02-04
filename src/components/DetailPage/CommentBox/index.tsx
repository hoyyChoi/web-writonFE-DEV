import React, { useState } from "react";

import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { CommentItem } from "@/components/atom/CommentItem";
import { CommentPost } from "@/components/atom/CommentPost";
import { commentProps } from "@/types";

import { Container } from "./style";
export const CommentBox = ({
  commentList,
  commentCount,
  userTemplateId,
}: {
  commentList: commentProps[];
  commentCount: string;
  userTemplateId: number;
}) => {
  const [commentOn, setCommentOn] = useState<boolean>(true);

  return (
    <Container>
      <CommentPost
        userTemplateId={userTemplateId}
        commentGroup={-1}
      />
      <div
        id="comment"
        className="commentNum"
        onClick={() => setCommentOn(!commentOn)}
      >
        댓글 {commentCount}개
        <img
          src={commentOn ? topArrow : downArrow}
          alt="V"
        />
      </div>
      {commentOn && commentList.length > 0 ? (
        <div className="commentList">
          {commentList?.map((item, idx) => (
            <React.Fragment key={idx}>
              <CommentItem
                userTemplateId={userTemplateId}
                data={item}
              />
            </React.Fragment>
          ))}
        </div>
      ) : (
        ""
      )}
    </Container>
  );
};
