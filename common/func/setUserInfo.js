// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 사용자 정보(이름, 휴대전화번호, 입력한 로그인 코드) 등록
/*  위    치 : /api/login/setUserInfo.js
/*******************************************************************************************/

import { setCookie, hasCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";
import { customerInfoCurrentState } from "../../../lib/component/reservData";
import { getSession } from "../../../lib/get-session";
import { getUserList } from "./getAuthNum";
import prisma from "../../../lib/prisma.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // [ 처리결과를 위한 변수 설정 ]
    let resultCode = "",
      resultMessage = "";
    let resultOrderNo = 0;
    /** 대구 미래모빌리티 엑스포 이벤트 시리얼넘버 : 2 */
    const eventSerialNum = 2;
    try {
      /** 고객 정보 객체 생성 */
      console.log("path :  api/login/setUserInfo");
      let customerInfoList = customerInfoCurrentState,
        customerTelNoList = customerInfoCurrentState,
        customerUserList = customerInfoCurrentState;

      /** post request params 객체화 */
      customerInfoList.USER_NAME = req.body.user_name;
      customerInfoList.TEL_NO = req.body.user_phone;
      customerInfoList.LOGIN_CODE = req.body.auth_number;

      /** 고객 정보 DB 조회 */
      // 사용자 이름, 휴대전화번호로 조회
      const getUserData = await getUserList(customerInfoList.USER_NAME, customerInfoList.TEL_NO, eventSerialNum);
      // 휴대전화번호 로만 조회
      const getTelNoData = await getUserList(null, customerInfoList.TEL_NO, eventSerialNum);

      /** 고객 정보 DB 조회 */
      // [해당 '연락처'로 인증받은 고객 여부 조회]
      let userConfirmSerail = 0;
      if (getTelNoData.length > 0) {
        // 연락처로 인증 받은 고객 검색
        for (let index = 0; index < getTelNoData.length; index++) {
          // 입력받은 이름과 등록된 사용자 이름 확인
          if (req.body.user_name === getTelNoData[index].USER_NAME) {
            customerTelNoList = getTelNoData[index];
          }
          // [USER_CONFIRM_BIT] 비교
          if (customerTelNoList.USER_CONFIRM_BIT === "Y") {
            userConfirmSerail = customerTelNoList.SERIAL_NUMBER;
            console.log("[LOG_SW][setUserInfo] userConfirmSerail", userConfirmSerail);
            break;
          }
          console.log("[LOG_SW][PASS] ");
        }
      }
      // [ 고객 정보 조회 ]
      customerUserList = getUserData[0];

      // [인증번호 확인]
      if (customerUserList.SERIAL_NUMBER !== 0) {
        // [해당 '연락처'로 인증받은 고객이 없을 경우]
        if (userConfirmSerail === 0) {
          userConfirmSerail = customerUserList.SERIAL_NUMBER;
        }
        console.log("[LOG_SW][조회된 고객 userConfirmSerail] ", userConfirmSerail);
        // [고객 인증번호 확인]
        if (customerUserList.SERIAL_NUMBER === userConfirmSerail) {
          console.log("[LOG_SW][조회된 고객 customerUserList.SERIAL_NUMBER] ", customerUserList.SERIAL_NUMBER);
          if (customerInfoList.LOGIN_CODE.trim() !== null) {
            if (customerInfoList.LOGIN_CODE.trim().length === 4) {
              console.log("[LOG_SW][Before Insert 시리얼넘버] ", customerInfoList.SERIAL_NUMBER);
              console.log("[LOG_SW][입력받은 인증코드] ", customerInfoList.LOGIN_CODE);
              // [고객 고유번호+인증문자로 로그인]

              // 테스트 하기 위해서 로그인 코드를 새로 갱신해야함.
              customerInfoList = await customerLogin(eventSerialNum, customerUserList.SERIAL_NUMBER, customerInfoList.LOGIN_CODE);
              console.log("[LOG_SW][After Insert 시리얼넘버] ", customerInfoList.SERIAL_NUMBER);
              if (customerInfoList.SERIAL_NUMBER !== 0) {
                // [ 로그인 인증키 생성 ]
                const getUUID = uuidv4().toUpperCase();
                // [로그인 인증 쿠키 생성]
                const cookieOptions = { req, res, maxAge: 60 * 60 * 24 };
                const cookieValue = "UserLoginGUID=" + getUUID + "&UserLoginSerial=" + customerInfoList.SERIAL_NUMBER;
                setCookie("BIMOS2022", cookieValue, cookieOptions);
                // console.log("[LOG_SW][쿠키 체크] ", hasCookie("BIMOS2022", { req, res }));
                console.log("[LOG_SW][쿠키 입력 데이터 확인] ", cookieValue);

                // [회원정보 세션 생성]
                const session = await getSession(req, res);
                // console.log("[LOG_SW][세션 생성1] ", session, session.Admin_UserSerial);
                session.Admin_UserSerial = customerInfoList.SERIAL_NUMBER;
                session.Admin_CommEventSerial = customerInfoList.COMMON_EVENT_SERIAL;
                session.Admin_UserId = customerInfoList.USER_ID;
                session.Admin_UserType = customerInfoList.USER_TYPE;
                session.Admin_UserName = customerInfoList.USER_NAME;
                session.Admin_UserEmail = customerInfoList.EMAIL;
                session.Admin_TelNo = customerInfoList.TEL_NO;
                session.Admin_Memo = customerInfoList.MEMO;
                // console.log("[LOG_SW][세션 생성2] ", session, session.Admin_UserSerial);

                // [회원 정보 인증키 갱신]
                setAccessTokenUpdate(customerInfoList.SERIAL_NUMBER, getUUID);
              }

              // [시승예약 정보 등록 여부 확인]
              if (customerInfoList.SERIAL_NUMBER !== 0 && customerInfoList.ORDER_NO !== null) {
                // 예약번호 복호화
              }

              // [처리결과 설정]
              if (customerInfoList.SERIAL_NUMBER !== 0) {
                if (!customerInfoList.ORDER_NO) {
                  resultCode = "OK";
                  resultMessage = "인증 되었습니다.";
                } else {
                  resultCode = "88";
                  resultMessage = "해당 연락처는 이미 예약한 내역이 있습니다.";
                  resultOrderNo = customerInfoList.ORDER_NO;
                }
              } else {
                resultCode = "NO";
                resultMessage = "입력하신 인증번호가 일치하지 않습니다.";
              }
            } else {
              resultCode = "NO";
              resultMessage = "인증번호 4자리를 입력해주세요.";
            }
          } else {
            if (customerInfoList.LOGIN_CODE.trim() === null) {
              resultCode = "NO";
              resultMessage = "인증번호를 입력해주세요";
            }
          }
        } else {
          resultCode = "NO";
          resultMessage = "해당 연락처로 인증된 회원 정보가 이미 존재합니다.";
        }
      } else {
        resultCode = "NO";
        resultMessage = "이름과 연락처 정보가 일치하지 않습니다.";
      }
      console.log(`[LOG_SW][처리결과] CODE : ${resultCode} msg : ${resultMessage} OrderNum : ${resultOrderNo}`);
      return res.status(200).json({ ok: true, code: resultCode, message: resultMessage, order_no: resultOrderNo });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

// [ 고객 정보 조회 ]
/**
 * 고객 정보 조회 함수
 * @param {*} userid 고객 user_id
 * @param {*} username 고객 이름
 * @param {*} telno 고객 휴대전화번호
 * @returns
 */
async function getData(userid, username, telno) {
  const USER_ID = userid,
    USER_NAME = username,
    TEL_NO = telno;
  const data = await prisma.$queryRaw`exec [dbo].[COMMON_CUSTOMER_Get_List] 1, ${USER_ID}, ${USER_NAME}, ${TEL_NO}, "Y", "5", 99999, 1, null, null, 0;`;
  return data;
}

// [ 인증코드 로그인 확인]
/**
 * 고객이 입력한 인증코드와 해당 고객의 시리얼 넘버를 입력해 로그인 검증을 진행하는 함수
 * @param {*} eventSerial 예약 행사에 따른 시리얼 넘버 ex) 부산국제모터쇼 시승행사는 1번
 * @param {*} serialNum 로그인 시도 중인 고객의 시리얼 넘버
 * @param {*} loginCode 고객이 입력한 인증코드 4자리
 * @returns db 조회 시, 일치하는 데이터가 있으면 배열로 출력
 * 그렇지 않으면 결과값의 SERIAL_NUMBER를 0으로 출력
 */
async function customerLogin(eventSerial, serialNum, loginCode) {
  const COMMON_EVENT_SERIAL = eventSerial,
    SERIAL_NUMBER = serialNum,
    LOGIN_CODE = loginCode;
  const data = await prisma.$queryRaw`exec [dbo].[COMMON_CUSTOMER_Get_Customer_Login]  ${COMMON_EVENT_SERIAL}, ${SERIAL_NUMBER}, ${LOGIN_CODE}, null, null;`;
  console.log(`[LOG_SW][setUserInfo_LOGIN_CODE][데이터 체크] ${data.length}개`);
  if (data.length > 0) {
    // 리스트에 하나의 객체만 담기기 때문에 리스트의 요소 하나를 리턴한다.
    return data[0];
  } else {
    const data = { SERIAL_NUMBER: 0 };
    return data;
  }
}

/**
 * 고객의 인증코드가 검증되고 생성된 Access Token을 db에 저장하는 함수
 * @param {*} serialNum 인증코드가 검증된 고객 정보의 시리얼 넘버
 * @param {*} token 생성된 Access Token 입력
 * @returns prisma ORM은 executeRaw 성공시 무작위 int 값을 출력
 */
async function setAccessTokenUpdate(serialNum, token) {
  const SERIAL_NUMBER = serialNum,
    ACCESS_TOKEN = token;
  console.log("[LOG_SW][CUSTOMER SERAIL DATA]", SERIAL_NUMBER);
  console.log("[LOG_SW][CUSTOMER TOKEN DATA]", ACCESS_TOKEN);
  let data = await prisma.$executeRaw`exec [dbo].[COMMON_CUSTOMER_Set_Access_Token]  ${SERIAL_NUMBER}, ${ACCESS_TOKEN}, null, null;`;

  return data;
}

export const config = {
  api: {
    externalResolver: true,
  },
};
