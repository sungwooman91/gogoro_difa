import css from "styled-jsx/css";

export const style = css`
  @media (min-width: 768px) {
    #ContentsWrapper .gogoro_logo {
      width: 165px;
      height: 74px;
      margin: 0 auto;
      background-image: url(/images/contents/logo.png);
      background-repeat: no-repeat;
      padding-top: 148px;
      background-size: 100% auto;
      font-size: 0px;
      background-position: 50% 100%;
    }
    #ContentsWrapper h2 {
      text-align: left;
      font-size: 25px;
      font-weight: bold;
      color: #0f0f0f;
    }
    #ContentsWrapper .articles .event-wrapper {
      width: 380px !important;
    }
  }

  @media (max-width: 767px) and (min-width: 320px) {
    #ContentsWrapper .gogoro_logo {
      width: 165px;
      height: 74px;
      margin: 0 auto;
      background-image: url(/images/contents/logo.png);
      background-repeat: no-repeat;
      padding-top: 80px;
      background-size: 100% auto;
      font-size: 0px;
      background-position: 50% 100%;
    }
    #ContentsWrapper h2 {
      text-align: left;
      font-size: 25px;
      font-weight: bold;
      color: #0f0f0f;
    }
  }

  /* 컨텐츠 영역 */
  #ContentsWrapper .articles .event-wrapper {
    padding: 9.6px 20px 0 20px;
    position: absolute;
    bottom: 0;
    top: 52px;
    overflow-y: auto;
  }

  #ContentsWrapper .articles .event-wrapper .btn_gps {
    height: 25.6px;
  }

  #ContentsWrapper .articles .event-wrapper .btn_gps > img {
    height: 100%;
  }

  #ContentsWrapper .articles .event-wrapper .header-split {
    margin: 12px 0 0 0;

    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #767676;
    font-family: "Noto Sans KR", sans-serif;
  }

  #ContentsWrapper .articles .event-wrapper .header-split > p {
    margin: 0 0 0 0;
  }

  #ContentsWrapper .articles .event-wrapper div.event-wrap {
    margin: 11px 0 0 0;
  }

  #ContentsWrapper .articles .event-wrapper div.event-wrap > img {
    width: 100%;
  }
`;
