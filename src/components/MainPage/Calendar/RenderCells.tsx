import { useState } from "react";

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, getISOWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";

import goldBadge from "@/assets/mainPage/goldBadge.svg";
// import silverBadge from "@/assets/mainPage/silverBadge.svg";
import writeActive from "@/assets/mainPage/writeActive.svg";
import writeClick from "@/assets/mainPage/writeActiveClick.svg";
import writeActiveHover from "@/assets/mainPage/writeActiveHover.svg";

import { Container } from "./RenderCells.style";

export const RenderCell = ({ fold }: { fold: boolean }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [mouseClick, setMouseClick] = useState<boolean>(false);
  const today = new Date();
  const monthStart = startOfMonth(today); // 1월 1일 (그 달의 시작이 나오게 됨.)
  const monthEnd = endOfMonth(today); // 1월 31일이 나옴.(그 달의 끝)
  const startDate = startOfWeek(monthStart); // 해당 날짜의 해당 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 해당 날짜의 해당 주의 끝 날짜
  const weekNumber = getISOWeek(today) - 1; // 몇주차인지

  const mouseEvent = (isTODAY: boolean, type: string) => {
    // 오늘만 이동 가능 추가로 안쓴 날도 이동가능, 안쓴날은 따로 체크해야할듯
    if (isTODAY) {
      switch (type) {
        case "mouseOver":
          setIsHover(true);
          break;
        case "mouseOut":
          setIsHover(false);
          break;
        case "mouseDown":
          setMouseClick(true);
          break;
        case "mouseClick":
          navigate("/writepage");
          break;
      }
    }
  };

  const rows = [];
  let days = [];
  let day = addDays(startDate, 1); // 월요일부터 보이게 하기 위해서 (원래 일요일부터 보임)
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = !isSameMonth(day, monthStart) ? format(day, "M.d") : format(day, "d"); //formattedDate랑 같은 값만 서버값이랑 비교해서 처리하면 된다.
      const clickDay = day;
      days.push(
        <div
          className={`cell ${
            !isSameMonth(day, monthStart) // 1월이면 12월 2월 비활성화
              ? "disabled"
              : isSameDay(day, today) // 오늘 날짜 나올때까지 돌리기 오늘날짜 select!!
                ? "selected"
                : format(today, "M") === format(day, "M") // 해당 달이면 활성화
                  ? "valid"
                  : ""
          } ${i === 5 || i === 6 ? "weekend" : ""}`}
        >
          <div className="innerday">
            <div
              className={format(today, "M") !== format(day, "M") ? "text not-valid" : "text valid"}
            >
              {formattedDate}
            </div>
            {i === 5 ||
            i === 6 ||
            Number(format(day, "d")) > Number(format(today, "d")) ||
            !isSameMonth(day, monthStart) ? ( // 이미지 안나와여하는것 : 주말, 오늘 이후 날짜들, 다른 달 짜투리들
              ""
            ) : (
              <img
                onMouseOver={() => mouseEvent(isSameDay(clickDay, today), "mouseOver")}
                onMouseOut={() => mouseEvent(isSameDay(clickDay, today), "mouseOut")}
                onMouseDown={() => mouseEvent(isSameDay(clickDay, today), "mouseDown")}
                onClick={() => console.log(format(day, "d"), format(today, "d"))}
                className={isSameDay(day, today) ? "writeActive" : "goldBadge"}
                src={
                  isSameDay(day, today)
                    ? mouseClick
                      ? writeClick
                      : isHover
                        ? writeActiveHover
                        : writeActive
                    : goldBadge // 여기서 부터 로직 작성, 오늘이 아닌데, 어떤 값이 false면 그 write사진 writePre로 변경
                }
                alt="성공"
              />
            )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div className="row">{days}</div>);
    days = [];
  }
  return <Container>{fold ? rows : rows[weekNumber]}</Container>;
};