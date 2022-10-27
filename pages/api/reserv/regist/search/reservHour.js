// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("======================= path : api/reserv/regist/search/reservHour =======================");
    console.log("====================================== req.body ==========================================");
    console.log(req.body);
    console.log("==========================================================================================");
    console.log("\n");

    const reservDate = req.body.select_date;
    try {
      // [ GET 예약 가능한 날짜 ]
      const data = await orderGetTime("1", process.env.EVENT_SERIAL, "00", reservDate, "Y");
      // 현재 month 값 설정
      // console.log("[LOG_SW][Get COMMON_RESERVATION_Get_Hour]", data);
      return res.status(200).json({ ok: true, reserv_date: data[0], reserv_time: data[1] });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

// [ 예약 시간 정보 조회 ]
async function orderGetTime(order_bit, event_serial, reservation_type, reserv_date, use_bit) {
  const ORDER_BIT = order_bit,
    COMMON_EVENT_SERIAL = event_serial,
    RESERVATION_TYPE = reservation_type,
    RESERVATION_DATE = reserv_date,
    USE_BIT = use_bit;

  const reservData = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_Get_Hour] ${ORDER_BIT}, ${COMMON_EVENT_SERIAL}, ${RESERVATION_TYPE}, ${RESERVATION_DATE}, ${USE_BIT}, null, null;`;
  //   const reservData = [1, 1, 1, 1, 1, 1, 0];
  // console.log("[LOG_SW][OrderGetTime Results]", reservData);
  if (reservData.length === 0 && Array.isArray(reservData)) {
    console.log("[reserve hour]예약 가능 시간", reservData);
    // 빈배열 체크
    return false;
  } else {
    if (reservData.length > 0) {
      console.log("[LOG_SW][Hour 데이터 체크1]", reservData);
      let getTimeResult = [];
      let getTimeData = [];
      getTimeResult.push(RESERVATION_DATE);
      // 현재 month 값 설정
      const today = new Date();
      const thisHour = ("0" + today.getHours()).slice(-2);
      // console.log("[LOG_SW][현재 Hour]", thisHour);
      // 현재 Hour에 신청가능한 날짜 sort
      for (let index = 0; index < reservData.length; index++) {
        // reservDate 결과값 = [ '2022', '08', '17' ]
        if (reservData[index].RESERVATION_HOUR) {
          // console.log("[LOG_SW][DB Hour]", reservData[index].RESERVATION_HOUR);
          getTimeData.push(reservData[index].RESERVATION_HOUR);
        }
      }
      getTimeResult.push(getTimeData);
      console.log("[LOG_SW][Hour data result]", getTimeResult);
      return getTimeResult;
    }
  }
}
