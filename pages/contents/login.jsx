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
  // [ 접속 유저 아이피 주소 ]
  // const [getUserIp, setGetUserIp] = useState("");
  // const [isOrder, setIsOrder] = useState(false);
  // 로그인 확인여부
  useEffect(() => {
    setIsLogin(true);
    // const getLoginIpAddress = async () => {
    //   try {

    //     // console.log(response);
    //     if (response.status === 200) {
    //       console.log(response.data.ip);
    //       setIsLogin(true);
    //       // 사용자 IP 주소 겟
    //       setGetUserIp();
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // getLoginIpAddress();
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
              {isLogin === true && <LoginForm className="login-wrap" />}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
