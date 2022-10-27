// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("======================= path : api/reserv/regist/search/reservDate =======================");
    console.log("====================================== req.body ==========================================");
    console.log(req.body);
    console.log("==========================================================================================");
    console.log("\n");
    // [ 처리결과 설정]
    try {
      // [ GET 예약 가능한 날짜 조회 ]
      const data = await orderGetDate("0", process.env.EVENT_SERIAL, "00", "Y");
      // [ 초기 시간 선택값 생성 ]
      const initialTimeValue = await initialSelectTime();
      console.log("[api/reserv/regist/search/reservDate] :::", initialTimeValue);
      // [이번달]
      const today = new Date(),
        thisMonth = ("0" + (today.getMonth() + 1)).slice(-2) + "월";
      console.log("[api/reserv/regist/search/reservDate] :::", today);
      //
      console.log("[api/reserv/regist/search/reservDate] :::", thisMonth);
      //
      console.log("[api/reserv/regist/search/reservDate] :::", data);
      console.log("\n");
      //
      return res.status(200).json({ ok: true, month: thisMonth, days: data, time: initialTimeValue });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

// [ 예약 정보 조회 ]
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
          let dataObject = {};
          const strDate = reservDate.join("");
          const getWeekDate = getDateStr(strDate);
          const sendDate = reservDate[2] + "일" + getWeekDate;

          dataObject.reserv_fulldate = reservData[index].RESERVATION_DATE;
          dataObject.reserv_date = sendDate;
          getReservDate.push(dataObject);
        }
      }
      return getReservDate;
    }
  }
}

// [ 초기 시간 선택값 생성 ]
async function initialSelectTime() {
  const thisDay = getToday(),
    today = new Date(),
    thisHour = ("0" + today.getHours()).slice(-2);

  const getInitialTime = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_Get_Hour] "1", 1, "00", ${thisDay}, "Y", null, null;`;

  let getTimeData = [];
  for (let index = 0; index < getInitialTime.length; index++) {
    if (getInitialTime[index].RESERVATION_HOUR >= thisHour) {
      getTimeData.push(getInitialTime[index].RESERVATION_HOUR);
    }
  }
  return getTimeData;
}

// [요일 구하는 함수]
function getDateStr(yyyyMMdd) {
  var sYear = yyyyMMdd.substring(0, 4);
  var sMonth = yyyyMMdd.substring(4, 6);
  var sDate = yyyyMMdd.substring(6, 8);
  var date = new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
  var week = ["일", "월", "화", "수", "목", "금", "토"];
  return `(${week[date.getDay()]})`;
}

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}
