// 현재 고객 정보 객체 (commonReservation) Entity 개념 COMMON_RESERVATION Table
export const commonReservation = {};
(commonReservation.SERIAL_NUMBER = null),
  (commonReservation.REGIST_DATE = null),
  (commonReservation.REGIST_IP = null),
  (commonReservation.MODIFY_DATE = null),
  (commonReservation.MODIFY_IP = null),
  (commonReservation.CANCEL_BIT = "N"),
  (commonReservation.CANCEL_REASON = null),
  (commonReservation.USE_BIT = "Y"),
  (commonReservation.COMMON_EVENT_SERIAL = 1),
  (commonReservation.RESERVATION_TYPE = "00"),
  (commonReservation.RESERVATION_DATE = ""),
  (commonReservation.RESERVATION_HOUR = ""),
  (commonReservation.RESERVATION_MINUTE = "@"),
  (commonReservation.RESERVATION_MAX = 0),
  (commonReservation.ORDER_COUNT = 0),
  (commonReservation.MEMO = "");

// 현재 고객 정보 객체 (commonReservationOrder) Entity 개념 COMMON_RESERVATION_ORDER Table
export const commonReservationOrder = {};
(commonReservationOrder.SERIAL_NUMBER = null),
  (commonReservationOrder.REGIST_DATE = null),
  (commonReservationOrder.REGIST_IP = null),
  (commonReservationOrder.MODIFY_DATE = null),
  (commonReservationOrder.MODIFY_IP = null),
  (commonReservationOrder.CANCEL_BIT = "N"),
  (commonReservationOrder.CANCEL_REASON = null),
  (commonReservationOrder.USE_BIT = "Y"),
  (commonReservationOrder.COMMON_EVENT_SERIAL = 1),
  (commonReservationOrder.COMMON_RESERVATION_SERIAL = null),
  (commonReservationOrder.COMMON_CUSTOMER_SERIAL = null),
  (commonReservationOrder.RESERVATION_TYPE = "00"),
  (commonReservationOrder.RESERVATION_DATE = ""),
  (commonReservationOrder.RESERVATION_HOUR = ""),
  (commonReservationOrder.RESERVATION_MINUTE = "@"),
  (commonReservationOrder.STATE_TYPE = 0),
  (commonReservationOrder.MEMO = ""),
  (commonReservationOrder.AGREEMENT1_BIT = 0),
  (commonReservationOrder.AGREEMENT1_DATE = 0),
  (commonReservationOrder.AGREEMENT2_BIT = 0),
  (commonReservationOrder.AGREEMENT2_DATE = 0),
  (commonReservationOrder.ORDER_NO = ""),
  (commonReservationOrder.CONFIRM_DATE = "");

// 현재 고객 정보 객체 (customerInfoCurrentState) Entity 개념 COMMON_CUSTOMER Table
export const customerInfoCurrentState = {};
(customerInfoCurrentState.SERIAL_NUMBER = null),
  (customerInfoCurrentState.REGIST_DATE = null),
  (customerInfoCurrentState.REGIST_IP = null),
  (customerInfoCurrentState.MODIFY_DATE = null),
  (customerInfoCurrentState.MODIFY_IP = null),
  (customerInfoCurrentState.CANCEL_BIT = null),
  (customerInfoCurrentState.CANCEL_REASON = null),
  (customerInfoCurrentState.USE_BIT = "Y"),
  (customerInfoCurrentState.COMMON_EVENT_SERIAL = 1),
  (customerInfoCurrentState.USER_TYPE = "5"),
  (customerInfoCurrentState.USER_ID = ""),
  (customerInfoCurrentState.PASSWORD = ""),
  (customerInfoCurrentState.USER_NAME = ""),
  (customerInfoCurrentState.EMAIL = "@"),
  (customerInfoCurrentState.TEL_NO = ""),
  (customerInfoCurrentState.ACCESS_TOKEN = ""),
  (customerInfoCurrentState.MEMO = ""),
  (customerInfoCurrentState.PUSH_ID = null),
  (customerInfoCurrentState.LOGIN_CODE = ""),
  (customerInfoCurrentState.LOGIN_CONFIRM_BIT = ""),
  (customerInfoCurrentState.LOGIN_DATE = null),
  (customerInfoCurrentState.EVENT_NAME = ""),
  (customerInfoCurrentState.EVENT_CODE = ""),
  (customerInfoCurrentState.USER_CONFIRM_BIT = ""),
  (customerInfoCurrentState.ORDER_NO = "");

// 카카오톡 알림톡 결과 (customerInfoCurrentState) Entity 개념 COMMON_CUSTOMER Table
export const kakaoMessageResult = {};
kakaoMessageResult.ressult_code = "";
kakaoMessageResult.ressult_message = "메세지 전송 객체입니다.";

// 카카오 알림톡 정보 객체
export const kakaoMessageValue = {};
(kakaoMessageValue.plusFriendId = "@bikebank"),
  (kakaoMessageValue.senderKey = "506bf71b391cb2fedabf6acef6210869eb64a25d"),
  (kakaoMessageValue.templateCode = ""),
  (kakaoMessageValue.contents = ""),
  (kakaoMessageValue.receiverTelNo = ""),
  (kakaoMessageValue.userKey = ""),
  (kakaoMessageValue.title = "카카오톡 문자 전송 테스트"),
  (kakaoMessageValue.resendType = "LMS"),
  (kakaoMessageValue.resendCallback = "15229008"),
  (kakaoMessageValue.contact_us = "010-4380-0051"),
  (kakaoMessageValue.userName = ""),
  (kakaoMessageValue.orderNum = ""),
  (kakaoMessageValue.reservDate = "");

