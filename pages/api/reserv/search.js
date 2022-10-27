// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // [ 처리결과 설정]
    try {
      // [ GET 예약 가능한 날짜 ]
      const data = await orderGetDate("0", 1, "00", "Y");
      // 현재 month 값 설정
      const today = new Date();
      const thisMonth = ("0" + (today.getMonth() + 1)).slice(-2) + "월";
      return res.status(200).json({ ok: true, month: thisMonth, days: data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

// [ 예약 정보 조회 ]
/**
 * 현재 예약 날짜를 반환한다.
 * @param {*} order_bit
 * @param {*} event_serial
 * @param {*} reservation_type
 * @param {*} use_bit
 * @returns
 */
async function orderGetDate(order_bit, event_serial, reservation_type, use_bit) {
  const ORDER_BIT = order_bit,
    COMMON_EVENT_SERIAL = event_serial,
    RESERVATION_TYPE = reservation_type,
    USE_BIT = use_bit;

  const reservData = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_Get_Date] ${ORDER_BIT}, ${COMMON_EVENT_SERIAL}, ${RESERVATION_TYPE}, ${USE_BIT}, null, null;`;
  //   const reservData = [1, 1, 1, 1, 1, 1, 0];
  if (reservData.length === 0 && Array.isArray(reservData)) {
    // 빈배열 체크
    return false;
  } else {
    if (reservData.length > 0) {
      let getReservDate = [];
      // 현재 month 값 설정
      const today = new Date();
      const thisMonth = ("0" + (today.getMonth() + 1)).slice(-2);
      // 현재 month에 신청가능한 날짜 sort
      for (let index = 0; index < reservData.length; index++) {
        const reservDate = reservData[index].RESERVATION_DATE.split("-");
        // reservDate 결과값 = [ '2022', '08', '17' ]
        if (thisMonth === reservDate[1]) {
          const strDate = reservDate.join("");
          const getWeekDate = getDateStr(strDate);
          getReservDate.push(reservDate[2] + "일" + getWeekDate);
        }
        // console.log("[LOG_SW][데이터 체크]", reservDate[1]);
      }
      console.log("[LOG_SW][예약 일자]", getReservDate);
      return getReservDate;
    }
  }
}

// 요일구하는 함수
function getDateStr(yyyyMMdd) {
  var sYear = yyyyMMdd.substring(0, 4);
  var sMonth = yyyyMMdd.substring(4, 6);
  var sDate = yyyyMMdd.substring(6, 8);

  var date = new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));

  var week = ["일", "월", "화", "수", "목", "금", "토"];
  return `(${week[date.getDay()]})`;
}
