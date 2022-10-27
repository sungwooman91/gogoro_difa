// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import dayjs from "dayjs";
import requestIp from "request-ip";
/**  */
import { customerInfoCurrentState, commonDataLog, kakaoMessageValue, setReservDataFormat } from "../../../../lib/component/reservData";
import { getSession } from "../../../../lib/get-session";
import { hasCookie } from "cookies-next";
import { setDataLog, getDataLog } from "../../login/getAuthNum";
import { getDate, getUserKey } from "../../../../lib/component/common";
// 암호화 모듈
import { aes256EncodeApi } from "../../../../common/lib";
/** db 프로시저 모듈 */
import { getDataView, getCustomerDataView, getDataCheck, newReservInsert, newReservInsertResult } from "../../../../common/db";

export default async function handler(req, res) {
  const tableName = "COMMON_RESERVATION_ORDER";
  if (req.method === "POST") {
    console.log("\n");
    console.log("======================= path : api/reserv/regist/complete =======================");
    console.log("================================= req.body ======================================");
    console.log(req.body);
    console.log("=================================================================================");
    console.log("\n");
    // 쿠키확인
    const isAdmin = hasCookie("DIFA2022", { req, res });
    // [세션 확인]
    const session = await getSession(req, res);
    // 변수 설정 초기화
    let result_code, result_message, result_keyword, result_order_no;
    let customerGetDataView = customerInfoCurrentState;

    try {
      // 사용자 인증 확인
      if (isAdmin) {
        // [ GET 예약 가능한 날짜 ]
        const getUserName = session.Admin_UserName;
        const getTelNo = session.Admin_TelNo;
        console.log("[LOG_SW][Check Session] ", getUserName, getTelNo);
        // 예약 시리얼 넘버
        const reservId = req.body.reserv_id;
        console.log("[LOG_SW] reservId ", reservId);
        // 예약 날짜
        // const reservDate = req.body.reserv_date;
        // 예약 시간
        // const reservHour = req.body.reserv_hour;
        // Reservation_idx 값 공백 확인
        if (reservId.length !== 0) {
          const getIP = requestIp.getClientIp(req);
          const checkReservList = await getDataView(reservId);
          // console.log("[LOG_SW][Check COMMON_RESERVATION_ORDER_Get_List_Check checkReservList] ", checkReservList);

          // 예약 가능 정보 조회 결과 체크
          if (checkReservList.length !== 0) {
            console.log("예약 가능합니다");
            // [이전 예약 정보 조회]
            const getDataCheckList = await getDataCheck(getUserName, getTelNo);
            if (getDataCheckList.length > 0) {
              result_code = "88";
              result_message = "시승 예약내역이 있거나 이미 시승을 하신 경우 시승 예약 신청이 불가합니다.";
              result_keyword = getTelNo;
              // console.log("[LOG_SW][ERROR result_Msg] ", result_message, "예약 정보 키 : ", getDataCheckList[0].COMMON_RESERVATION_SERIAL);
              // console.log(`[SERVER_RESULT]_RESULT_CODE : ${result_code} _RESULT_MESSAGE : ${result_message}`);
            } else {
              const reservTime = `${checkReservList[0].RESERVATION_DATE} ${checkReservList[0].RESERVATION_HOUR}:${checkReservList[0].RESERVATION_MINUTE}:00`;
              const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
              // 오늘 날짜가 지나지 않은 예약 건인지 확인 유무
              if (isSameDateAndTime(reservTime, currentTime)) {
                // [고객 휴대 전화 번호 조회]
                customerGetDataView = await getCustomerDataView(session.Admin_UserSerial);
                // console.log("[LOG_SW][Check Admin_UserSerial] ", customerGetDataView);
                /**
                 * 알림톡 전송 가능 여부 확인
                 */
                // 고객 메시지 전송 가능 여부
                let customerSendBit = false;
                // 휴대전화번호 체크
                const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
                if (regPhone.test(customerGetDataView[0].TEL_NO)) {
                  // console.log("[LOG_SW][Check 휴대전화번호 입니다.] ", customerGetDataView[0].TEL_NO);
                  // 고객 전송 가능 여부
                  customerSendBit = true;
                }
                // [시승예약 등록]
                if (customerSendBit) {
                  // [시승 예약 가능 여부 확인]
                  if (checkReservList[0].ORDER_COUNT <= checkReservList[0].RESERVATION_MAX) {
                    // 예약번호
                    let orderNo = null;
                    // 고유번호 복호화
                    let reservOrderIdx = null;
                    // [ 고객 예약 정보 변수 ]
                    const setReservData = setReservDataFormat(process.env.EVENT_SERIAL, reservId, session.Admin_UserSerial, checkReservList[0], getIP);
                    // [ 고객 예약 정보 등록]
                    /**
                     * COMMON_RESERVATION_ORDER_Set_Insert 프로시저
                     */
                    const reservInsert = await newReservInsert(setReservData);
                    // 결과값이 int로 출력됨
                    if (reservInsert) {
                      /**
                       * outCode로 serial_number를 출력하지 못하기 때문에 조회를 해서 얻어야함
                       * COMMON_RESERVATION_ORDER_Get_List로 예약 조회 시리얼 넘버로 검색 후 입력
                       */
                      const getInsertResult = await newReservInsertResult(process.env.EVENT_SERIAL, getUserName, getTelNo);
                      orderNo = getInsertResult[0].ORDER_NO;
                      setReservData.SERIAL_NUMBER = getInsertResult[0].SERIAL_NUMBER;
                      console.log("[LOG_SW][SERVER_RESULT_complete] Check getInsertResult Serial : ", getInsertResult[0].SERIAL_NUMBER);
                      console.log("[LOG_SW][SERVER_RESULT_complete] Check RESERVATION_DATE ", setReservData.RESERVATION_DATE);
                      /**
                       * [ 데이터 로그 저장 ]
                       */
                      if (setReservData.SERIAL_NUMBER !== 0) {
                        let orderDataLog = commonDataLog;
                        orderDataLog.TABLE_NAME = tableName;
                        orderDataLog.FK_SERIAL = setReservData.SERIAL_NUMBER;
                        orderDataLog.REGIST_IP = requestIp.getClientIp(req);
                        // 데이터 로그 저장 함수
                        setDataLog(orderDataLog);
                        // 로그 저장 출력 값 생성
                        const getLog = await getDataLog(orderDataLog);
                        // console.log(`[LOG_SW][SERVER_RESULT_complete] GET_DATA_LOG : ${JSON.stringify(getLog)}`);
                      }
                      // [ 고객 인증 문자 발송 ]
                      if (setReservData.SERIAL_NUMBER !== 0) {
                        console.log(`SERIAL_NUMBER : ${setReservData.SERIAL_NUMBER}`);
                        // 예약번호 암호화
                        // const salt = crypto.randomBytes(32).toString("base64");
                        // const secretOrderNum = crypto.pbkdf2Sync(orderNo, salt, 1, 32, "sha512").toString("base64");
                        let getEncodeOrderData = await aes256EncodeApi(orderNo);
                        console.log("aes256EncodeApi 리턴 complete:::", getEncodeOrderData);
                        // [암호화된 주문번호 문자열 치환/변환]
                        // secretOrderNum = secretOrderNum?.replaceAll("=", "-").replaceAll("/", "_").replaceAll("+", ".");
                        // 암호화된 주문번호
                        reservOrderIdx = getEncodeOrderData;

                        /**
                         * [알림톡 전송 정보 설정]
                         * 필수 [예약자명, 예약일시, 예약번호], 문의번호, url
                         */
                        const reservDateSplit = setReservData.RESERVATION_DATE.split("-");
                        const userName = customerGetDataView[0].USER_NAME,
                          reservDate = reservDateSplit[0] + "." + reservDateSplit[1] + "." + reservDateSplit[2] + "(" + getDate(setReservData.RESERVATION_DATE) + ")" + " " + setReservData.RESERVATION_HOUR + ":" + setReservData.RESERVATION_MINUTE,
                          reservNum = orderNo;
                        // console.log(`[LOG_SW][SERVER_RESULT_complete] checkpoint : ${reservDate} ${reservDateSplit}`);
                        const url = process.env.URL;
                        // 메세지에 전송할 url
                        const sendReserveUrl = `http://${url}/contents/reserv/history/orderNo/` + reservOrderIdx;
                        /**
                         * 카카오 비즈메시지 템플릿 내용 설정 함수
                         * setTemplateContent에서 templateCode, title, pushMessage 설정
                         */
                        let getSendKakaoData = setTemplateContent("고고로시승행사예약", kakaoMessageValue, userName, reservNum, reservDate, "010-4380-0051", sendReserveUrl);
                        getSendKakaoData.receiverTelNo = customerGetDataView[0].TEL_NO;
                        // console.log(`[LOG_SW][SERVER_RESULT] getSendKakaoData : ${JSON.stringify(getSendKakaoData)}`);

                        /**
                         * [카카오 비즈 메세지 발송]
                         * getSendKakaoData의 templateCode와 contents의 빈 값을 체크하는 조건
                         */
                        if (getSendKakaoData.templateCode !== null && getSendKakaoData.contents !== null) {
                          const getIpAddress = requestIp.getClientIp(req);
                          /**
                           * kakao 비즈메세지 전송 함수 [ 내부 API 동작]
                                                   
                           * 와일드샷 API 사용 함수 :: setKaKaoMessage
                           * const resultMessage = await setKaKaoMessage(getSendKakaoData)
                           
                           * 회사 내부 API 사용 함수 :: sendKakaoBizAPI (현재사용)
                           * const resultMessage = sendKakaoBizAPI(getSendKakaoData, getIpAddress);
                           */
                          const resultMessage = sendKakaoBizAPI(setReservData.SERIAL_NUMBER, getSendKakaoData, getIpAddress);
                          // [처리결과 확인]
                          // console.log("[SERVER_RESULT] 알림톡 전송", resultMessage);

                          /** SMS 문자 발송 로그 정보 등록 */
                          /** 회사 내부 API 사용시, Log 프로시저 호출 X */
                          if (resultMessage.sms_result_code === "OK") {
                            /**
                             * 와일드샷 API 사용 시, 문자 발송 로그 사용해야함.
                             * [SMS 문자 발송 LOG정보 초기화 설정]
                             * const sendLog = setLogData(setReservationOrder.SERIAL_NUMBER, getSendKakaoData, resultMessage, getIpAddress);
                            
                             * [SMS 문자 발송 LOG 정보 저장]
                             * sendSmsLogData(sendLog);                             
                             */
                            // console.log("[LOG_SW][SERVER_RESULT] sendSmsLogData", sendLog.FK_SERIAL);
                          }
                        }
                      }
                      // [ 처리결과 설정 ]
                      if (setReservData.SERIAL_NUMBER !== 0) {
                        result_code = "OK";
                        result_message = "시승예약이 성공적으로 완료되었습니다.";
                        result_keyword = session.Admin_TelNo;
                        result_order_no = reservOrderIdx;
                        // console.log(`[LOG_SW][SERVER_RESULT]_RESULT_CODE : ${result_code} _RESULT_MESSAGE : ${result_message}`);
                      } else {
                        result_code = "NO";
                        result_message = "시승 예약이 실패되었습니다.";
                        // console.log(`[LOG_SW][SERVER_RESULT]_RESULT_CODE : ${result_code} _RESULT_MESSAGE : ${result_message}`);
                      }
                    }
                  } else {
                    result_code = "NO";
                    result_message = "선택하신 시간에는 시승 예약을 할 수 없습니다. ";
                    // console.log(`[SERVER_RESULT]_RESULT_CODE : ${result_code} _RESULT_MESSAGE : ${result_message}`);
                  }
                } else {
                  result_code = "NO";
                  result_message = "시승예약이 실패되었습니다.";
                  // console.log(`[SERVER_RESULT]_RESULT_CODE : ${result_code} _RESULT_MESSAGE : ${result_message}`);
                }
              } else {
                result_code = "NO";
                result_message = "시승예약이 불가능한 시간입니다.";
                // console.log(`[SERVER_RESULT]_RESULT_CODE : ${result_code} _RESULT_MESSAGE : ${result_message}`);
              }
            }
          } else {
            result_code = "NO";
            result_message = "존재하지 않는 예약정보 입니다.";
            // console.log(`[SERVER_RESULT]_RESULT_CODE : ${result_code} _RESULT_MESSAGE : ${result_message}`);
          }
        } else {
          result_code = "NO";
          result_message = "분을 선택해주세요";
          // console.log(`[SERVER_RESULT]_RESULT_CODE : ${result_code} _RESULT_MESSAGE : ${result_message}`);
        }
        // [회원 로그인 확인]
      } else {
        result_code = "99";
        result_message = "사용자 인증 후 시승예약이 가능합니다.";
        // console.log(`[SERVER_RESULT]_RESULT_CODE : ${result_code} _RESULT_MESSAGE : ${result_message}`);
      }

      return res.status(200).json({ ok: true, code: result_code, message: result_message, keyword: result_keyword, orderNo: result_order_no });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

/**
 * 카카오 전송 메세지 템플릿 설정
 * @param {*} event 관리구분을 설정하는 조건 입력
 * @param {*} kakao_message_object 카카오비즈메세지 관련 데이터 셋 변수
 * @param {*} name 고객 이름
 * @param {*} orderNum 고객 휴대전화 번호
 * @param {*} date 예약하고자 하는 날짜
 * @param {*} call 지정된 문의 전화 번호
 * @returns kakao_message_object 객체에 새로운 키값들 생성하여 반환
 */
function setTemplateContent(event, kakao_message_object, name, orderNum, date, call, address) {
  switch (event) {
    case "고고로시승행사예약":
      kakao_message_object.templateCode = "SJB_055320";
      kakao_message_object.title = "[고고로 시승행사] 예약완료";
      kakao_message_object.contents =
        "안녕하세요! " +
        name +
        "님\r\n\r\n고고로 시승행사 예약 신청이 정상적으로 접수되었습니다.\r\n시승 예약 시간 10분 전에 시승장에 도착 해 주시고,\r\n시승 전 운전면허증 확인절차가 있으니 지참 해 주십시오.\r\n\r\n - 예약번호 : " +
        orderNum +
        "\r\n - 예약일시 : " +
        date +
        "\r\n\r\n■ 문의사항 : " +
        call +
        "\r\n\r\n<예약내용 확인하기>\r\n" +
        address;
      break;
    // case "고고로시승설문조사":
    //   (kakao_message_object.templateCode = "SJB_055336"),
    //     (kakao_message_object.title = "[고고로 시승행사] 설문조사]"),
    //     (kakao_message_object.plusFriendId =
    //       "안녕하세요! " +
    //       name +
    //       "님\r\n\r\n고고로 시승행사 예약 신청이 정상적으로 접수되었습니다.\r\n시승 예약 시간 10분 전에 시승장에 도착 해 주시고,\r\n시승 전 운전면허증 확인절차가 있으니 지참 해 주십시오.\r\n\r\n - 예약번호 : " +
    //       orderNum +
    //       "\r\n - 예약일시 : " +
    //       date +
    //       "\r\n\r\n■ 문의사항 : " +
    //       call +
    //       "\r\n\r\n<예약내용 확인하기>\r\n");
    //   break;
  }
  return kakao_message_object;
}

/**
 * 오늘 날짜가 지나지 않은 예약 건 비교하여 필터링 하는 함수
 * @param {*} date1 예약 일자 및 시간
 * @param {*} date2 현재 일자 및 시간
 * @returns
 */
function isSameDateAndTime(date1, date2) {
  let orderTime = new Date(date1);
  let currentTime = new Date(date2);
  return orderTime.getTime() > currentTime.getTime();
}

/**
 * 카카오 예약완료 메세지 전송 내부 API 사용 함수
 * @param {*} getDataFormat getDataFormat <= setTemplateContent (알림톡 전송을 위한 변수 포멧 객체)
 * @param {*} regist_IP 로그 저장을 위해 고객이 사용 중인 IP주소 입력
 * @returns sms 전송 결과처리값을 object로 반환
 */
async function sendKakaoBizAPI(fk_serial, getDataFormat, regist_IP) {
  const setResult = {};
  setResult.sms_result_code = "NO";
  setResult.smsUrl = "http://leaseapitest.gobikebank.com/v1/kakao";

  // 휴대전화번호 보정
  const pattern_spc = /^[0-9]{8,13}$/;
  let setRecieveTel = getDataFormat.receiverTelNo.split("-");
  const convertTelNo = setRecieveTel[0] + setRecieveTel[1] + setRecieveTel[2];
  if (!pattern_spc.test(convertTelNo)) {
    return null;
  }
  const userKey = getUserKey();
  // [SMS 처리결과 설정]
  console.log(`[SERVER_RESULT] Check Message : ${getDataFormat.plusFriendId} `);

  /** 회사 내부 API 카카오비즈메세지 전송 API 호출 */
  /**
   *  @params title ::
   *  @params receive_tel ::
   *  @params templateCode ::
   *  @params push_contents ::
   *  @params sms_type :: 003
   *  @params tableName :: COMMON_RESERVATION_ORDER
   *  @params serial ::
   *  @params regist_ip ::
   *  @params user_id ::
   */
  await axios
    .post(setResult.smsUrl, {
      title: getDataFormat.title,
      receive_tel: convertTelNo,
      templateCode: getDataFormat.templateCode,
      push_contents: getDataFormat.contents,
      sms_type: "003",
      tableName: "COMMON_RESERVATION_ORDER",
      serial: fk_serial,
      regist_ip: regist_IP,
      user_id: "system",
    })
    .then((response) => {
      // sms 로그 객체
      if (response.data.result_code === "00") {
        console.log("[LOG_SW][Check getLog] 메세지 전송 성공");
        console.log("[LOG_SW][Check getLog] ", response.data);
        setResult.sms_result_code = "OK";
        setResult.sms_result_message = response.data.result_message;
        setResult.code = response.data.code;
        setResult.user_key = userKey;
        setResult.send_data = `plusFriendId=@bikebank&senderKey=506bf71b391cb2fedabf6acef6210869eb64a25d&title=${getDataFormat.title}&receiverTelNo=${convertTelNo}&userKey=${userKey}&resendType=LMS&resendCallback=15229008&contents=${getDataFormat.contents}&templateCode=${getDataFormat.templateCode}`;
        setResult.receiver = convertTelNo;
        setResult.receive_data = response.data;
      } else {
        setResult.sms_result_code = "NO";
        setResult.sms_result_message = "REST API에서 오류가 발생했습니다. 개발자에게 문의해주세요.";
      }
      return setResult;
    })
    .catch((error) => {
      console.log("[LOG_SW][ERROR] 메세지 전송 실패", error.code);
    });

  return setResult;
}
