// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../../lib/prisma.js";
// 암호화 데이터
import { aes256DecodeApi } from "../../../../common/lib";

export default async function handler(req, res) {
  let result_code, order_no, origin_order_no, result_message, decord_order_no, reserve_state;
  const reservResultData = {};
  if (req.method === "POST") {
    console.log("======================= path : api/reserv/history/detail =======================");
    try {
      // 기존에는 암호화 된 예약번호로 날라온다. 디코딩해야함
      origin_order_no = req.body.send_order_no;

      // [복호화 디코드 api 함수]
      const getDecodeData = await aes256DecodeApi(origin_order_no);

      // 복호화 처리결과에 따른 예약번호 리턴
      order_no = getDecodeData;
      // 디코딩된 예약번호
      // 복호화된 주문번호로 예약 내역 검색
      if (order_no) {
        console.log("[LOG_SW][Request order_no] ", order_no);
        // [ 예약 정보 조회 ]
        order_no = order_no;
        const reservList = await getDataOrderNo(order_no);

        // [ 조회된 예약 정보 데이터 파싱 및 QR코드 생성]
        if (Array.isArray(reservList) && reservList.length > 0) {
          // 이전 예약 내역 있을시
          if (reservList.length === 1) {
            // 예약 상태 유형 체크 ( 예약 )
            if (reservList[0].STATE_TYPE === "00" || reservList[0].STATE_TYPE === "30") {
              result_code = "OK";
              result_message = "시승 예약이 조회 되었습니다.";
              reserve_state = true;
              reservResultData.serialNumber = reservList[0].SERIAL_NUMBER;
              reservResultData.orderNum = reservList[0].ORDER_NO;
              reservResultData.userName = reservList[0].USER_NAME;
              reservResultData.userTelno = reservList[0].TEL_NO;
              reservResultData.orderDate = `${reservList[0].RESERVATION_DATE} (${reservList[0].RESERVATION_HOUR}:${reservList[0].RESERVATION_MINUTE})`;
              reservResultData.state_type = reservList[0].STATE_TYPE;
              if (reservList[0].STATE_TYPE === "30") {
                result_code = "30";
              }
            }
            // 예약 취소 건
            else if (reservList[0].STATE_TYPE === "10") {
              result_code = "NO";
              result_message = "시승 예약 [접수 취소]된 건입니다.";
              reserve_state = true;
              reservResultData.serialNumber = reservList[0].SERIAL_NUMBER;
              reservResultData.orderNum = reservList[0].ORDER_NO;
            }
          }
          //
          else {
            result_code = "NO";
            reserve_state = false;
            result_message = "잘못된 요청입니다. 유효한 URL을 입력해 주세요.";
          }
        }
        //
        else {
          result_code = "NO";
          result_message = "잘못된 요청입니다. 유효한 URL을 입력해 주세요.";
        }
      }
      //
      else {
        result_code = "NO";
        result_message = "잘못된 요청입니다. 유효한 URL을 입력해 주세요.";
      }
      // console.log(`[LOG_SW][result] 예약번호 암호화 : ${origin_order_no}`);
      // console.log(`[LOG_SW][result] 예약 시리얼넘버 : ${reservResultData.serialNumber} 예약번호 : ${reservResultData.orderNum}`);
      // console.log(`[LOG_SW][result] 예약자명 : ${reservResultData.userName} 예약일시 : ${reservResultData.orderDate}`);
      // console.log(`[LOG_SW][result] 결과메세지 : ${result_message}`);
      console.log("==================================================================\n");
      return res.status(200).json({ ok: true, code: result_code, message: result_message, reserve_null: reserve_state, reservResultData });
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
 * 기존 예약 주문 정보가 있는지 확인하기 위한 함수
 * @param {*} order_no
 * @returns
 */
async function getDataOrderNo(order_no) {
  const ORDER_NO = order_no;
  // params ::
  // order_no
  const reservData = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_ORDER_Get_OrderNo] ${ORDER_NO},null, null;`;
  // console.log("[LOG_SW]Check getDataOrderNo] ", reservData);
  return reservData;
}
