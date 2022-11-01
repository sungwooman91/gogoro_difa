// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 사용자 정보(이름, 휴대전화번호) 조회 및 로그인 인증번호 발급
/*  위    치 : /api/login/getAuthNum.js
/*******************************************************************************************/

import axios from "axios";
import prisma from "../../../lib/prisma.js";
import requestIp from "request-ip";
import { commonDataLog, customerInfoCurrentState, getCustomerData } from "../../../lib/component/reservData.js";

const smsSendLog = {}; // sms send log
const createSmsData = {}; // axios 전송 prams
const eventSerialNum = 2;
const alert = {};
// sms 전송 결과값 초기화
let sms_result_code = "";
let sms_result_message = "";

export default async function handler(req, res) {
  const tableName = "COMMON_CUSTOMER";
  if (req.method === "POST") {
    // 클라이언트 POST body params
    let getUserState = customerInfoCurrentState;
    getUserState.USER_NAME = req.body.name;
    getUserState.TEL_NO = req.body.phone_number;
    let userMessageSendable = req.body.sms_send_bit;
    // 클라이언트 IP 주소 get
    const registIP = requestIp.getClientIp(req);
    // 클라이언트 페이지로 전달할 디스플레이 상태값
    let sendSmsResult;
    let displayStatus = false;
    try {
      // [수신 데이터 체크]
      // console.log("[LOG_SW][customerInfoCurrentState start value] ", customerInfoCurrentState);
      /** 고객 정보 등록 여부 확인 DB 조회 */
      /** COMMON_CUSTOMER_Get_List 고객정보 조회한 결과를 getCustomerList 변수에 할당 */
      const getCustomerList = await getUserList(getUserState.USER_NAME, getUserState.TEL_NO, eventSerialNum);
      /** 조회된 고객 정보 customerInfoCurrentState 객체로 전달 */
      if (getCustomerList.length > 0) {
        /** 고객정보 객체 생성 */
        getUserState = getCustomerData(getCustomerList[0]);
        // console.log("[LOG_SW][getUserState(COMMON_CUSTOMER_Get_List) SERIAL_NUMBER] ", getUserState.SERIAL_NUMBER);
        // [ 처리 결과 로그]
      } else {
        /** [ 고객 정보 등록 ] 고객정보 customerInfoCurrentState 객체에 기본 데이터 생성 */
        console.log("[LOG_SW][customerInfoCurrentState value] ", getUserState.SERIAL_NUMBER);
        getUserState.COMMON_EVENT_SERIAL = process.env.EVENT_SERIAL;
        getUserState.REGIST_IP = registIP;
        getUserState.USE_BIT = "Y";
        getUserState.USER_TYPE = "5";
        // [ 고객 정보 등록 함수 ]
        setUserInfo(getUserState);
        const getSerialNum = getCustomerSerialNum(getUserState.USER_NAME, getUserState.TEL_NO, process.env.EVENT_SERIAL);
        getUserState.SERIAL_NUMBER = getSerialNum;
        console.log("[LOG_SW] 신규 고객 정보 등록 : ", getUserState.SERIAL_NUMBER);

        /** 데이터 로그 생성 */
        if (getUserState.SERIAL_NUMBER > 0) {
          commonDataLog.FK_SERIAL = getUserState.SERIAL_NUMBER;
          commonDataLog.TABLE_NAME = tableName;
          // 데이터 로그 저장
          setDataLog(commonDataLog);
        }
      }

      let authLoginNum;
      // [ 인증번호 발송 ]
      if (userMessageSendable) {
        alert.sms_result_code = "OK";
        alert.sms_result_message = "인증번호가 발송되었습니다.";
        // 고객 휴대 전화 번호 = customerInfoCurrentState.TEL_NO;
        displayStatus = true;
        createSmsData.authNumber = GetRandomDigit(4);
        // 인증번호 로그인 코드 저장
        console.log("[LOG_SW] [인증코드 저장 시리얼넘버] : ", getUserState.SERIAL_NUMBER);
        console.log("[LOG_SW] [인증코드] : ", createSmsData.authNumber);
        updateLoginCode(getUserState.SERIAL_NUMBER, createSmsData.authNumber);

        /**
         * 인증번호 전송 함수
         * sendSmsResult = await setSmsMessage(getUserState); // 와이드샷 API 사용 함수
         * sendSmsResult = exceptSmsMessage(getUserState); // 실제문자전송X 로그만 출력 함수
         */
        sendSmsResult = await SendSMSApiRequest(getUserState, createSmsData.authNumber);
        console.log(sendSmsResult);
      } else {
        alert.sms_result_code = "NO";
        alert.sms_result_message = "인증번호가 정상적으로 발송되지 않았습니다.";
      }

      return res.json({
        ok: true,
        result_code: alert.sms_result_code,
        message: alert.sms_result_message,
        sms_result: sendSmsResult,
        user: getUserState.USER_NAME,
        user_phone: getUserState.TEL_NO,
        login_code: createSmsData.authNumber,
        display_add_button: displayStatus,
      });
    } catch (err) {
      console.error("[LOG_SW_ERROR] ", err);
      return res.status(500).json({ msg: "Something went wrong", error: err });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

/**
 * 이름, 휴대전화번호로 일치하는 고객 정보 조회하는 함수
 * @param {*} username 고객 이름 입력
 * @param {*} telno 고객 전화 번호 임력
 * @returns 조회된 고객이 없을때 null, 있으면 object 형태로 고객 정보 출력.
 */
export async function getUserList(username, telno, eventSerialNum) {
  let customerList = [];
  const eventSerial = eventSerialNum;
  const USER_NAME = username,
    TEL_NO = telno;
  // DB 프로시저 호출
  const data = await prisma.$queryRaw`exec [dbo].[COMMON_CUSTOMER_Get_List] ${eventSerial}, null, ${USER_NAME}, ${TEL_NO}, "Y", "5", 99999, 1, null, null, 0;`;

  if (!data) {
    return null;
  } else {
    for (let i = 0; i < data.length; i++) {
      if (username === data[i].USER_NAME && telno === data[i].TEL_NO) {
        customerList.push(data[i]);
        // console.log("[LOG_SW][getAuthNum][COMMON_CUSTOMER_Get_List pushList] :", data[i].SERIAL_NUMBER, data[i].USER_NAME, data[i].TEL_NO);
      }
    }
    // console.log("[LOG_SW][getAuthNum][COMMON_CUSTOMER_Get_List SERIAL_NUMBER] :", data);
  }
  return customerList;
}

/**
 * 고객 정보 등록 함수
 * @param {object} customerInfoCurrentState 고객 정보 객체를 입력
 * @returns
 */
async function setUserInfo(customerInfoCurrentState) {
  const COMMON_EVENT_SERIAL = customerInfoCurrentState.COMMON_EVENT_SERIAL,
    USER_ID = customerInfoCurrentState.USER_ID,
    USE_BIT = customerInfoCurrentState.USE_BIT,
    USER_TYPE = customerInfoCurrentState.USER_TYPE,
    USER_NAME = customerInfoCurrentState.USER_NAME,
    PASSWORD = customerInfoCurrentState.PASSWORD,
    EMAIL = customerInfoCurrentState.EMAIL,
    TEL_NO = customerInfoCurrentState.TEL_NO,
    MEMO = customerInfoCurrentState.MEMO,
    REGIST_IP = customerInfoCurrentState.REGIST_IP;
  // [ 고객 정보 등록 ]
  // executeRaw 함수는 DB 프로시저에서 리턴하는 output을 받지 못한다.
  const data =
    await prisma.$executeRaw`exec [dbo].[COMMON_CUSTOMER_Set_Insert] ${COMMON_EVENT_SERIAL}, ${USER_ID}, ${USE_BIT}, ${USER_TYPE}, ${USER_NAME}, ${PASSWORD}, ${EMAIL}, ${TEL_NO}, ${MEMO}, ${REGIST_IP}, null, null, 0;`;

  return data;
}

/**
 * 고객 정보 등록 후, Serial Number 데이터 받는 함수 prisma ORM에서는 DB update에 대한 결과 값을 받을수가 없어서 프로시저 결과 값을 얻기 위한 추가적인 DB 조회를 해야함.
 * @param {*} username 고객 이름 입력
 * @param {*} telno 고객 전화번호 입력
 * @returns 해당 고객의 시리얼 넘버 값 출력
 */
async function getCustomerSerialNum(username, telno, eventSerialNum) {
  const COMMON_EVENT_SERIAL = eventSerialNum,
    USER_ID = "",
    USER_NAME = username,
    TEL_NO = telno;
  // DB 프로시저 호출
  const getData = await prisma.$queryRaw`exec [dbo].[COMMON_CUSTOMER_Get_List] ${COMMON_EVENT_SERIAL}, ${USER_ID}, ${USER_NAME}, ${TEL_NO}, "Y", "5", 99999, 1, null, null, 0;`;

  console.log(getData);

  return getData[0].SERIAL_NUMBER;
}

/**
 * 고객에게 발급된 인증번호와 고객이 입력한 인증코드를 검증하기 위해 생성한 인증코드를 db에 업데이트하는 함수
 * @param {*} serial_num 해당 고객의 시리얼 넘버를 입력
 * @param {*} auth_code 랜덤으로 생성한 4자리 숫자를 인증코드로 입력
 * @returns update 성공시, 랜덤 int 값 생성
 */
async function updateLoginCode(serial_num, auth_code) {
  const SERIAL_NUMBER = serial_num,
    LOGIN_CODE = auth_code;
  const getData = await prisma.$executeRaw`exec [dbo].[COMMON_CUSTOMER_Set_Login_Code] ${SERIAL_NUMBER}, ${LOGIN_CODE}, null, null;`;
  return getData;
}

// 인증번호 전송 함수
/**
 * 세종텔레콤 와이드샷 API를 직접 사용하는 SMS 인증코드 전송 함수
 * @param {*} user object 타입의 해당 고객의 정보를 입력. 현재는 고객 번호만 사용.
 * @returns 전송 결과에 따른 코드, 메세지를 object 타입으로 반환
 */
async function setSmsMessage(user) {
  const date = new Date();
  let year = String(date.getFullYear()).substring(2, 4),
    month = ("0" + (1 + date.getMonth())).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  const resultSendMsg = {};
  createSmsData.smsUrl = "https://apimsg.wideshot.co.kr/api/v1/message/sms?";
  createSmsData.sendTel = "15229008";
  createSmsData.receiveTel = user.TEL_NO;
  createSmsData.authUserKey = year + month + day + GetRandomText(6);
  createSmsData.sendMessage = "[본인확인] 인증번호 [" + createSmsData.authNumber + "]를 입력해 주세요.\r\r바이크뱅크(주)";
  createSmsData.advertisementYn = "N";
  // 휴대전화번호 보정
  const pattern_spc = /^[0-9]{8,13}$/;
  let setRecieveTel = createSmsData.receiveTel.split("-");
  const convertTelNo = setRecieveTel[0] + setRecieveTel[1] + setRecieveTel[2];

  if (!pattern_spc.test(convertTelNo)) {
    return null;
  }
  // 세종텔레콤 SMS 전송 API 호출
  await axios
    .post(createSmsData.smsUrl, null, {
      params: {
        callback: createSmsData.sendTel,
        contents: createSmsData.sendMessage,
        receiverTelNo: convertTelNo,
        userKey: createSmsData.authUserKey,
        advertisementYn: createSmsData.advertisementYn,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers
        sejongApiKey: "NnBBdVpiaGQ4dEhNRXJUZTVLVGhmRUFuMnZMTFUxTFRIa0dXMlp3YXFNdnduckxlZVdtL1NiL0kreEowVmptSg==",
      },
    })
    .then((response) => {
      // sms 로그 객체
      if (response.status === 200) {
        // [SMS 문자 발송 LOG 정보 초기화 설정]
        (smsSendLog.SEND_TYPE = "1"),
          (smsSendLog.SMS_TYPE = "001"),
          (smsSendLog.TABLE_NAME = "COMMON_CUSTOMER"),
          (smsSendLog.FK_SERIAL = customerInfoCurrentState.SERIAL_NUMBER),
          (smsSendLog.RECEIVE_TYPE = "1"),
          (smsSendLog.SENDER = createSmsData.sendTel),
          (smsSendLog.RECEIVER = convertTelNo),
          (smsSendLog.MESSAGE = createSmsData.sendMessage),
          (smsSendLog.SEND_RESULT = response.data.code),
          (smsSendLog.SEND_URL = createSmsData.smsUrl),
          (smsSendLog.SEND_DATA = `&receiverTelNo=${convertTelNo}&title=&userKey=${createSmsData.authUserKey}&advertisementYn=N${createSmsData.advertisementYn}&callback=${createSmsData.sendTel}&contents=${createSmsData.sendMessage}`),
          (smsSendLog.RECEIVE_DATA = response.data),
          (smsSendLog.USER_KEY = createSmsData.authUserKey),
          (smsSendLog.REGIST_IP = customerInfoCurrentState.REGIST_IP),
          (smsSendLog.REGIST_USER_ID = "system");
        console.log(response.data);
        resultSendMsg.code = response.data.code;
        resultSendMsg.sendCode = response.data.sendCode;
        // [SMS 문자 발송 LOG 정보 저장]
        sendSmsLogData(smsSendLog);
        sms_result_code = "OK";
        sms_result_message = "";
      } else {
        sms_result_code = "NO";
        sms_result_message = "REST API에서 오류가 발생했습니다. 개발자에게 문의해주세요.";
        resultSendMsg.code = response.data.code;
        resultSendMsg.sendCode = response.data.sendCode;
      }
      return resultSendMsg;
    })
    .catch((error) => {
      // console.log(error);
      resultSendMsg.error = error;
      return resultSendMsg;
    });
}

// SMS 전송 :: COMMON_SMS_SEND_LOG_Set_Insert
/**
 *COMMON_SMS_SEND_LOG_Set_Insert
 * @param {*} smsLog
 */
async function sendSmsLogData(smsLog) {
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
  // console.log(smsDataLog);
}

/**
 * 인증번호 4자리 랜덤 생성 함수
 * @param {*} number 생성할 번호 자리를 int로 입력
 * @returns 4자리 문자열 인증코드 생성
 */
function GetRandomDigit(number) {
  let str = "";
  for (let i = 0; i < number; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

/**
 * 세종텔레콤 와이드샷 API의 authUserKey를 생성하기 위한 함수
 * @param {*} number 문자열 자리수 int형으로 입력
 * @returns number 자리수의 랜덤 문자열 생성
 */
function GetRandomText(number) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < number; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

/**
 * 고객 인증을 위해 인증번호를 SMS로 전송하는 내부 API를 사용한 함수
 * @param {*} user_data object 타입의 해당 고객의 정보를 입력. 현재는 고객 번호만 사용.
 * @param {*} auth_num 랜덤으로 생성된 4자리 인증코드를 입력
 * @returns API 통신 결과에 따른 결과 코드, 메세지 값 출력.
 */
async function SendSMSApiRequest(user_data, auth_num) {
  // 처리결과 변수
  const resultSendMsg = {};
  const requestURL = "http://leaseapitest.gobikebank.com/v1/sms/",
    receiveTelNo = user_data.TEL_NO,
    sendMessage = "[본인확인] 인증번호 [" + auth_num + "]를 입력해 주세요.\r\r바이크뱅크(주)";
  // 휴대전화번호 보정
  const pattern_spc = /^[0-9]{8,13}$/;
  let setRecieveTel = receiveTelNo.split("-");
  const convertTelNo = setRecieveTel[0] + setRecieveTel[1] + setRecieveTel[2];
  // 보정되지 않는 값 검사
  if (!pattern_spc.test(convertTelNo)) {
    return null;
  }
  // bikebank 내부 SMS 전송 API 호출
  await axios
    .post(requestURL, {
      hp: convertTelNo,
      message: sendMessage,
      regist_ip: user_data.REGIST_IP,
      title: "인증번호",
      sms_type: "001",
      tablename: "COMMON_CUSTOMER",
      serial: user_data.SERIAL_NUMBER,
    })
    .then((response) => {
      // sms 로그 객체
      console.log(response.data);
      if (response.status === 200) {
        if (response.data.result_code === "00") {
          resultSendMsg.api_status = response.data.result_code;
          resultSendMsg.api_result_message = response.data.result_message;
        } else {
          resultSendMsg.api_status = response.data.result_code;
          resultSendMsg.api_result_message = response.data.result_message;
        }
      }
    })
    .catch((error) => {
      console.log(error.code);
      resultSendMsg.error = error;
    });
  return resultSendMsg;
}
