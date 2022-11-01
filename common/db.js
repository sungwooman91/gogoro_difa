import prisma from "../lib/prisma";
import { getDate } from "../lib/component/common";
import { customerInfoCurrentState, commonReservation, commonReservationOrder, kakaoMessageValue } from "../lib/component/reservData";

// COMMON_RESERVATION_Get_View
/**
 * 예약한 정보를 출력하기 위해 PK값으로 정보 조회
 * @param {*} serialNum 예약 정보의 시리얼 넘버
 * @returns 해당 시리얼넘버와 일치하는 예약 정보 반환
 */
export async function getDataView(serialNum) {
  const SERIAL_NUMBER = serialNum.split("_")[3];
  const reservData = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_Get_View] ${SERIAL_NUMBER}, null, null;`;
  return reservData;
}
// COMMON_CUSTOMER_Get_View
/**
 * 고객 정보 조회 함수 COMMON_CUSTOMER_Get_View
 * @param {*} serialNum 세션값에 등록된 고객 시리얼 넘버
 * @returns
 *
 */
export async function getCustomerDataView(serialNum) {
  const SERIAL_NUMBER = serialNum;
  const reservData = await prisma.$queryRaw`exec [dbo].[COMMON_CUSTOMER_Get_View] ${SERIAL_NUMBER}, null, null;`;
  return reservData;
}

// [이전 예약 정보 조회]
/**
 * COMMON_RESERVATION_ORDER_Get_List_Check
 * @param {*} userName
 * @param {*} telNo
 * @returns
 */
export async function getDataCheck(userName, telNo) {
  const USER_NAME = userName,
    TEL_NO = telNo;
  // params ::
  // event_serial, reserv_serial, customer_serial, reservation_type, from_date, to_date, reserv_hour, reserv_min, use_bit, sort_bit, user_name, tel_no, order_no, row_size, current_page, result_code, result_message, total_record
  // 1, 0, 0, null, null, null, null, null, "Y", null, userName, telno, null, 99999, 1
  const reservData = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_ORDER_Get_List_Check]  2, 0, 0, null,null,null,null,null,"Y",null,${USER_NAME},${TEL_NO},null,99999,1, null, null,0;`;
  // console.log("[LOG_SW]Check reservData] ", reservData);
  return reservData;
}

// [고객 예약 정보 테이블에 새 레코드 추가]
/**
 * 새로운 예약 정보를 예약 테이블에 추가하는 함수
 * COMMON_RESERVATION_ORDER_Set_Insert
 * @param {*} reservInfo object 타입의 예약정보 입력 변수
 * @returns
 */
export async function newReservInsert(reservInfo) {
  const COMMON_EVENT_SERIAL = reservInfo.COMMON_EVENT_SERIAL,
    COMMON_RESERVATION_SERIAL = reservInfo.COMMON_RESERVATION_SERIAL,
    COMMON_CUSTOMER_SERIAL = reservInfo.COMMON_CUSTOMER_SERIAL,
    RESERVATION_TYPE = reservInfo.RESERVATION_TYPE,
    RESERVATION_DATE = reservInfo.RESERVATION_DATE,
    RESERVATION_HOUR = reservInfo.RESERVATION_HOUR,
    RESERVATION_MINUTE = reservInfo.RESERVATION_MINUTE,
    MEMO = reservInfo.MEMO,
    AGREEMENT1_BIT = reservInfo.AGREEMENT1_BIT,
    AGREEMENT2_BIT = reservInfo.AGREEMENT2_BIT,
    REGIST_IP = reservInfo.REGIST_IP;

  const reservData =
    await prisma.$executeRaw`exec [dbo].[COMMON_RESERVATION_ORDER_Set_Insert]  ${COMMON_EVENT_SERIAL}, ${COMMON_RESERVATION_SERIAL}, ${COMMON_CUSTOMER_SERIAL}, ${RESERVATION_TYPE},${RESERVATION_DATE},${RESERVATION_HOUR},${RESERVATION_MINUTE},${MEMO},${AGREEMENT1_BIT},${AGREEMENT2_BIT},${REGIST_IP}, 0, null, null, 0;`;
  // executeRaw의 결과는 현재 Int로만 출력됨. 이에따라 정수 유무를 확인하여 등록성공을 확인하고
  // 프로시저에 대한 결과 값은 다른 처리를 통해서 값을 가져와야함.
  let result = Number.isInteger(reservData);
  if (result) {
    return result;
  } else {
    return false;
  }
}
// [고객 예약 정보 테이블에 새 레코드 추가의 결과값 얻기 1.serial_number 2. order_no ]
/**
 * COMMON_RESERVATION_ORDER_Get_List
 * 기존 프로시저에 따른 newReservInsert 함수 결과값 도출을 위해 예약 주문 내역 조회하는 함수
 * @param {*} userName 예약한 고객의 이름 입력.
 * @param {*} telNo 예약한 고객의 휴대전화번호 입력
 * @returns 예약된
 */
