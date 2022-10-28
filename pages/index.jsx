/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 시승 예약 시스템 메인화면
/*  위    치 : /contents/index.js
/*******************************************************************************************/

import axios from "axios";
import { useRouter } from "next/router";
// css
import { style } from "../lib/component/layout/reset";

export default function App() {
  /** 페이지 초기화 */
  const router = useRouter();

  /**
   * 예약 일정 확인
   * 예약 행사 정보 조회를 위한 버튼 클릭 이벤트
   */
  const checkReservationEventHandler = async () => {
    console.log("[LOG_SW] 예약 행사 정보 확인");
    await axios.get("http://rentapi.gobikebank.com/v1/event/check").then((res) => {
      if (res.status === 200) {
        /** 현재 예약이 가능한  */
        const reservationList = res.data.data;
        /**
         * COMMON_RESERVATION_Get_Hour 프로시저 호출 "현재 날짜" 기준으로 검색.
         * 리스트 결과 값이 '0'이면 해당 날짜에 예약 시간이 없으므로 로그인 화면으로 이동 X
         */
        if (reservationList.length === 0) {
          console.log("[LOG_SW] 현재는 행사 기간이 아닙니다...");
          alert("현재는 행사 기간이 아닙니다");
        } else {
          console.log("[LOG_SW] 로그인 화면으로 이동합니다...");
          router.push("/contents/login/");
        }
      }
    });

    // 버그 수정 페이지 이동
    // router.push("/contents/reserv/regist");
  };
  /** 시승 행사 안내 페이지 이동 처리 콜백 함수 */
  const eventGuideHandler = (e) => {
    router.push("/contents/intro");
  };
  /** 예약 정보 조회 페이지 이동 처리 함수 */
  const reservInfoClickHandler = (e) => {
    router.push("/contents/reserv/history/orderNo");
  };

  return (
    <>
      <div id="body_wrap" className="body_wrap">
        <h1 className="gogoro_logo">gogoro</h1>
        <h2>고고로 시승행사 예약</h2>
        <button type="button" className="event_guide" onClick={eventGuideHandler}>
          시승행사 안내
        </button>
        <button type="button" className="event_application" onClick={checkReservationEventHandler}>
          시승예약 신청하기
        </button>
        <button type="button" className="event_ver" onClick={reservInfoClickHandler}>
          신청내역 확인하기
        </button>
        <img className="main_logo" src="/images/contents/main_back_logo.png" alt="genstation_log" />
      </div>
      <style jsx>{style}</style>
    </>
  );
}
