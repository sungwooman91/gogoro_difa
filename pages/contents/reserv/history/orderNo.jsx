/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 예약 내역 조회 페이지
/*  위    치 : /contents/reserv/history/orderNo.js
/*******************************************************************************************/

import Head from "next/head";
import axios from "axios";
import Orderdetail from "./orderNoDisplay";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { style } from "../../../../lib/component/layout/history";
import { deleteCookie } from "cookies-next";

export default function OrderNo() {
  /** 페이징 기본 설정 */
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  /** 로그인 확인 여부 */
  /** <summary> axios 통신으로 백엔드 로그인 확인 유무 파악 */
  useEffect(() => {
    // 페이지 진입하자마자 로그인 확인 부터 진행.
    const getLoginStatus = () => {
      const loginState = false;
      axios
        .post("/api/login/auth", {
          user_login: loginState,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("예약 내역 페이지 : ", res.data);
            const loginCheck = res.data.result;
            const orderCheck = res.data.order_check;

            console.log("orderCheck api ", orderCheck);
            // 사용자 인증 확인
            if (loginCheck) {
              // 이전 주문내용이 있으면
              if (orderCheck) {
                setIsLogin(true);
              }
              //없으면
              else {
                deleteCookie("DIFA2022");
                alert("예약 내역이 확인되지 않습니다. 예약 등록해주세요.");
                router.push("/contents/login");
              }
            }
            // 인증 안되어있으면 메인페이지
            else {
              alert("사용자 인증 후 시승예약이 가능합니다.");
              router.push("/contents/login");
            }
          } else {
            // 쿠키삭제
            deleteCookie("DIFA2022");
            console.log("[LOG_SW][Client Login] ", res.status);
          }
        })
        .catch((e) => {
          deleteCookie("DIFA2022");
          alert("시스템 오류로 인해 해당 서비스가 실행되지 않습니다.\n\n\t시스템 개발사에 문의 해 주세요.");
          console.log("something went wrong :(", e);
          router.push("/");
        });
    };
    getLoginStatus();
  }, []);

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
        {isLogin && isLogin ? <Orderdetail /> : null}
      </div>
      <style jsx>{style}</style>
    </>
  );
}
