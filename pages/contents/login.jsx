/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 로그인 페이지
/*  위    치 : /contents/login.js
/*******************************************************************************************/

import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
// 페이지 이동 함수 모듈
import { useRouter } from "next/router";
// 공용 처리 함수
import LoginForm from "./login/loginForm";
// css
import { style } from "../../lib/component/layout/login";

export default function LoginFormGogoro() {
  const router = useRouter();
  /** 로그인 입력페이지 상태값 */
  const [isLogin, setIsLogin] = useState(true);
  // const [isOrder, setIsOrder] = useState(false);
  // 로그인 확인여부
  useEffect(() => {
    // const getLoginStatus = () => {
    //   // 로그인 화면으로 넘어올떄 무조건 쿠키 삭제
    //   // deleteCookie("DIFA2022");
    //   // deleteCookie("SessionSid");
    //   // 로그인 상태 변수
    //   const loginState = false;
    //   // 로그인 검사
    //   axios
    //     .post("/api/login/auth", {
    //       user_login: loginState,
    //     })
    //     .then((res) => {
    //       // console.log("login api 확인", res.status);
    //       console.log("login api ", res.data);
    //       const loginCheck = res.data.result;
    //       const orderCheck = res.data.order_check;
    //       if (loginCheck) {
    //         // 로그인 상태값 true로 변경
    //         console.log("orderCheck api ", orderCheck);
    //         // 이전 주문내용이 있으면
    //         if (orderCheck) {
    //           router.push("/contents/reserv/history/orderNo");
    //           setIsLogin(true);
    //         }
    //         //없으면
    //         else {
    //           router.push("/contents/reserv/regist");
    //         }
    //       } else {
    //         // 로그인 페이지 보여줌
    //         setIsLogin(true);
    //       }
    //     })
    //     .catch((e) => {
    //       deleteCookie("DIFA2022");
    //       alert("시스템 오류로 인해 해당 서비스가 실행되지 않습니다.\n\n\t시스템 개발사에 문의 해 주세요.");
    //       console.log("something went wrong :(", e);
    //       router.push("/");
    //     });
    // };
    // getLoginStatus();
  }, []);
  /** 페이지 이동  */
  const backToPageHandler = () => {
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>:: 고고로 시승행사 예약 ::</title>
      </Head>
      <div id="ContentsWrapper">
        {isLogin === true && (
          <div id="MainContents">
            <div className="contents-wrap">
              <div id="header-wrapper" onClick={backToPageHandler}>
                <span className="btn_back">
                  <img src="/images/contents/icon_back.png" alt="뒤로가기" />
                </span>
                <span className="header-subject">이전화면</span>
                <span className="btn-cancel">예약취소하기</span>
              </div>
            </div>
            <div className="articles">
              <div className="login-wrapper">
                <div className="btn_note">
                  <img src="/images/contents/icon_note.png" alt="사용자 정보 입력" />
                </div>
                <div className="subject">
                  <h2 className="subject">사용자 확인</h2>
                </div>
                <div className="header-split">
                  <p>사용자 확인을 위해서 이름과 전화번호가 필요합니다.</p>
                  <p>본인 이름과 본인 소유의 휴대전화번호를 입력하시고 안내에 따라 인증번호를 입력하시면 시승예약을 하실 수 있습니다.</p>
                </div>
                <LoginForm className="login-wrap" />
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{style}</style>
    </>
  );
}
