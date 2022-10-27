import "../styles/contents/common/layout.css";
import "../styles/basic.css";
import Head from "next/head";
// import "../styles/reset.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0, width=device-width" />
        <title>고고로 시승행사 예약페이지</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
