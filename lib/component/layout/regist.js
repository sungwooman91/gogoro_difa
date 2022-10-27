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
  }

  /*******************************************************************************************/
  /* 공용 컨텐츠 설정 종료
/*******************************************************************************************/

  /*******************************************************************************************/
  /* [시승예약] 컨텐츠 설정 시작
/*******************************************************************************************/
  @media (min-width: 768px) {
    .contents-wrap {
      padding-bottom: 100px;
    }
    .reserv-wrapper .btn_note {
      padding: 10px 20px 0 20px;
    }
    .reserv-wrapper .btn_note img {
      width: 27px;
      height: auto;
    }
    .reserv-wrapper .subject {
      padding: 0 20px;
    }
    .reserv-wrapper .header-split {
      padding: 0 20px;
      color: #767676;
    }
    .reserv-wrap #reserv-step-1 {
      display: block;
      height: 44px;
      background-color: #fff;
      padding: 0 20px;
      font-size: 16px;
      color: #333;
      line-height: 44px;
      margin-bottom: 6px;
      font-weight: 500;
      position: relative;
    }
    .reserv-wrap #reserv-step-1 label {
      /* position: absolute; */
      z-index: 11;
    }
    .reserv-wrap #reserv-step-1 #agreement1_bit {
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 9px;
      border-radius: 0;
    }
    .reserv-wrap #reserv-step-1 > div {
      float: right;
      color: #528c27;
    }
    .reserv-wrap #reserv-step-1 #agreement1_bit_error {
      position: absolute;
      left: 20px;
      bottom: -21px;
    }
    .reserv-wrap #reserv-step-4 {
      display: block;
      height: 44px;
      background-color: #fff;
      padding: 0 20px;
      font-size: 16px;
      color: #333;
      line-height: 44px;
      margin-bottom: 6px;
      font-weight: 500;
      position: relative;
    }
    .reserv-wrap #reserv-step-4 label {
      /* position: absolute; */
      z-index: 11;
    }
    .reserv-wrap #reserv-step-4 #agreement2_bit {
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 9px;
      border-radius: 0;
    }
    .reserv-wrap #reserv-step-4 > div {
      float: right;
      color: #528c27;
    }
    .reserv-wrap #reserv-step-2 {
      display: block;
      padding: 12px 20px 20px 20px;
      background-color: #fff;
      margin-bottom: 6px;
    }
    .reserv-wrap #reserv-step-2 .reservation_date {
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    .reserv-wrap #reserv-step-2 .reservation_date .subject {
      padding: 0 0 8px 0;
    }
    .reserv-wrap #reserv-step-2 > div:nth-child(2) {
      text-align: center;
      padding: 6px 0 13px 0;
      font-size: 16px;
    }
    .reserv-wrap #reserv-step-2 #option-reserv-date {
      text-align: center;
    }
    .reserv-wrap #reserv-step-2 #option-reserv-date label {
      padding: 0 10px;
      height: 36px;
      font-size: 14px;
      display: inline-block;
      line-height: 36px;
      background-color: #f1f1f1;
      border-radius: 18px;
      margin-bottom: 6px;
    }
    .reserv-wrap #reserv-step-2 #option-reserv-date input[type="radio"]:checked + label {
      padding: 0 10px;
      height: 36px;
      border-radius: 18px;
      background-color: #528c27;
      color: #fff;
      font-size: 14px;
      display: inline-block;
      line-height: 36px;
    }
    .reserv-wrap #reserv-step-2 #option-reserv-date input {
      display: none;
    }
    .reserv-wrap #reserv-step-4 #agreement2_bit_error {
      position: absolute;
      left: 20px;
      bottom: -21px;
    }
    .reserv-wrap #reserv-step-3 {
      background-color: #fff;
      padding: 12px 20px 20px 20px;
    }
    .reserv-wrap #reserv-step-3 .reservation_hour {
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    .reserv-wrap #reserv-step-3 .reservation_hour .subject {
      padding: 0 0 8px 0;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-hour {
      padding: 12px 0;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-hour label {
      width: 56px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      display: inline-block;
      margin-right: 8px;
      background-color: #f1f1f1;
      border-radius: 14px;
      margin-bottom: 6px;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-hour input {
      display: none;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-hour input[type="radio"]:checked + label {
      background-color: #528c27;
      color: #fff;
      border-radius: 14px;
    }
    .reserv-wrap #reserv-step-3 .reservation_minute {
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    .reserv-wrap #reserv-step-3 .reservation_minute .subject {
      padding: 0 0 8px 0;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-minute {
      padding: 12px 0;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-minute label {
      width: 56px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      display: inline-block;
      margin-right: 8px;
      background-color: #f1f1f1;
      border-radius: 14px;
      margin-bottom: 6px;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-minute input {
      display: none;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-minute input[type="radio"]:checked + label {
      background-color: #528c27;
      color: #fff;
      border-radius: 14px;
    }

    .command {
      position: fixed;
      bottom: 0px;
      width: 420px;
      height: 52px;
      background-color: #fff;
      box-shadow: 0 -10px 10px 0 rgba(0, 0, 0, 0.16);
    }
    .command #btn_send {
      position: absolute;
      right: 20px;
      top: 11px;
      width: 124px;
      height: 32px;
      background-color: #528c27;
      color: #fff;
      border-radius: 5px;
      line-height: 32px;
      text-align: center;
    }
    .command #selected_reservate_info {
      position: absolute;
      left: 20px;
      top: 17px;
      font-size: 14px;
      font-weight: 500;
    }

    .reserv-agreement1-info .contents-detail .agreement-command {
      height: 40px;
      text-align: center;
    }
    .reserv-agreement1-info .contents-detail .agreement-command > .confirm a {
      display: inline-block;
      width: 80px;
      height: 41px;
      background: #528c27;
      border-radius: 5px;
      line-height: 42px;
      vertical-align: middle;
      color: #fff;
    }
    .reserv-agreement2-info .contents-detail .agreement-command {
      margin: 0 0 20px 0;
      height: 40px;
      text-align: center;
    }
    .reserv-agreement2-info .contents-detail .agreement-command > .confirm a {
      display: inline-block;
      width: 80px;
      height: 41px;
      background: #528c27;
      border-radius: 5px;
      line-height: 42px;
      vertical-align: middle;
      color: #fff;
    }
    /*.reserv-agreement1-info .close > .close a img {width:100%; }
.reserv-agreement2-info .close > .close a {position:absolute; top:20px; right:20px; width:31px; height:31px; }
.reserv-agreement2-info .close > .close a img {width:100%; }*/

    .reserv-agreement1-info .close > .close a {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 31px;
      height: 31px;
    }
    .reserv-agreement1-info .close > .close a img {
      width: 100%;
    }
    .reserv-agreement2-info .close > .close a {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 31px;
      height: 31px;
    }
    .reserv-agreement2-info .close > .close a img {
      width: 100%;
    }

    #shop_basic_wrap {
      padding: 0 20px;
      text-align: left;
      height: 600px;
      overflow-y: scroll;
      font-size: 12px;
      color: #888;
    }
    #shop_basic_wrap h2 {
      font-weight: 500;
      color: #444;
      font-size: 14px;
      text-align: left;
      padding: 0px;
    }
    #shop_basic_wrap table {
      width: 100%;
      box-sizing: border-box;
      text-align: center;
    }
    #shop_basic_wrap table td,
    th {
      border: 1px solid #777;
    }
    #shop_basic_wrap table th {
      background-color: #ccc;
      color: #333;
    }
  }
  @media (max-width: 767px) and (min-width: 320px) {
    .contents-wrap {
      padding-bottom: 100px;
    }
    .reserv-wrapper .btn_note {
      padding: 10px 20px 0 20px;
    }
    .reserv-wrapper .btn_note img {
      width: 27px;
      height: auto;
    }
    .reserv-wrapper .subject {
      padding: 0 20px;
    }
    .reserv-wrapper .header-split {
      padding: 0 20px;
      color: #767676;
    }
    .reserv-wrap #reserv-step-1 {
      display: block;
      height: 44px;
      background-color: #fff;
      padding: 0 20px;
      font-size: 16px;
      color: #333;
      line-height: 44px;
      margin-bottom: 6px;
      font-weight: 500;
      position: relative;
    }
    .reserv-wrap #reserv-step-1 label {
      /* position: absolute; */
      z-index: 11;
    }
    .reserv-wrap #reserv-step-1 #agreement1_bit {
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 9px;
      border-radius: 0;
    }
    .reserv-wrap #reserv-step-1 > div {
      float: right;
      color: #528c27;
    }
    .reserv-wrap #reserv-step-1 #agreement1_bit_error {
      position: absolute;
      left: 20px;
      bottom: -21px;
    }
    .reserv-wrap #reserv-step-4 {
      display: block;
      height: 44px;
      background-color: #fff;
      padding: 0 20px;
      font-size: 16px;
      color: #333;
      line-height: 44px;
      margin-bottom: 6px;
      font-weight: 500;
      position: relative;
    }
    .reserv-wrap #reserv-step-4 label {
      /* position: absolute; */
      z-index: 11;
    }
    .reserv-wrap #reserv-step-4 #agreement2_bit {
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 9px;
      border-radius: 0;
    }
    .reserv-wrap #reserv-step-4 > div {
      float: right;
      color: #528c27;
    }
    .reserv-wrap #reserv-step-2 {
      display: block;
      padding: 12px 20px 20px 20px;
      background-color: #fff;
      margin-bottom: 6px;
    }
    .reserv-wrap #reserv-step-2 .reservation_date {
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    .reserv-wrap #reserv-step-2 .reservation_date .subject {
      padding: 0 0 8px 0;
    }
    .reserv-wrap #reserv-step-2 > div:nth-child(2) {
      text-align: center;
      padding: 6px 0 13px 0;
      font-size: 16px;
    }
    .reserv-wrap #reserv-step-2 #option-reserv-date {
      text-align: center;
    }
    .reserv-wrap #reserv-step-2 #option-reserv-date label {
      padding: 0 10px;
      height: 36px;
      font-size: 14px;
      display: inline-block;
      line-height: 36px;
      background-color: #f1f1f1;
      border-radius: 18px;
      margin-bottom: 6px;
    }
    .reserv-wrap #reserv-step-2 #option-reserv-date input[type="radio"]:checked + label {
      padding: 0 10px;
      height: 36px;
      border-radius: 18px;
      background-color: #528c27;
      color: #fff;
      font-size: 14px;
      display: inline-block;
      line-height: 36px;
    }
    .reserv-wrap #reserv-step-2 #option-reserv-date input {
      display: none;
    }
    .reserv-wrap #reserv-step-4 #agreement2_bit_error {
      position: absolute;
      left: 20px;
      bottom: -21px;
    }
    .reserv-wrap #reserv-step-3 {
      background-color: #fff;
      padding: 12px 20px 20px 20px;
    }
    .reserv-wrap #reserv-step-3 .reservation_hour {
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    .reserv-wrap #reserv-step-3 .reservation_hour .subject {
      padding: 0 0 8px 0;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-hour {
      padding: 12px 0;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-hour label {
      width: 56px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      display: inline-block;
      margin-right: 8px;
      background-color: #f1f1f1;
      border-radius: 14px;
      margin-bottom: 6px;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-hour input {
      display: none;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-hour input[type="radio"]:checked + label {
      background-color: #528c27;
      color: #fff;
      border-radius: 14px;
    }
    .reserv-wrap #reserv-step-3 .reservation_minute {
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    .reserv-wrap #reserv-step-3 .reservation_minute .subject {
      padding: 0 0 8px 0;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-minute {
      padding: 12px 0;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-minute label {
      width: 56px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      display: inline-block;
      margin-right: 8px;
      background-color: #f1f1f1;
      border-radius: 14px;
      margin-bottom: 6px;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-minute input {
      display: none;
    }
    .reserv-wrap #reserv-step-3 #option-reserv-minute input[type="radio"]:checked + label {
      background-color: #528c27;
      color: #fff;
      border-radius: 14px;
    }

    .command {
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: 52px;
      background-color: #fff;
      box-shadow: 0 -10px 10px 0 rgba(0, 0, 0, 0.16);
    }
    .command #btn_send {
      position: absolute;
      right: 20px;
      top: 11px;
      width: 124px;
      height: 32px;
      background-color: #528c27;
      color: #fff;
      border-radius: 5px;
      line-height: 32px;
      text-align: center;
    }
    .command #selected_reservate_info {
      position: absolute;
      left: 20px;
      top: 17px;
      font-size: 14px;
      font-weight: 500;
    }

    .reserv-agreement1-info .contents-detail .agreement-command {
      margin: 0 0 20px 0;
      height: 40px;
      text-align: center;
    }
    .reserv-agreement1-info .contents-detail .agreement-command > .confirm a {
      display: inline-block;
      width: 80px;
      height: 41px;
      background: #528c27;
      border-radius: 5px;
      line-height: 42px;
      vertical-align: middle;
      color: #fff;
    }
    .reserv-agreement2-info .contents-detail .agreement-command {
      margin: 0 0 20px 0;
      height: 40px;
      text-align: center;
    }
    .reserv-agreement2-info .contents-detail .agreement-command > .confirm a {
      display: inline-block;
      width: 80px;
      height: 41px;
      background: #528c27;
      border-radius: 5px;
      line-height: 42px;
      vertical-align: middle;
      color: #fff;
    }
    /*.reserv-agreement1-info .close > .close a img {width:100%; }
.reserv-agreement2-info .close > .close a {position:absolute; top:20px; right:20px; width:31px; height:31px; }
.reserv-agreement2-info .close > .close a img {width:100%; }*/

    .reserv-agreement1-info .close > .close a {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 31px;
      height: 31px;
    }
    .reserv-agreement1-info .close > .close a img {
      width: 100%;
    }
    .reserv-agreement2-info .close > .close a {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 31px;
      height: 31px;
    }
    .reserv-agreement2-info .close > .close a img {
      width: 100%;
    }

    #shop_basic_wrap {
      padding: 0 20px;
      text-align: left;
      height: 350px;
      overflow-y: scroll;
      font-size: 12px;
      color: #888;
    }
    #shop_basic_wrap h2 {
      font-weight: 500;
      color: #444;
      font-size: 14px;
      text-align: left;
      padding: 0px;
    }
    #shop_basic_wrap table {
      width: 100%;
      box-sizing: border-box;
      text-align: center;
    }
    #shop_basic_wrap table td,
    th {
      border: 1px solid #777;
    }
    #shop_basic_wrap table th {
      background-color: #ccc;
      color: #333;
    }
  }
  /*******************************************************************************************/
  /* [시승예약] 컨텐츠 설정 종료
/*******************************************************************************************/

  /*******************************************************************************************/
  /* 약관동의1 팝업 레이어 설정 시작
/*******************************************************************************************/

  div.reserv-agreement1-wrap {
    /* display: none; */
    position: fixed;
    /* position: absolute; */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    /* z-index: 90000; */
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

  div.reserv-agreement1-wrap div.reserv-agreement1-info {
    margin: 0 auto 0 auto;
    padding: 0 0 0 0;
    position: relative;
    top: 12%;
    left: 0;
    /* z-index: 99999; */
    width: 90%;
    /* border: 1px solid #222; */
    border: 1px solid #333;
    border-radius: 8px 8px 0 0;
    background-color: #fff;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    box-shadow: 0 3px 7px #555;
    -webkit-box-shadow: 0 3px 7px #555;
    -moz-box-shadow: 0 3px 7px #555;
    background-clip: padding-box;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding-box;
    outline: none;
  }

  div.reserv-agreement1-wrap div.reserv-agreement1-info h3.subject {
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

  div.reserv-agreement2-wrap {
    /* display: none; */
    position: fixed;
    /* _position: absolute; */
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    text-align: center;
    /* z-index: 90000; */
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

  div.reserv-agreement2-wrap div.reserv-agreement2-info {
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

  div.reserv-agreement2-wrap div.reserv-agreement2-info h3.subject {
    margin: 25px 0;
    font-size: 15px;
    letter-spacing: -1px;
  }
  /*******************************************************************************************/
  /* 약관동의1 팝업 레이어 설정 종료
/*******************************************************************************************/
`;
