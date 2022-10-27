// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "../../../../lib/get-session";
import prisma from "../../../../lib/prisma.js";
import { hasCookie } from "cookies-next";
import { aes256EncodeApi } from "../../../../common/lib";

export default async function handler(req, res) {
  // 결과 리턴변수
  const getOrderData = {};
  (getOrderData.result_code = ""), (getOrderData.result_message = ""), (getOrderData.result_order_no = "");
  // 예약 내역 확인 완료 비트
  let result_bit = false;
  if (req.method === "POST") {
    // [ 회원 로그인 확인 ]
    // 쿠키확인
    const isAdmin = hasCookie("DIFA2022", { req, res });
    // [세션 확인]
    const session = await getSession(req, res);
    const getUserName = session.Admin_UserName;
    const getTelNo = session.Admin_TelNo;
    try {
      // [회원 로그인 확인 출력]
      console.log("path : api/reserv/history/orderNo");

      console.log("[LOG_SW][Client Login] 사용자 인증 완료", getUserName);
      console.log("[LOG_SW][Client Login] 사용자 Result", getTelNo);
      if (isAdmin) {
        // 세션이 없을때, 이름, telno 없을때
        if (getUserName !== undefined && getTelNo !== undefined) {
          // 예약 이력 조회
          const getDataCheckList = await getDataCheck(process.env.EVENT_SERIAL, getUserName, getTelNo);
          // 시승 예약 정보가 없을때
          if (!(Array.isArray(getDataCheckList) && getDataCheckList.length === 0)) {
            // console.log("[LOG_SW][Client Login] COMMON_RESERVATION_ORDER_Get_List_Check SERIAL_NUMBER", getDataCheckList);
            console.log("[LOG_SW][Client Login] COMMON_RESERVATION_ORDER_Get_List_Check SERIAL_NUMBER", getDataCheckList[0].SERIAL_NUMBER);
            if (getDataCheckList?.length) {
              console.log("dddddd");
              const getOrderNum = getDataCheckList[0].ORDER_NO.trim();
              console.log("예약번호", getOrderNum);
              // aes256 모듈로 암호화
              // console.log("예약번호1234", await aes256EncodeApi(getOrderNum));
              getOrderData.result_order_no = await aes256EncodeApi(getOrderNum);

              console.log("예약번호12333", getOrderData.result_order_no);
              result_bit = true;
            } else {
              result_bit = false;
              getOrderData.result_order_no = null;
            }
          }
        } else {
          (getOrderData.result_code = "NO"), (getOrderData.result_message = "시승예약 정보를 불러올 수 없습니다.");
        }

        if (result_bit) {
          (getOrderData.result_code = "OK"), (getOrderData.result_message = "조회되었습니다.");
        } else {
          (getOrderData.result_code = "NO"), (getOrderData.result_message = "시승예약 정보를 불러올 수 없습니다.");
        }
      } else {
        (getOrderData.result_code = "No Login"), (getOrderData.result_message = "사용자 인증 후 시승예약이 가능합니다.");
      }
      console.log("[LOG_SW][Client Login] 사용자 정보 조회", getOrderData.result_code, getOrderData.result_message, getOrderData.result_order_no);
      return res.status(200).json(getOrderData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

// [이전 예약 정보 조회][COMMON_RESERVATION_ORDER_Get_List_Check]
/**
 *
 * @param {*} userName
 * @param {*} telNo
 * @returns
 */
async function getDataCheck(eventSerial, userName, telNo) {
  const USER_NAME = userName,
    TEL_NO = telNo,
    COMMON_EVENT_SERIAL = eventSerial;
  // params ::
  // event_serial, reserv_serial, customer_serial, reservation_type, from_date, to_date, reserv_hour, reserv_min, use_bit, sort_bit, user_name, tel_no, order_no, row_size, current_page, result_code, result_message, total_record
  // 1, 0, 0, null, null, null, null, null, "Y", null, userName, telno, null, 99999, 1
  const reservData = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_ORDER_Get_List_Check]  ${COMMON_EVENT_SERIAL}, 0, 0, null,null,null,null,null,null,"1",${USER_NAME},${TEL_NO},null,99999,1, null, null,0;`;
  // console.log("[LOG_SW]Check reservData] ", reservData);
  return reservData;
}
