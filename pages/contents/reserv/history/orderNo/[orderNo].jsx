/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 예약 내역 조회 페이지
/*  위    치 : /contents/reserv/history/orderNo.js
/*******************************************************************************************/

import Head from "next/head";
import Orderdetail from "./orderNoDisplay";
import { style } from "../../../../../lib/component/layout/history";

export default function OrderNo() {
  return (
    <>
      <Head>
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="imagetoolbar" content="no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="subject" content="고고로 시승행사 예약" />
        <meta name="author" content=", 고고로 시승행사 예약" />
        <meta name="keywords" content="고고로 시승행사 예약" />
        <meta name="description" content="고고로 시승행사 예약" />
        <meta name="copyright" content="Copyrights 2020 BIKE BANK" />
        <meta name="classification" content="internet" />
        <meta name="distribution" content="global" />
        <meta name="language" content="ko" />
        <title>:: 고고로 시승행사 예약 ::</title>
      </Head>
      <div id="ContentsWrapper">
        {/* 폼 */}
        <Orderdetail />
      </div>
      <style jsx>{style}</style>
    </>
  );
}