export async function newReservInsertResult(event_serrial, userName, telNo) {
  const USER_NAME = userName,
    TEL_NO = telNo,
    COMMON_EVENT_SERIAL = event_serrial;
  // params ::
  // event_serial, reserve_serial, customer_serial, reservation_type, from_date, to_date, reserv_hour, reserv_min, use_bit, sort_bit, user_name, tel_no, order_no, row_size, current_page, result_code, result_message, total_record
  // 1, 0, 0, null, null, null, null, null, "Y", null, userName, telno, null, 99999, 1
  const reservData =
    await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_ORDER_Get_List]  ${COMMON_EVENT_SERIAL}, 0, 0, "00",null,null,null,null,null,"Y",null,${USER_NAME},${TEL_NO},null,99999,1, null, null,0;`;
  //   console.log(reservData);
  return reservData;
}

// api/regist/search/reservMinute 에서 사용
/**
 * 예약 가능한 시간들을 선택했을때, 선택 가능한 분단위 정보를 조회하는 함수.
 * @param {*} order_bit
 * @param {*} event_serial 진행중인 행사의 시리얼번호 입력
 * @param {*} reservation_type 예약처리 상태 입력
 * @param {*} reserv_date 고객이 선택한 예약 날짜
 * @param {*} reserv_hour 고객이 선택한 예약 시간대
 * @param {*} use_bit "Y" 입력
 * @returns
 */
export async function orderGetTime(order_bit, event_serial, reservation_type, reserv_date, reserv_hour, use_bit) {
  const ORDER_BIT = order_bit,
    COMMON_EVENT_SERIAL = event_serial,
    RESERVATION_TYPE = reservation_type,
    RESERVATION_DATE = reserv_date,
    RESERVATION_HOUR = reserv_hour,
    USE_BIT = use_bit;

  const reservData =
    await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_Get_Minute] ${ORDER_BIT}, ${COMMON_EVENT_SERIAL}, ${RESERVATION_TYPE}, ${RESERVATION_DATE},  ${RESERVATION_HOUR}, ${USE_BIT}, null, null;`;

  if (reservData.length === 0 && Array.isArray(reservData)) {
    // 빈배열 체크
    return false;
  } else {
    if (reservData.length > 0) {
      let getMinuteResult = [];
      // getTimeResult.push(RESERVATION_DATE);
      // 현재 month 값 설정
      const today = new Date();
      const thisHour = ("0" + today.getHours()).slice(-2);
      const thisMinute = ("0" + today.getMinutes()).slice(-2);
      // 현재 Hour에 신청가능한 날짜 sort
      for (let index = 0; index < reservData.length; index++) {
        // reservDate 결과값 = [ '2022', '08', '17' ]
        if ((reservData[index].RESERVATION_HOUR && reservData[index].RESERVATION_MINUTE > thisMinute) || reservData[index].RESERVATION_HOUR > thisHour) {
          if (reservData[index].ORDER_COUNT <= reservData[index].RESERVATION_MAX) {
            getMinuteResult.push(reservData[index]);
          }
        }
      }

      return getMinuteResult;
    }
  }
}

export async function orderGetTimeTest(order_bit, event_serial, reservation_type, reserv_date, reserv_hour, use_bit) {
  const ORDER_BIT = order_bit,
    COMMON_EVENT_SERIAL = event_serial,
    RESERVATION_TYPE = reservation_type,
    RESERVATION_DATE = reserv_date,
    RESERVATION_HOUR = reserv_hour,
    USE_BIT = use_bit;

  const reservData =
    await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_Get_Minute] ${ORDER_BIT}, ${COMMON_EVENT_SERIAL}, ${RESERVATION_TYPE}, ${RESERVATION_DATE},  ${RESERVATION_HOUR}, ${USE_BIT}, null, null;`;

  return reservData;
}

// Data Log 저장 함수
/**
 * sms 전송 이후 신규 고객이 등록 or 재갱신 됬을때 데이터 로그 기록을 남기는 함수
 * @param {*} commonDataLog object 타입의 로그 데이터 (db 테이블 명, FK 시리얼 넘버, 유저 아이디, 로그 요약, 등록된 IP 주소)
 * @returns db에 업데이트가 완료되면 무작위 int 값이 생성
 */
export async function setDataLog(commonDataLog) {
  const TABLE_NAME = commonDataLog.TABLE_NAME,
    FK_SERIAL = commonDataLog.FK_SERIAL,
    STATE_TYPE = commonDataLog.STATE_TYPE,
    USER_ID = commonDataLog.USER_ID,
    SUMMARY = commonDataLog.SUMMARY,
    REGIST_IP = commonDataLog.REGIST_IP;

  const dataLog = await prisma.$executeRaw`exec [dbo].[COMMON_DATA_LOG_Set_Insert] ${TABLE_NAME}, ${FK_SERIAL}, ${STATE_TYPE}, ${USER_ID}, ${SUMMARY}, ${REGIST_IP}, null, null, 0;`;
  return dataLog;
}
// Data 로그 Get 함수
/**
 * 데이터 로그를 조회 하기 위한 함수
 * @param {*} commonDataLog 조회할 db 테이블명, FK 시리얼넘버가 등록된 object 입력
 * @returns
 */
export async function getDataLog(commonDataLog) {
  const TABLE_NAME = commonDataLog.TABLE_NAME,
    FK_SERIAL = commonDataLog.FK_SERIAL;

  const dataLog = await prisma.$queryRaw`exec [dbo].[COMMON_DATA_LOG_Get_List] ${TABLE_NAME}, ${FK_SERIAL}, null, null, 0;`;
  return dataLog;
}
