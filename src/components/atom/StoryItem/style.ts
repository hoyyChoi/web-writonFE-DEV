import styled from "styled-components";

export const Container = styled.div<{ $someone: string }>`
  display: flex;
  flex-direction: column;
  width: 88px;
  align-items: center;
  font-size: var(--text_cap1);
  line-height: 130%;
  color: var(--Gray-100, #212121);
  position: relative;

  .storyMessage {
    width: 100%;
    padding: 10px 6px;
    border-radius: 10px;
    background: var(--Gray-20, #f5f5f5);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    z-index: 1;
  }
  .storyMessage::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    position: absolute;
    bottom: -3px;
    margin: auto;
    left: 0;
    right: 0;
    background-color: var(--Gray-20);
    border-bottom-left-radius: 3px;
    z-index: -1;
  }
  @media (max-width: 530px) {
    .storyMessage::before {
      background-color: #fff;
    }
    .storyMessage {
      background-color: #fff;
      height: fit-content;
      white-space: initial;
      font-size: 0.625rem;
      color: var(--Gray-90, #424242);
    }
  }

  .profileImageCover {
    width: 58px;
    height: 58px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    border: ${(props) =>
      props.$someone === "me" ? "3px solid transparent" : "1px solid var(--Gray-30, #eee)"};
    background-image: ${(props) =>
      props.$someone === "me" && "linear-gradient(0deg,#D5ABFF 0%, #6A63F5 100%);"};
    background-origin: border-box;
    box-shadow: ${(props) =>
      props.$someone === "me" && "0px 8px 15px 0px rgba(124, 128, 137, 0.10)"};
    cursor: pointer;
  }

  .profileImageCover img {
    width: inherit;
  }
  .company {
    color: var(--Gray-70, #757575);
  }

  .introducePopup {
    padding: 16px;
    border-radius: 10px;
    background-color: var(--White, #fff);
    z-index: 10;
    position: absolute;
    bottom: -52px;
  }
  .introducePopup::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    position: absolute;
    top: -3px;
    margin: auto;
    left: 0;
    right: 0;
    background: var(--White, #fff);
    border-bottom-left-radius: 3px;
    z-index: -1;
  }
`;