import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="subject" content="바이크뱅크" />
        <meta name="author" content=", 바이크뱅크" />
        <meta name="keywords" content="바이크뱅크" />
        <meta name="description" content="바이크뱅크" />
        <meta name="copyright" content="Copyrights 2022 BIKE BANK" />
        <meta name="classification" content="internet" />
        <meta name="distribution" content="global" />
        <meta name="language" content="ko" />

        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
