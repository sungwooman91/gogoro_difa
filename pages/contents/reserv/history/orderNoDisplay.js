/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 예약 내역 조회 상세 페이지
/*  위    치 : /contents/reserv/history/orderNoDisplay.js
/*******************************************************************************************/

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import OrderInfo from "./orderNoDisplayDetail";
import { style } from "../../../../lib/component/layout/history";
import { deleteCookie } from "cookies-next";
export default function OrderDetail() {
  // [페이지 설정 초기화]
  const [pageState, setPageState] = useState();
  const [isOrderNum, setIsOrderNum] = useState();
  // [페이지 이동 훅 설정]
  const router = useRouter();

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const response = await axios.post("/api/reserv/history/orderNo").then((res) => {
          console.log("[LOG_SW][/contents/reserv/history/orderNoDisplay][resdata] ", res.data);
          // console.log("sw123", res.data);
          if (res.status === 200) {
            if (res.data.result_code === "00" || res.data.result_code === "OK") {
              // 동적페이지 만들기
              setIsOrderNum(res.data.result_order_no);
              setPageState(true);
            } else if (res.data.result_code === "99") {
              // console.log(res.data.result_code);
              // router.push("/contents/login");
            } else if (res.data.result_code === "88") {
              // console.log(res.data.result_code);
              // router.push("/contents/reserv/history");
            } else {
              // console.log("ㅇㅇㅇ", res.data);
            }
          } else {
            console.log(res.status);
          }
        });
      } catch (e) {
        console.log(e);
        alert("시스템 오류로 인해 해당 서비스가 실행되지 않습니다.\n\t시스템 개발사에 문의 해 주세요.");
      }
    };
    getDataFromServer();
  }, []);

  const goBackHandler = (event) => {
    // deleteCookie("DIFA2022");
    // deleteCookie("SessionSid");
    router.push("/");
  };
  const setRefreshReservHist = (event) => {
    // event.preventdefault();
    router.push("/contents/reserv/history/orderNo/" + isOrderNum);
    // window.location.reload();
  };

  return (
    <>
      <div id="ContentsWrapper">
        <div id="MainContents">
          <div className="contents-wrap">
            <div id="header-wrapper" onClick={goBackHandler}>
              <span className="btn_back">
                <img src="/images/contents/icon_back.png" alt="뒤로가기" />
              </span>
              <span className="header-subject">이전화면</span>
            </div>
            <div className="articles">
              <div className="reserv-wrapper">
                <div className="btn_note">
                  <img src="/images/contents/icon_reservation.png" alt="신청내역 확인" />
                </div>
                <div className="subject">
                  <h2 className="subject">신청내역 확인</h2>
                  <span id="btn_refresh" onClick={setRefreshReservHist}>
                    <span id="refresh_date"></span>
                    <img src="/images/board/button/btn_refresh_new.png" alt="새로고침" />
                  </span>
                </div>
                <div className="header-split">
                  <p>아래에 신청 내역을 확인 하신 후 예약한 시간에 꼭 참여하시기 부탁드립니다. 참여시간이 지난 후에는 예약신청이 취소되오니 이 점 유의하시길 바랍니다.</p>
                  <p className="notice">시승 예약 시간 10분 전에 시승장에 도착 해 주시고, 시승 전 운전면허증 확인절차가 있으니 지참 해 주십시오.</p>
                </div>
                <div id="reserv-content" className="reserv-wrap">
                  {pageState === true ? <OrderInfo orderNo={isOrderNum} /> : <div className="list article-list"></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
