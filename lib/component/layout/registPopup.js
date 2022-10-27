/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버     전 : 0.0.1
/*  설     명 : 시승예약
/*  위     치 : /css/contents/reserv/regist/layout.css
/*******************************************************************************************/

/*******************************************************************************************/
/* 공용 컨텐츠 설정 시작
/*******************************************************************************************/
import css from "styled-jsx/css";
export const style = css`
  div.articles div.reserv-agreement1-wrap {
    display: none;
    position: fixed;
    _position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 90000;
  }

  div.articles div.reserv-agreement1-wrap div.layer-bg {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto 0 auto;
    padding: 0 0 0 0;

    width: 100%;
    height: 100%;
    text-align: center;
    background: #000;
    opacity: 0.5;
    filter: alpha(opacity=50);
    z-index: 90000;
  }

  div.articles div.reserv-agreement1-wrap div.reserv-agreement1-info {
    margin: 0 auto 0 auto;
    padding: 0 0 0 0;
    position: relative;
    top: 12%;
    left: 0;
    z-index: 99999;

    width: 90%;
    /* border: 1px solid #222; */
    border: 1px solid #333;
    border-radius: 8px 8px 0 0;
    background-color: #fff;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    /*box-shadow: 0 3px 7px rgb(0 0 0 / 30%);*/
    box-shadow: 0 3px 7px #555;
    -webkit-box-shadow: 0 3px 7px #555;
    -moz-box-shadow: 0 3px 7px #555;
    background-clip: padding-box;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding-box;
    outline: none;
  }

  div.articles div.reserv-agreement1-wrap div.reserv-agreement1-info h3.subject {
    margin: 25px 0;
    font-size: 15px;
    letter-spacing: -1px;
  }
  /*******************************************************************************************/
  /* 약관동의1 팝업 레이어 설정 종료
/*******************************************************************************************/

  /*******************************************************************************************/
  /* 약관동의1 팝업 레이어 설정 시작
/*******************************************************************************************/

  div.articles div.reserv-agreement2-wrap {
    display: none;
    position: fixed;
    _position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 90000;
  }

  div.articles div.reserv-agreement2-wrap div.layer-bg {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto 0 auto;
    padding: 0 0 0 0;

    width: 100%;
    height: 100%;
    text-align: center;
    background: #000;
    opacity: 0.5;
    filter: alpha(opacity=50);
    z-index: 90000;
  }

  div.articles div.reserv-agreement2-wrap div.reserv-agreement2-info {
    margin: 0 auto 0 auto;
    padding: 0 0 0 0;
    position: relative;
    top: 12%;
    left: 0;
    z-index: 99999;

    width: 90%;
    /* border: 1px solid #222; */
    border: 1px solid #333;
    border-radius: 8px 8px 0 0;
    background-color: #fff;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    /*box-shadow: 0 3px 7px rgb(0 0 0 / 30%);*/
    box-shadow: 0 3px 7px #555;
    -webkit-box-shadow: 0 3px 7px #555;
    -moz-box-shadow: 0 3px 7px #555;
    background-clip: padding-box;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding-box;
    outline: none;
  }

  div.articles div.reserv-agreement2-wrap div.reserv-agreement2-info h3.subject {
    margin: 25px 0;
    font-size: 15px;
    letter-spacing: -1px;
  }
  /*******************************************************************************************/
  /* 약관동의1 팝업 레이어 설정 종료
/*******************************************************************************************/
`;
