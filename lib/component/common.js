import prisma from "../prisma.js";

// 랜덤키 생성 함수
export function getUserKey() {
  const date = new Date();
  let year = String(date.getFullYear()).substring(2, 4);
  // let getYear = year.slice(-2);
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  const random = GetRandomText(6);
  return year + month + day + random;
}

// 영대소문자+숫자 난수 생성 함수
export function GetRandomText(number) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < number; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

// 일자 구하기
export function getToDate() {
  var date = new Date();
  var day = ("0" + date.getDate()).slice(-2);
  return day;
}

// 요일구하는 함수
export function getDate(날짜문자열) {
  //날짜문자열 형식은 자유로운 편
  var week = ["일", "월", "화", "수", "목", "금", "토"];
  var dayOfWeek = week[new Date(날짜문자열).getDay()];
  return dayOfWeek;
}

// Data Log 저장 함수
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
 * db에 저장된 데이터 로그 기록을 조회하는 함수
 * @param {*} commonDataLog 조회할 테이블명, FK 시리얼넘버를 포함한 object타입의 변수 입력
 * @returns 조회된 로그 기록을 배열로 출력
 */
export async function getDataLog(commonDataLog) {
  const TABLE_NAME = commonDataLog.TABLE_NAME,
    FK_SERIAL = commonDataLog.FK_SERIAL;

  const dataLog = await prisma.$queryRaw`exec [dbo].[COMMON_DATA_LOG_Get_List] ${TABLE_NAME}, ${FK_SERIAL}, null, null, 0;`;
  return dataLog;
}

// SMS 전송 :: COMMON_SMS_SEND_LOG_Set_Insert
/**
 * SMS 전송 기록을 db에 저장하는 함수
 * @param {*} smsLog object 타입의 데이터셋 변수, 저장할 로그 데이터 입력
 */
export async function sendSmsLogData(smsLog) {
  const SEND_TYPE = smsLog.SEND_TYPE,
    SMS_TYPE = smsLog.SMS_TYPE,
    TABLE_NAME = smsLog.TABLE_NAME,
    FK_SERIAL = smsLog.FK_SERIAL,
    RECEIVE_TYPE = smsLog.RECEIVE_TYPE,
    SENDER = smsLog.SENDER,
    RECEIVER = smsLog.RECEIVER,
    MESSAGE = smsLog.MESSAGE,
    SEND_RESULT = smsLog.SEND_RESULT,
    SEND_URL = smsLog.SEND_URL,
    SEND_DATA = smsLog.SEND_DATA,
    RECEIVE_DATA = smsLog.RECEIVE_DATA,
    USER_KEY = smsLog.USER_KEY,
    REGIST_IP = smsLog.REGIST_IP,
    REGIST_USER_ID = smsLog.REGIST_USER_ID;
  // DB Insert
  await prisma.$executeRaw`exec [dbo].[COMMON_SMS_SEND_LOG_Set_Insert] ${SEND_TYPE}, ${SMS_TYPE}, ${TABLE_NAME}, ${FK_SERIAL}, ${RECEIVE_TYPE}, ${SENDER}, ${RECEIVER}, ${MESSAGE}, ${SEND_RESULT}, ${SEND_URL}, ${SEND_DATA}, ${RECEIVE_DATA}, ${USER_KEY}, ${REGIST_IP}, ${REGIST_USER_ID}, null, null, 0;`;
}
