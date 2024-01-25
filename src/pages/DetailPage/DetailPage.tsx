/* eslint-disable react-hooks/exhaustive-deps */
import { MouseEvent, useEffect } from "react";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getComment } from "@/apis/DetailPage";
import { CommentBox } from "@/components/DetailPage/CommentBox";
import { WriteView } from "@/components/DetailPage/WriteView";
import { CommentAndLike } from "@/components/atom/CommentAndLike";
import { CommnetAndLikeFloating } from "@/components/atom/CommentAndLikeFloating";
import { UserInfoDetail } from "@/components/atom/UserInfoDetail";
import { CommentState, DetailDataState, DetailModalState, LikeState } from "@/recoil/atoms";

export const DetailPage = () => {
  const detailData = useRecoilValue(DetailDataState);
  const setDetailModal = useSetRecoilState(DetailModalState);
  const likeCount = useRecoilValue(LikeState);
  const [commentList, setCommentList] = useRecoilState(CommentState);
  const defaultClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 캡쳐링 방지
  };

  const DetailPageRendering = async () => {
    try {
      const data = await getComment(detailData[0]?.user_templete_id);
      setCommentList(data);
      console.log(data);
    } catch {
      new Error("shit");
    }
  };

  useEffect(() => {
    DetailPageRendering();
    console.log(detailData);
  }, []);

  return (
    <Container onClick={() => setDetailModal(false)}>
      <div
        className="DetailBox"
        onClick={(e) => defaultClick(e)}
      >
        <WriteView detailData={detailData} />
        <div className="WriterUser">
          <UserInfoDetail
            data={{
              profile: detailData[0]?.profile,
              nickname: detailData[0]?.nickname,
              job: detailData[0]?.job,
              company: detailData[0]?.company,
              created_at: detailData[0]?.created_at,
            }}
          />
          <CommentAndLike
            commentCount={commentList?.length.toString()}
            likeCount={likeCount}
          />
        </div>
        <CommentBox
          commentList={commentList}
          userTemplateId={detailData[0]?.user_templete_id} //
        />
        <CommnetAndLikeFloating
          userTemplateId={detailData[0]?.user_templete_id}
          myLikeSign={detailData[0]?.myLikeSign}
          commentCount={commentList?.length.toString()}
          likeCount={likeCount}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  padding: 140px 30px 254px;
  .DetailBox {
    padding: 60px 90px 90px;
    background-color: var(--White);
    border-radius: 16px;
    height: fit-content;
    width: 60.15%;
    min-width: 830px;
    max-width: 830px;
    @media (max-width: 830px) {
      width: 80.15%;
      min-width: 530px;
    }
    position: relative;
  }
  .WriterUser {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
    border-bottom: 1px solid #d9d9d9;
  }
`;
