/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 예약 내역 조회 상세 출력 페이지
/*  위    치 : /contents/reserv/history/orderNoDisplayDetail.js
/*******************************************************************************************/

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { style } from "../../../../../lib/component/layout/history";
import { useQRCode } from "next-qrcode";
import classNames from "classnames";
import { deleteCookie } from "cookies-next";

export default function OrderInfo({}) {
  // [ 페이지 설정 초기화 ]
  const [isData, setIsData] = useState(false);
  // QR-code 생성할 암호처리 예약시리얼(예약번호)
  const [isQrOrderNum, setIsQrOrderNum] = useState("");
  /**
   * 예약관리 상태 state
   */
  // [예약 주문 취소 상태 확인 state]
  const [isOrderCancel, setIsOrderCancel] = useState(false);
  // 취소시 예약번호 호출
  const [isCancelOrderNum, setIsCancelOrderNum] = useState(false);
  // [ 관리자 인증 ]
  const [isAuth, setIsAuth] = useState(false);
  /**
   *  예약관련 일반 정보    *
   */
  // [예약정보 시리얼넘버 값]
  const [isSerial, setIsSerial] = useState(0);
  // [예약 정보의 일반 번호]
  const [orderNumNormal, setOrderNumNormal] = useState("");
  // [예약자 이름 상태 state]
  const [isUserName, setIsUserName] = useState("");
  // [예약자 휴대전화번호 상태 state]
  const [isTelNo, setIsTelno] = useState("");
  // [예약 일자 정보]
  const [isOrderDate, setIsOrderDate] = useState("");

  // 리턴 메세지
  // const [orderState, setOrderState] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  // [페이지 이동 설정]
  const router = useRouter();
  // [QR코드 설정 초기화]
  const { Image } = useQRCode();
  const optionQR = {
    type: "image/jpeg",
    quality: 1,
    level: "H",
    margin: 0,
    scale: 5,
    width: 200,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  };
  // 블러 처리
  const optionQR2 = {
    type: "image/jpeg",
    quality: 1,
    level: "H",
    margin: 0,
    scale: 5,
    width: 200,
    color: {
      dark: "#808080",
      light: "#FFFFFF",
    },
  };
  // [ 시승 예약 내역 상세 조회 ]
  useEffect(() => {
    const getDataFromServer = async () => {
      // [예약번호 초기화]
      let getPath = window.window.location.pathname;
      getPath = getPath.split("/");
      const getOrder = getPath[5];
      console.log("[LOG_SW][Set QR-CODE Serial to Send]", getOrder);
      try {
        const response = await axios
          .post("/api/reserv/history/detail", {
            send_order_no: getOrder,
          })
          .then((res) => {
            if (res.status === 200) {
              /** 리턴 받은 data들 useState에 할당 */
              // [페이징 설정 state] useState에 저장되면 true
              setIsData(true);
              // // [예약 시리얼 넘버]
              setIsSerial(res.data.reservResultData.serialNumber);
              // // [예약 주문번호 (일반 예약번호)]
              setOrderNumNormal(res.data.reservResultData.orderNum);
              // [예약자 이름]
              setIsUserName(res.data.reservResultData.userName);
              // [예약자 휴대전화 번호]
              setIsTelno(res.data.reservResultData.userTelno);
              // [예약 일시]
              setIsOrderDate(res.data.reservResultData.orderDate);
              // 인증없이 로그인 했을때 QR코드 입력
              setIsQrOrderNum(getOrder);
              // [결과 메세지]

              // 데이터 상태관리
              if (res.data.code === "OK" || res.data.code === "30" || res.data.code === "00") {
                // QR 코드 데이터 true
                // setIsData(true);
                // 예약정보 Get State
                // setOrderState(true);
                setResultMessage(res.data.message);
                setIsOrderCancel(false);
                if (res.data.code === "30") {
                  setIsAuth(true);
                }
                // alert(res.data.message);
              } else if (res.data.code === "NO") {
                // 취소 내역 및 기존 예약정보와 일치하지 않을때,
                setIsOrderCancel(true);
                setIsCancelOrderNum(true);
                setResultMessage(res.data.message);
              } else {
                // setIsData(false);
                // setOrderState(false);
                alert(res.data.message);
              }
            }
          });
      } catch (e) {
        console.log(e);
        // 시스템 오류로 인해 기존 등록된 브라우저 쿠키 삭제
        deleteCookie("DIFA2022");
        alert("시스템 오류로 인해 해당 서비스가 실행되지 않습니다.\n\t시스템 개발사에 문의 해 주세요.");
      }
    };
    getDataFromServer();
  }, []);

  /**
   * 예약취소 버튼
   */
  const setReservCancel = async () => {
    // 오류 컨트롤 설정 초기화
    let isCancel = false;
    const confirm = "예약 취소 시 해당 연락처로 예약한 내역이 삭제 됩니다.\r\n정말로 시승 예약을 취소하시겠습니까?";
    if (window.confirm(confirm)) {
      isCancel = true;
    } else {
      console.log("[LOG_SW][시승예약 유지]");
    }
    // 예약 고유번호
    if (isCancel) {
      const send_data = isSerial;
      try {
        const response = await axios
          .post("/api/reserv/cancel/detail", {
            serial: send_data,
          })
          .then((res) => {
            if (res.status === 200) {
              if (res.data.code === "00" || res.data.code === "OK") {
                console.log("[LOG_SW][response Cancel] ", res.data);
                router.push("/");
                // [예약 취소 완료] 초기페이지로 돌아가기
              } else if (res.data.code === "99") {
                router.push("/contents/login");
              }
            }
          });
      } catch (e) {
        console.log(e);
        alert("시스템 오류로 인해 해당 서비스가 실행되지 않습니다.\n\t시스템 개발사에 문의 해 주세요.");
      }
    }
  };
  // 시작페이지로 이동
  const setStartPage = () => {
    //
    router.push("/");
  };
  return (
    <>
      {isOrderCancel === false && (
        <div className="list article-list">
          <div>
            <input type="hidden" id="order_idx" name="order_idx" value={JSON.stringify(isSerial)} />
          </div>
          <table id="penalty" className={classNames(["article", "table", "list"])} summary="차량 목록">
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <tbody>
              <tr className="reserv_order_no">
                <th className={classNames("subject", "left")}>예약번호</th>
                <td className={classNames("content", "left")}>{orderNumNormal}</td>
              </tr>
              <tr className="reserv_name">
                <th className={classNames("subject", "left")}>성명</th>
                <td className={classNames("content", "left")}>{isUserName}</td>
              </tr>
              <tr className="reserv_tel">
                <th className={classNames("subject", "left")}>휴대전화번호</th>
                <td className={classNames("content", "left")}>{isTelNo}</td>
              </tr>
              <tr className="reserv_date">
                <th className={classNames("subject", "left")}>신청예약일시</th>
                <td className={classNames("content", "left")}>{isOrderDate}</td>
              </tr>
              <tr className="reserv_qr">
                <th className={classNames("subject", "left")}>QR코드</th>
                <td className={classNames("content", "left")}></td>
              </tr>
              <tr className="reserv_qr_code">
                <td className="subject center" colSpan={2}>
                  {isAuth === false ? (
                    <div className="qr_code">{isData && <Image text={isQrOrderNum} options={optionQR} alt="QR코드" />}</div>
                  ) : (
                    <div className="qr_code qr_complete">
                      {isData && <Image className="qr_confirm" text={isQrOrderNum} options={optionQR2} alt="QR코드" />}
                      <span className="qr_state">인증완료</span>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div id="reserv_notify" className="note">
            <p className="note">QR코드의 경우 입장할 때 본인 확인용으로 쓰입니다. 필히 입장시 제시 부탁드립니다.</p>
          </div>
          <div className="command">
            {isAuth === false && (
              <a onClick={setReservCancel} title="예약취소하기" id="btn_cancel" tabIndex={3100}>
                <span className="subject">예약취소하기</span>
              </a>
            )}

            <a onClick={setStartPage} title="시작페이지로 바로가기" id="btn_main_back" className="btn_main_back">
              <span className="subject">시작페이지로 바로가기</span>
            </a>
          </div>
        </div>
      )}
      {isOrderCancel === true && (
        <div id="expire_message">
          {isCancelOrderNum === true && (
            <p>
              예약번호 : <strong>{orderNumNormal.toString()}</strong>
            </p>
          )}
          <p>{resultMessage}</p>
        </div>
      )}
      <style jsx>{style}</style>
    </>
  );
}
