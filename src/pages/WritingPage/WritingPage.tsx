/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getBasicQuestion, getSpecialQuestion } from "@/apis/WritingPage";
import { getCalendarRecordCurrent } from "@/apis/mainPage";
import { WeekCalendar } from "@/components/WritingPage/WeekCalendar";
import {
  getBasicQuestionState,
  getSpecialQuestionState,
  postWritingDataState,
} from "@/recoil/atoms";
import { CalendarRecordCurrentType } from "@/types";

import { WritingBox } from "./WritingBox";

export const WritingPage = () => {
  const { date } = useParams();
  const [CalendarData, setCalendarData] = useState<CalendarRecordCurrentType[]>([]);
  const setGetBasicQuestionData = useSetRecoilState(getBasicQuestionState);
  const setGetSpecialQuestionData = useSetRecoilState(getSpecialQuestionState);
  const setpostWritingData = useSetRecoilState(postWritingDataState);

  const writingPageRendering = async () => {
    try {
      const result = await Promise.all([
        getCalendarRecordCurrent(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1",
          format(date || new Date(), "yyyy-MM")
        ),
        getBasicQuestion(localStorage.getItem("challengeId") || "1"),
        getSpecialQuestion(localStorage.getItem("challengeId") || "1"),
      ]);
      console.log(result);
      setCalendarData(result[0]);
      setGetBasicQuestionData(result[1]);
      setGetSpecialQuestionData(result[2]);
      setpostWritingData(
        result[1].map((item) => ({
          question_id: item.question_id,
          content: "",
          visibility: true,
        }))
      );
    } catch {
      throw new Error("shit");
    }
  };
  useEffect(() => {
    writingPageRendering();
  }, []);
  return (
    <Container>
      <WeekCalendar CalendarData={CalendarData} />
      <WritingBox />
    </Container>
  );
};

const Container = styled.div`
  background: var(--Gray2_100, #f5f5f5);
  padding-top: 30px;
  padding-bottom: 66px;
  position: relative;
  @media (max-width: 530px) {
    padding-top: 20px;
    padding-bottom: 0;
  }
`;