// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 사용자 인증 확인
/*  위    치 : /api/login/check.js
/*******************************************************************************************/

import prisma from "../../../lib/prisma.js";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import { getSession } from "../../../lib/get-session.js";
import { hasCookie, getCookie } from "cookies-next";
// import { ScrollRestoration } from "react-router-dom";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("\n");
    console.log("======================= path : api/login/auth =========================");
    console.log("================================= req.body ======================================");
    console.log(req.body);

    const sendData = {};
    try {
      // 쿠키와 세션이 있으면 사용자 인증을 함.
      let result = req.body.user_login;
      sendData.result = result;
      // console.log("***** login Check *****");
      let cookieList, getUserUUID, getUserSerial;

      // [쿠키 확인]
      const cookieState = hasCookie("DIFA2022", { req, res });

      // 해당쿠키가 있는지 확인
      // console.log("cookieState : ", cookieState);
      if (cookieState) {
        // 쿠키값 가져오기
        const getCookieData = getCookie("DIFA2022", { req, res });
        // console.log("cookie data : ", getCookieData);
        // console.log("cookieList data : ", cookieList);
        // 쿠키값 분할
        if (getCookieData == undefined) {
          sendData.cookie_result = false;
        } else {
          cookieList = getCookieData.split("&");
          // 토큰 값 생성
          getUserUUID = cookieList[0].split("=")[1];
          // 시리얼값 생성
          getUserSerial = Number(cookieList[1].split("=")[1]);
        }
      }
      sendData.cookie_result = cookieState;

      //쿠키가 있음.
      if (getUserUUID) {
        console.log("cookie check :: ", getUserUUID);
        // 토큰값으로 고객정보 조회
        const getUserToken = await getUserLoginToken(getUserUUID);
        // 토큰으로 고객이 있으면
        if (getUserToken) {
          // 쿠키 인증 완료
          sendData.result = true;
          // [이전 예약 정보 조회]
          const orderCheck = await getDataCheck(getUserToken);
          // console.log("예약 고객 정보", getUserToken);
          // console.log(`예약한고객정보 이름:${getUserToken.USER_NAME} 번호:${getUserToken.TEL_NO}`);
          // console.log("예약 내역 조회: ", orderCheck[0]);
          // 세션 값 정의
          // 이전예약 내역 체크
          if (Array.isArray(orderCheck) && orderCheck.length === 0) {
            sendData.order_check = false;
            sendData.order_no = null;
          }
          // 이전 예약 있음.
          else {
            sendData.order_check = true;
            sendData.order_no = orderCheck[0].ORDER_NO;
            // [회원정보 세션 생성]
            const session = await getSession(req, res);
            session.Admin_UserSerial = getUserToken.SERIAL_NUMBER;
            session.Admin_CommEventSerial = getUserToken.COMMON_EVENT_SERIAL;
            session.Admin_UserId = getUserToken.USER_ID;
            session.Admin_UserType = getUserToken.USER_TYPE;
            session.Admin_UserName = getUserToken.USER_NAME;
            session.Admin_UserEmail = getUserToken.EMAIL;
            session.Admin_TelNo = getUserToken.TEL_NO;
            session.Admin_Memo = getUserToken.MEMO;
            session.Admin_Regist_Ip = getUserToken.REGIST_IP;
            session.Admin_OrderNo = orderCheck[0].ORDER_NO;
            session.commit();
            // console.log("세션 auth", session);
          }
        } else {
          sendData.result = false;
          sendData.order_check = false;
        }
      }
      // 쿠키가 없음.
      else {
        sendData.result = false;
      }
      console.log("사용자 인증 결과: ", sendData);
      console.log("=================================================================================");
      console.log("\n");
      return res.status(200).json(sendData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

/**
 * [getUserLoginToken] 고객 정보 테이블에 해당 레코드를 객체로 반환합니다.
 * @param {string} token 로그인 토큰을 입력하여 고객정보를 조회.
 * @returns 입력된 token이 일치한 고객 정보를 object 타입으로 출력
 */
async function getUserLoginToken(token) {
  const ACCESS_TOKEN = token;
  const data = await prisma.$queryRaw`exec [dbo].[COMMON_CUSTOMER_Get_Access_Token] ${ACCESS_TOKEN}, null, null;`;
  return data[0];
}

// [이전 예약 정보 조회]
/**
 * COMMON_RESERVATION_ORDER_Get_List_Check
 * * @param {*} event_serial
 * @param {*} userName
 * @param {*} telNo
 * @returns
 */
async function getDataCheck(param) {
  const COMMON_EVENT_SERIAL = param.COMMON_EVENT_SERIAL,
    USER_NAME = param.USER_NAME,
    TEL_NO = param.TEL_NO;
  // params ::
  // event_serial, reserv_serial, customer_serial, reservation_type, from_date, to_date, reserv_hour, reserv_min, use_bit, sort_bit, user_name, tel_no, order_no, row_size, current_page, result_code, result_message, total_record
  // 1, 0, 0, null, null, null, null, null, "Y", null, userName, telno, null, 99999, 1
  const reservData =
    await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_ORDER_Get_List_Check]  ${COMMON_EVENT_SERIAL}, 0, 0, null,null,null,null,null,"Y",null,${USER_NAME},${TEL_NO},null,99999,1, null, null,0;`;
  // console.log("[LOG_SW]Check reservData] ", reservData);
  return reservData;
}
