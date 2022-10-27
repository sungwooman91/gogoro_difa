// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { orderGetTime, orderGetTimeTest } from "../../../../../common/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("======================= path : api/reserv/regist/search/reservMinute =======================");
    console.log("====================================== req.body ==========================================");
    console.log(req.body);
    console.log("==========================================================================================");
    console.log("\n");
    const reservDate = req.body.select_date;
    const reservHour = req.body.select_hour;
    try {
      // [ GET 예약 가능한 날짜 ]
      // const data = await orderGetTime("1", process.env.EVENT_SERIAL, "00", reservDate, reservHour, "Y");
      const data = await orderGetTimeTest("1", process.env.EVENT_SERIAL, "00", reservDate, reservHour, "Y");
      // 현재 month 값 설정
      console.log("minute::", data[0]);
      // console.log("minute22::", data2[0]);
      return res.status(200).json({ ok: true, reserv_result: data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
