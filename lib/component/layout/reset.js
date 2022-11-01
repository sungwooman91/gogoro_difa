import css from "styled-jsx/css";

export const style = css`
  @media (min-width: 1194px) {
    .tablet {
      display: none !important;
    }
    .mobile {
      display: none !important;
    }
  }
  @media (max-width: 1193px) and (min-width: 768px) {
    .pc {
      display: none !important;
    }
    .mobile {
      display: none !important;
    }
  }
  @media (max-width: 767px) and (min-width: 320px) {
    .pc {
      display: none !important;
    }
    .tablet {
      display: none !important;
    }
  }

  @media (min-width: 768px) {
    html {
      height: 100%;
    }
    body {
      height: 100%;
      background-color: #ccc;
      background-image: url(/images/contents/back_pattern.png);
    }
    #body_wrap {
      width: 420px;
      background-color: #f1f1f1;
      background-image: url(/images/contents/main_back.png);
      background-repeat: no-repeat;
      background-position: 50% 100%;
      height: 100%;
      margin: 0 auto;
      background-size: 100% auto;
    }
    #body_wrap .gogoro_logo {
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
    #body_wrap h2 {
      text-align: center;
      padding: 34px 0 61px 0;
      font-size: 25px;
      font-weight: bold;
      color: #0f0f0f;
    }
    #body_wrap .event_guide {
      display: block;
      width: 264px;
      height: 44px;
      margin: 0 auto;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.09);
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 8px;
      cursor: pointer;
    }
    #body_wrap .event_application {
      display: block;
      width: 264px;
      height: 44px;
      margin: 0 auto;
      border-radius: 5px;
      background-color: #528c27;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.09);
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #fff;
      cursor: pointer;
    }
    #body_wrap .event_ver {
      display: block;
      width: 264px;
      height: 44px;
      margin: 0 auto;
      border-radius: 5px;
      background-color: #78ab30;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.09);
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      cursor: pointer;
    }
    #body_wrap .main_logo {
      display: block;
      /* width: 264px; */
      /* height: 44px; */
      /* margin-top: 100px; */
      padding-top: 30px;
      margin: 50px auto;
    }
  }
  @media (max-width: 767px) and (min-width: 320px) {
    html {
      height: 100%;
    }
    body {
      height: 100%;
    }
    #body_wrap {
      width: 100%;
      background-color: #f1f1f1;
      background-image: url(/images/contents/main_back.png);
      background-repeat: no-repeat;
      background-position: 50% 100%;
      height: 100%;
      margin: 0 auto;
      background-size: 100% auto;
    }
    #body_wrap .gogoro_logo {
      width: 165px;
      height: 74px;
      margin: 0 auto;
      background-image: url(/images/contents/logo.png);
      background-repeat: no-repeat;
      padding-top: 120px;
      background-size: 100% auto;
      font-size: 0px;
      background-position: 50% 100%;
    }
    #body_wrap h2 {
      text-align: center;
      padding: 34px 0 61px 0;
      font-size: 25px;
      font-weight: bold;
      color: #0f0f0f;
    }
    #body_wrap .event_guide {
      display: block;
      width: 264px;
      height: 44px;
      margin: 0 auto;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.09);
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 8px;
      cursor: pointer;
      color: #1c1c1c;
    }
    #body_wrap .event_application {
      display: block;
      width: 264px;
      height: 44px;
      margin: 0 auto;
      border-radius: 5px;
      background-color: #528c27;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.09);
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #fff;
      cursor: pointer;
    }
    #body_wrap .event_ver {
      display: block;
      width: 264px;
      height: 44px;
      margin: 0 auto;
      border-radius: 5px;
      background-color: #78ab30;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.09);
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      cursor: pointer;
    }
    #body_wrap .main_logo {
      display: block;
      /* width: 264px;
      height: 44px; */
      padding-top: 60px;
      margin: 0 auto;
    }
  }
  @media (max-height: 670px) {
    #body_wrap .main_logo {
      display: block;
      padding-top: 15px;
      margin: 0 auto;
    }
    #body_wrap .gogoro_logo {
      padding-top: 40px;
    }
    #body_wrap h2 {
      padding: 18px 0 21px 0;
    }
  }
  * {
    font-family: "Noto Sans KR", sans-serif;
    word-break: keep-all;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: "Noto Sans KR", sans-serif !important;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    background: none;
    border: none;
  }
  button:focus {
    outline: none;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  form {
    height: 100%;
  }

  hr {
    border: 1px solid #e1e1e1;
  }
`;
