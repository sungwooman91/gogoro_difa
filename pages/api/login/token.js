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
import { setCookie } from "cookies-next";
import { getSession } from "../../../lib/get-session";
export default async function handler(req, res) {
  if (req.method === "POST") {
    let result = {};
    let getdata = {};
    console.log("\n");
    console.log("======================= path : api/login/token =========================");
    console.log("================================= req.body ======================================");
    console.log(req.body);

    try {
      getdata = req.body;
      // console.log("[LOG_SW][get req.body] :::", getdata);

      // test variant
      // gogoroAPI
      const api_address = "http://rentapi.gobikebank.com/v1/login/regist/";
      // const api_address = "http://localhost:3000/v1/login/regist";
      // axios
      await axios
        .post(api_address, {
          user_name: getdata.user_name,
          user_phone: getdata.user_phone,
          auth_number: getdata.auth_number,
        })
        .then((res) => {
          console.log("[LOG_SW] response status : ", res.status);
          if (res.status === 200) {
            // console.log("[LOG_SW] response data : ", res.data);
            result = res.data;
            return result;
          } else if (res.status === 500) {
            // console.log("[LOG_SW] response data : ", res.data);
            result = res.data;
            return result;
          }
        })
        .catch((error) => {
          console.log("[LOG_SW][ERROR] ", error);
        });

      // console.log("[LOG_SW] get from api data : ", result);
      // 잘못된 로그인 코드 예외 처리
      if (result.code === "99") {
        return res.json(result);
      }
      // [로그인 인증 쿠키 생성]
      const cookieOptions = { req, res, maxAge: 60 * 60 * 6 };
      const cookieValue = result.cookieValue;
      setCookie("DIFA2022", cookieValue, cookieOptions);
      // 조회된 고객정보가 있으면 세션생성
      if (result.code !== "NO" || result.data !== undefined) {
        // [회원정보 세션 생성]
        const getCustomerData = result.data;
        const session = await getSession(req, res);
        session.Admin_UserSerial = getCustomerData.SERIAL_NUMBER;
        session.Admin_CommEventSerial = getCustomerData.COMMON_EVENT_SERIAL;
        session.Admin_UserId = getCustomerData.USER_ID;
        session.Admin_UserType = getCustomerData.USER_TYPE;
        session.Admin_UserName = getCustomerData.USER_NAME;
        session.Admin_UserEmail = getCustomerData.EMAIL;
        session.Admin_TelNo = getCustomerData.TEL_NO;
        session.Admin_Memo = getCustomerData.MEMO;
        session.Admin_OrderNo = getCustomerData.ORDER_NO;
        session.commit();
        // [이전 예약 정보 조회]
        // console.log("세션 예약완료", session);
      }
      console.log("Result DATA", result);
      console.log("=================================================================================");
      console.log("\n");

      return res.json(result);
    } catch (err) {
      console.error("[LOG_SW_ERROR] ", err);
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
