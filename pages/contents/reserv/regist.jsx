/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 예약 등록 페이지
/*  위    치 : /contents/reserv/regist.js
/*******************************************************************************************/

import Head from "next/head";
import axios from "axios";
// 예약 등록 폼 컴포넌트 호출
import Registform from "./regist/registFrom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteCookie, getCookies, hasCookie } from "cookies-next";
// import { getSession } from "../../../lib/get-session";
// css
import { style } from "../../../lib/component/layout/regist";

const Regist = () => {
  // [ 페이지 초기화 ]
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  /**
   * 로그인 확인여부 useEffect
   * api/login/check 에서 로그인 상태를 쿠키와 세션값으로 확인 후 결과 처리
   */
  useEffect(() => {
    const getLoginStatus = () => {
      // 로그인 화면으로 넘어올떄 무조건 쿠키 삭제
      // deleteCookie("DIFA2022");
      // deleteCookie("SessionSid");
      console.log("login api ");
      const loginState = false;
      // 로그인 검사
      axios
        .post("/api/login/auth", {
          user_login: loginState,
        })
        .then((res) => {
          // console.log("login api 확인", res.status);
          console.log("login api ", res.data);
          const loginCheck = res.data.result;
          const orderCheck = res.data.order_check;
          if (loginCheck) {
            // 로그인 상태값 true로 변경
            console.log("orderCheck api ", orderCheck);
            // 이전 주문내용이 있으면
            if (orderCheck) {
              router.push("/contents/reserv/history/orderNo");
              setIsLogin(true);
            }
            //없으면
            // else {
            //   router.push("/contents/reserv/regist");
            // }
          } else {
            // 로그인 페이지 보여줌
            setIsLogin(true);
          }
        })
        .catch((e) => {
          deleteCookie("DIFA2022");
          alert("시스템 오류로 인해 해당 서비스가 실행되지 않습니다.\n\n\t시스템 개발사에 문의 해 주세요.");
          console.log("something went wrong :(", e);
          router.push("/");
        });
      getLoginStatus();
    };
  }, []);

  // 페이지 뒤로 가기
  const backToPageHandler = () => {
    router.push("/");
  };

  /**
   * 예약 취소 이벤트
   * 등록 도중에 예약 취소시, 해당 브라우저의 관련된 쿠키와 세션을 삭제하는 기능
   */
  const reservCancel = async () => {
    //예약 취소 물음 창 형성
    if (confirm("예약 등록을 취소하시겠습니까??")) {
      deleteCookie("DIFA2022");
      router.push("/");
    } else {
      return;
    }
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
              <div id="header-wrapper">
                <span className="btn_back" onClick={backToPageHandler}>
                  <img src="/images/contents/icon_back.png" alt="뒤로가기" />
                </span>
                <span className="header-subject" onClick={backToPageHandler}>
                  이전화면
                </span>
                <span className="btn-cancel" onClick={reservCancel}>
                  예약취소하기
                </span>
              </div>
              <div className="articles">
                <div className="reserv-wrapper">
                  <div className="btn_note">
                    <img src="/images/contents/icon_note.png" alt="시승예약 입력" />
                  </div>
                  <div className="subject">
                    <h2 className="subject">시승예약</h2>
                  </div>
                  <div className="header-split">
                    <p>아래의 내용에 따라 약관을 읽으신 후 날짜와 시간, 분을 선택하시면 예약을 진행 하실 수 있습니다.</p>
                  </div>
                  <Registform className="reserv-wrap" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{style}</style>
    </>
  );
};

export default Regist;
