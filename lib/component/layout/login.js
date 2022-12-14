/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버     전 : 0.0.1
/*  설     명 : 사용자 레이아웃 설정
/*  위     치 : /css/contents/login/layout.css
/*******************************************************************************************/

/*******************************************************************************************/
/* 공용 컨텐츠 설정 시작
/*******************************************************************************************/

import css from "styled-jsx/css";
export const style = css`
  @media (min-width: 768px) {
    html {
      height: 100%;
    }
    body {
      height: 100%;
      background-color: #ccc;
      background-image: url(/images/contents/back_pattern.png);
    }
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

    .row-input-id > .disable {
      background-color: #e5effe !important;
      color: #333 !important;
    }
    .row-input-tel .disable {
      background-color: #e5effe !important;
      color: #333 !important;
    }
    .btn_reset span {
      background-color: #333 !important;
      margin-bottom: 10px;
    }

    .command {
      width: 264px;
      margin: 0 auto;
    }
    .btn_reset > span {
      width: 70px !important;
      float: left;
    }
    .btn_confirm > span {
      width: 153px !important;
      float: right;
    }
  }
  @media (max-width: 767px) and (min-width: 320px) {
    html {
      height: 100%;
    }
    body {
      height: 100%;
    }
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

    .row-input-id > .disable {
      background-color: #e5effe !important;
      color: #333 !important;
    }
    .row-input-tel .disable {
      background-color: #e5effe !important;
      color: #333 !important;
    }
    .btn_reset span {
      background-color: #333 !important;
      margin-bottom: 10px;
    }

    .command {
      width: 264px;
      margin: 0 auto;
    }
    .btn_reset > span {
      width: 70px !important;
      float: left;
    }
    .btn_confirm > span {
      width: 153px !important;
      float: right;
    }
  }

  /* 입력폼 */
  input[type="tel"],
  input[type="text"],
  input[type="number"],
  input[type="password"],
  input[type="date"],
  input[type="datetime-local"] {
    font-family: "Noto Sans KR", "Tahoma", "돋움", "굴림";
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:active,
  input:-webkit-autofill:focus {
    background-color: #ffffff !important;
    color: #9f9f9f !important;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form {
    position: relative;
    top: 0;
    left: 0;

    margin: 0 0 0 0;
    padding: 48px 0 20px 0;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset {
    /*height: 150px;*/
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    border: none;
    text-align: center;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset legend {
    position: absolute;
    top: 0;
    right: 0;

    display: none;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-id div.uid,
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-password div.password {
    margin: 0 0 3px 0;
  }
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-id div.uid label,
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-password div.password label {
    margin: 0 0 3px 0;
    font-size: 14px;
    font-weight: bold;
  }

  /* 아이디 */
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-id {
    display: inline-block;

    width: 264px;
    text-align: left;
  }

  /* 비밀번호 */
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-tel {
    display: inline-block;

    width: 264px;
    text-align: left;
  }

  /* 본인확인 인증번호 */
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-code {
    display: inline-block;

    width: 264px;
    text-align: left;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-hr {
    margin: 17px auto 22px auto;
    border-bottom: 1px solid #d6d6d6;
    width: 264px;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-id div.uname label span.subject,
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-tel div.tel_no label span.subject,
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-code div.login_code label span.subject {
    margin: 0 0 0 0;

    width: 264px;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: normal;
    text-align: left;
    color: #121212;
  }

  /* 아이디·비밀번호 입력폼 */
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-id input#user_name {
    margin: 8px 0 10px 0;
    padding: 7px 8px 7px 8px;

    height: 26px;
    width: 248px;
    border-radius: 5px;
    box-shadow: 0 7px 10px 0 rgb(0 0 0 / 9%);
    background-color: #fff;
    border: none;
    color: #9f9f9f;
    font-size: 16px;
    font-weight: normal;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-tel input#tel_no1 {
    margin: 8px 6px 10px 0px;
    padding: 7px 8px 7px 8px;
    display: inline-block;
    float: left;

    width: 55px;
    height: 26px;
    border-radius: 5px;
    box-shadow: 0 7px 10px 0 rgb(0 0 0 / 9%);
    background-color: #fff;
    border: none;
    color: #9f9f9f;
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-tel input#tel_no2 {
    margin: 8px 6px 10px 0px;
    padding: 7px 8px 7px 8px;
    display: inline-block;
    float: left;

    width: 74px;
    height: 26px;
    border-radius: 5px;
    box-shadow: 0 7px 10px 0 rgb(0 0 0 / 9%);
    background-color: #fff;
    border: none;
    color: #9f9f9f;
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-tel input#tel_no3 {
    margin: 8px 0 10px 0px;
    padding: 7px 8px 7px 8px;
    display: inline-block;
    float: left;

    width: 74px;
    height: 26px;
    border-radius: 5px;
    box-shadow: 0 7px 10px 0 rgb(0 0 0 / 9%);
    background-color: #fff;
    border: none;
    color: #9f9f9f;
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }

  /* 본인확인 인증번호 */
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form fieldset div.row-input-code input#login_code {
    margin: 8px 0 10px 0;
    padding: 7px 8px 7px 8px;

    height: 26px;
    width: 248px;
    border-radius: 5px;
    box-shadow: 0 7px 10px 0 rgb(0 0 0 / 9%);
    background-color: #fff;
    border: none;
    color: #9f9f9f;
    font-size: 16px;
    font-weight: normal;
  }

  div#ContentsWrapper div.articles div.login-wrap form#login-input-form .command {
    text-align: center;
  }

  /* 인증번호 발송 버튼 */
  div#ContentsWrapper div.articles div.login-wrap form#login-input-form .command span {
    display: inline-block;
    padding: 7px 8px 11px 8px;

    width: 248px;
    color: #fff;
    background-image: linear-gradient(to bottom, #528b27, #456e1f);
    border-radius: 5px;
    box-shadow: 0 7px 10px 0 rgb(0 0 0 / 9%);
    font-size: 18px;
    font-weight: normal;
    text-align: center;
  }
  #ContentsWrapper .articles .login-wrapper .header-split > p {
    margin: 0 0 0 0;
  }
`;
