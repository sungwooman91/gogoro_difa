// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import requestIp from "request-ip";
import { commonDataLog } from "../../../../lib/component/reservData";
import { getDataLog, setDataLog } from "../../../../lib/component/common";
import prisma from "../../../../lib/prisma.js";
// crypto-js 모듈
// import sha256 from "crypto-js/sha256";
// import hmacSHA512 from "crypto-js/hmac-sha512";
// import Base64 from "crypto-js/enc-base64";
// 쿠키 및 세션 모듈
import { hasCookie, deleteCookie } from "cookies-next";
import { getSession } from "../../../../lib/get-session";

export default async function handler(req, res) {
  // [적용 테이블 명 설정]
  const tableName = "COMMON_RESERVATION_ORDER";
  // [처리결과 설정]
  let result_code = null,
    result_message = null,
    result_keyword = null,
    result_order_no = null,
    kakao_result_code = null,
    kakao_result_message = null;

  if (req.method === "POST") {
    // [ 회원 로그인 확인 ][세션 확인]
    const isAdmin = hasCookie("DIFA2022", { req, res });
    const session = await getSession(req, res);
    let serial = req.body.serial;
    console.log("[LOG_SW][req.body.serial] ", req.body);
    try {
      // []
      if (!req.body.serial) {
        // 고객 정보 시리얼 COMMON_CUSTORMER
        serial = session.Admin_UserSerial;
      }
      // [공용 코드 조회 정보 ]
      const commonReservInfo = await getData("예약처리상태", "Y");
      // console.log("[LOG_SW][commonReservInfo] ", commonReservInfo);
      console.log("[LOG_SW][ Cancel Client Login ] 사용자 쿠키 값 확인", isAdmin);
      console.log("[LOG_SW][ Cancel Client Login ] 사용자 시리얼 넘버", serial);
      // [ 고객 예약 정보 ]
      // 고객 정보 시리얼 COMMON_CUSTORMER
      if (serial !== undefined) {
        // 취소 대상 예약 정보 조회
        const getCancelData = await getOrderView(serial);
        // [ 예약 정보 조회 ]
        if (Array.isArray(getCancelData) && getCancelData.length > 0) {
          if (getCancelData.length === 1) {
            console.log("[LOG_SW][serial] ", serial, getCancelData[0].STATE_TYPE);
            if (getCancelData[0].STATE_TYPE === "00") {
              // [ 예약 취소 처리]
              // 클라이언트 IP addresss
              const clientIp = requestIp.getClientIp(req);
              console.log("[LOG_SW][Client Login] 클라이언트 IP ", clientIp);
              // [예약 취소 함수] serial 번호로 삭제 처리
              await setCancelState(serial, "10", clientIp);
              // 삭제처리 후 result_code 값 부여
              // [고객 예약정보 재조회]
              const getCancelAfterData = await getOrderView(serial);
              console.log("[LOG_SW][Check getCancelAfterData] ", getCancelAfterData[0].STATE_TYPE);
              // [쿠키 및 세션 삭제]
              const cookieState = hasCookie("DIFA2022", { req, res });
              console.log("[SERVER_RESULT][Cancel_Detail] Cookie & Session state ", cookieState);
              if (cookieState) {
                deleteCookie("DIFA2022", { req, res });
                await session.destroy();
                console.log("[SERVER_RESULT][Cancel_Detail] Cookie & Session Delete");
              }

              if (getCancelAfterData[0].STATE_TYPE === "10") {
                result_code = "00";
              }

              if (result_code === "00") {
                try {
                  // 이전, 이후 상태 변수
                  let beforeState = null,
                    afterState = null;
                  // [예약 처리 상태 조회]
                  if (commonReservInfo.length > 0) {
                    // 공용 코드에서 ITEM_CODE 검색
                    for (let idx = 0; idx < commonReservInfo.length; idx++) {
                      const getItemState = commonReservInfo[idx];

                      // 이전 상태명
                      if (getCancelData[0].STATE_TYPE === getItemState.ITEM_CODE) {
                        beforeState = getItemState.ITEM_NAME;
                      }
                      // 변경 상태명
                      if (getItemState.ITEM_CODE === "10") {
                        afterState = getItemState.ITEM_NAME;
                      }
                    }
                    console.log("[LOG_SW][getItemCode][Cancel Reservation afterState]", afterState);
                    console.log("[LOG_SW][getItemCode][Cancel Reservation getCancelData[0].STATE_TYPE]", getCancelAfterData[0].STATE_TYPE);
                  }
                  // [데이터 저장 로그 정보]
                  console.log("[LOG_SW][로그데이터 저장]");
                  let cancelDataLog = commonDataLog;
                  cancelDataLog.TABLE_NAME = tableName;
                  cancelDataLog.FK_SERIAL = getCancelData[0].SERIAL_NUMBER;
                  cancelDataLog.STATE_TYPE = "U";
                  cancelDataLog.USER_ID = getCancelData[0].USER_NAME;
                  cancelDataLog.REGIST_IP = requestIp.getClientIp(req);
                  const beforeSummary = beforeState ? `${beforeState} (${getCancelData[0].STATE_TYPE}})▶` : null;
                  const afterSummary = afterState ? `${afterState} (10)` : null;
                  cancelDataLog.SUMMARY = "<strong>처리상태 :</strong><br />&nbsp;" + beforeSummary + afterSummary;
                  console.log("[LOG_SW][cancelDataLog.SUMMARY] ", cancelDataLog.SUMMARY);

                  if (cancelDataLog.SUMMARY !== null) {
                    // 데이터 로그 저장
                    await setDataLog(cancelDataLog);
                    // 로그 저장 출력 값 생성
                    const getLog = await getDataLog(cancelDataLog);
                    console.log("[SERVER_RESULT] GET_DATA_LOG : ", JSON.stringify(getLog[0]));
                  }
                } catch (e) {
                  console.log("[SERVER_RESULT] [로그데이터 에러] ", e);
                  result_code = "NO";
                  result_message = "시스템 오류로 인해 해당 서비스가 실행되지 않습니다. 시스템 개발사에 문의 해 주세요.";
                }
                result_code = "00";
                result_message = "예약이 취소되었습니다.";
              } else {
                result_code = "NO";
                result_message = "예약이 정상적으로 취소되지 않았습니다. 관리자에 문의 해주세요.";
              }
            } else {
              result_code = "NO";
              result_message = "해당 예약건은 취소 할 수 없습니다. 관리자에 문의해주세요";
            }
          }
        }
      } else {
        result_code = "NO";
        result_message = "해당 예약 건은 취소 할 수 없습니다. 관리자에 문의해주세요";
      }
      console.log("[LOG_SW][result_code] ", result_code, result_message);
      return res.status(200).json({ ok: true, code: result_code, message: result_message, keyword: result_keyword, orderNo: result_order_no });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

// COMMON_RESERVATION_ORDER_Get_View
/**
 * 예약된 주문 내역을 조회하는 함수
 * @param {*} serial 조회하고자 하는 예약정보의 시리얼 넘버 입력
 * @returns 조회된 결과 값을 배열로 출력
 */
async function getOrderView(serial) {
  const SERIAL_NUMBER = serial;
  const reservData = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_ORDER_Get_View] ${SERIAL_NUMBER}, null, null;`;
  return reservData;
}

// COMMON_CODE_Get_List
/**
 * 예약 처리상태를 확인하기 위한 공용 코드 조회 함수
 * @param {*} category "예약처리상태"
 * @param {*} use_bit "Y"
 * @returns 입력한 파라미터를 포함하고 있는 ITEM_NAME명이 접수, 취소, 인증완료인 변수들을 담은 하나의 배열로 반환
 */
async function getData(category, use_bit) {
  const CATEGORY = category,
    USE_BIT = use_bit;
  const reservData = await prisma.$queryRaw`exec [dbo].[COMMON_CODE_Get_List] ${CATEGORY},${USE_BIT}, null, null;`;
  return reservData;
}

// COMMON_RESERVATION_ORDER_Set_State [고객 예약 정보 테이블에 레코드를 갱신]
/**
 * 고객 예약 정보 테이블의 타입을 "예약 취소"로 업데이트 하는 함수
 * @param {*} serial 취소하고자 하는 예약 정보 시리얼 넘버
 * @param {*} state 예약상태를 취소로 변경하는 상태값 입력
 * @param {*} modify_ip 접속한 고객 IP
 * @returns
 */
async function setCancelState(serial, state, modify_ip) {
  const SERIAL_NUMBER = serial,
    STATE_TYPE = state,
    MODIFY_IP = modify_ip;
  const reservData = await prisma.$executeRaw`exec [dbo].[COMMON_RESERVATION_ORDER_Set_State] ${SERIAL_NUMBER}, ${STATE_TYPE}, ${MODIFY_IP}, null, null;`;
  return reservData;
}