// 데이터 저장 로그 객체
export const commonDataLog = {};
commonDataLog.FK_SERIAL = null;
commonDataLog.STATE_TYPE = "I";
commonDataLog.TABLE_NAME;
commonDataLog.SUMMARY = "신규";
commonDataLog.USER_ID = "";
commonDataLog.REGIST_IP;
commonDataLog.REGIST_DATE;
commonDataLog.SERIAL_NUMBER;
commonDataLog.USE_BIT = "Y";

// 현재 로그인 시도 중인 고객정보 객체 [getAuthNum.js]
// api/login/getAuthNum
/**
 * 현재 예약 시도중인 고객 정보 데이터셋
 * @param {*} data 고객 이름, 휴대전화번호로 DB에서 조회한 고객 정보 데이터
 * @returns
 */
export function getCustomerData(data) {
  const customerInfoCurrentState = {};
  (customerInfoCurrentState.SERIAL_NUMBER = data.SERIAL_NUMBER),
    (customerInfoCurrentState.REGIST_DATE = data.REGIST_DATE),
    (customerInfoCurrentState.REGIST_IP = data.REGIST_IP),
    (customerInfoCurrentState.MODIFY_DATE = data.MODIFY_DATE),
    (customerInfoCurrentState.MODIFY_IP = data.MODIFY_IP),
    (customerInfoCurrentState.CANCEL_BIT = data.CANCEL_BIT),
    (customerInfoCurrentState.CANCEL_REASON = data.CANCEL_REASON),
    (customerInfoCurrentState.USE_BIT = data.USE_BIT),
    (customerInfoCurrentState.COMMON_EVENT_SERIAL = data.COMMON_EVENT_SERIAL),
    (customerInfoCurrentState.USER_TYPE = data.USER_TYPE),
    (customerInfoCurrentState.USER_ID = data.USER_ID),
    (customerInfoCurrentState.PASSWORD = data.PASSWORD),
    (customerInfoCurrentState.USER_NAME = data.USER_NAME),
    (customerInfoCurrentState.EMAIL = data.EMAIL),
    (customerInfoCurrentState.TEL_NO = data.TEL_NO),
    (customerInfoCurrentState.ACCESS_TOKEN = data.ACCESS_TOKEN),
    (customerInfoCurrentState.MEMO = data.MEMO),
    (customerInfoCurrentState.PUSH_ID = data.PUSH_ID),
    (customerInfoCurrentState.LOGIN_CODE = data.LOGIN_CODE),
    (customerInfoCurrentState.LOGIN_CONFIRM_BIT = data.LOGIN_CONFIRM_BIT),
    (customerInfoCurrentState.LOGIN_DATE = data.LOGIN_DATE),
    (customerInfoCurrentState.EVENT_NAME = data.EVENT_NAME),
    (customerInfoCurrentState.EVENT_CODE = data.EVENT_CODE),
    (customerInfoCurrentState.USER_CONFIRM_BIT = data.USER_CONFIRM_BIT),
    (customerInfoCurrentState.ORDER_NO = data.ORDER_NO);
  return customerInfoCurrentState;
}

// SMS send LOG 객체
/**
 * kakao비즈메세지 로그 저장 데이터 셋업 함수
 * @param {*} serial 신규로 추가된 예약 정보의 시리얼 넘버 입력
 * @param {*} kakaoData 카카오비즈메세지 전송 템플릿 객체 입력
 * @param {*} resultMessage 카카오비즈메세지 전송 회사 내부 API 함수에서 도출된 결과 입력
 * @param {*} ip_address ip 주소
 * @returns
 */
export function setLogData(serial, kakaoData, resultMessage, ip_address) {
  const smsSendLog = {}; // sms send log
  (smsSendLog.SEND_TYPE = "3"),
    (smsSendLog.SMS_TYPE = "003"),
    (smsSendLog.TABLE_NAME = tableName),
    (smsSendLog.FK_SERIAL = serial),
    (smsSendLog.RECEIVE_TYPE = "1"),
    (smsSendLog.SENDER = kakaoData.resendCallback),
    (smsSendLog.RECEIVER = resultMessage.receiver),
    (smsSendLog.MESSAGE = kakaoData.contents),
    (smsSendLog.SEND_RESULT = resultMessage.code),
    (smsSendLog.SEND_URL = resultMessage.smsUrl),
    (smsSendLog.SEND_DATA = resultMessage.send_data),
    (smsSendLog.RECEIVE_DATA = resultMessage.receive_data),
    (smsSendLog.USER_KEY = resultMessage.user_key),
    (smsSendLog.REGIST_IP = ip_address),
    (smsSendLog.REGIST_USER_ID = "system");
  return smsSendLog;
}

export function setReservDataFormat(event_serial, reservId, session_serial, reserv_list, ip_address) {
  const setReservationOrder = {};
  setReservationOrder.COMMON_EVENT_SERIAL = event_serial;
  setReservationOrder.COMMON_RESERVATION_SERIAL = Number(reservId.split("_")[3]);
  setReservationOrder.COMMON_CUSTOMER_SERIAL = session_serial;
  setReservationOrder.RESERVATION_TYPE = reserv_list.RESERVATION_TYPE;
  setReservationOrder.RESERVATION_DATE = reserv_list.RESERVATION_DATE;
  setReservationOrder.RESERVATION_HOUR = reserv_list.RESERVATION_HOUR;
  setReservationOrder.RESERVATION_MINUTE = reserv_list.RESERVATION_MINUTE;
  setReservationOrder.MEMO = "";
  setReservationOrder.AGREEMENT1_BIT = "Y";
  setReservationOrder.AGREEMENT2_BIT = "Y";
  setReservationOrder.REGIST_IP = ip_address;
  return setReservationOrder;
}
