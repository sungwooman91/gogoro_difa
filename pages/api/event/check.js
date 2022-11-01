/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.10.12
/*  수 정 일 : 2022.10.12
/*  버    전 : 0.0.1
/*  설    명 : 예약 시승 행사 유무 확인
/*  위    치 : /api/event/check.js
/*******************************************************************************************/

import prisma from "../../../lib/prisma.js";
import moment from "moment";

export default async function handler(req, res) {
  // Input
  /** 대구 미래모빌리티 엑스포 이벤트 행사 행사코드 2 */
  const COMMON_EVENT_SERIAL = 2;
  const RESERVATION_TYPE = "00";
  let RESERVATION_DATE = moment().format("YYYY-MM-DD");
  console.log(RESERVATION_DATE);
  const USE_BIT = "Y";
  // Output
  let out_result_code = null;
  let out_result_msg = null;

  if (req.method === "GET") {
    const today = new Date();

    RESERVATION_DATE = "2022-10-27";
    try {
      // COMMON_RESERVATION_Get_Hour 프로시저 호출
      const data =
        await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_Get_Hour] "1", ${COMMON_EVENT_SERIAL}, ${RESERVATION_TYPE}, ${RESERVATION_DATE}, ${USE_BIT}, ${out_result_code}, ${out_result_msg};`;
      // RESERVATION_DATE = "2022-10-28";
      // const data1 = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_Get_Hour] "1", ${COMMON_EVENT_SERIAL}, ${RESERVATION_TYPE}, ${RESERVATION_DATE}, ${USE_BIT}, ${out_result_code}, ${out_result_msg};`;
      // RESERVATION_DATE = "2022-10-27";
      // const data2 = await prisma.$queryRaw`exec [dbo].[COMMON_RESERVATION_Get_Hour] "1", ${COMMON_EVENT_SERIAL}, ${RESERVATION_TYPE}, ${RESERVATION_DATE}, ${USE_BIT}, ${out_result_code}, ${out_result_msg};`;
      // console.log(data.length + data1.length + data2.length);
      console.log(data);
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
