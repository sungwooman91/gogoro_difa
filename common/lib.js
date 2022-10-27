// import CryptoJS from "CryptoJS";
import axios from "axios";
/**
 *
 * @returns day
 */
export function getToDate() {
  var date = new Date();
  var day = ("0" + date.getDate()).slice(-2);
  return day;
}
/**
 *
 * @param
 * @returns
 */
export function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

/* [aes256Encode Api 이벤트 함수 정의] */
export async function aes256EncodeApi(order_num) {
  // console.log("aes256EncodeApi ::: ", order_num);
  const getData = {};
  const order_no = order_num;
  let secret_num;
  const params = {
    source: order_no,
  };
  // const getOrder = "jyr3GFssfB_H6DXbvv8Nzk_EHlyfpCx.RAR6mfzcOZc-";
  const getOrderData = await axios
    .get("https://leaseapitest.gobikebank.com/v1/encode/", {
      params,
    })
    .then((res) => {
      // console.log(res);
      // console.log("aes256EncodeApi:::", res.data);
      console.log("aes256EncodeApi:::", res.data.result_code);
      console.log("aes256EncodeApi:::", res.data.result_message);
      console.log("aes256EncodeApi:::", res.data.result);
      if (res.data.result_code === "00") {
        // setGetOrderNum;
        // console.log("[LOG_SW][암호화 api get Data] : ", res.data.result);
        getData.result_code = res.data.result_code;
        getData.result = res.data.result;
        return getData.result;
      } else {
        console.log("[LOG_SW][12 api test] : ", res.data);
        // return secret_num;
      }
    })
    .catch((error) => {
      console.log("[LOG_SW][123 error] : ", error);
    });
  return getOrderData;
}

/**
 * aes256DecodeApi 이벤트 함수 정의
 * @param {*} secret_serial 암호화된 시리얼 예약 키 셋업
 * @returns 복호화 처리된 예약번호 및 결과 값 송출
 */
export async function aes256DecodeApi(secret_serial) {
  console.log("aes256DecodeApi::: ", secret_serial);
  console.log("aes256DecodeApi::: ", secret_serial.result);
  console.log("aes256DecodeApi::: ", secret_serial.result_code);
  const getData = {};
  const secret_num = secret_serial;

  const params = {
    source: secret_num,
  };
  // const getOrder = "jyr3GFssfB_H6DXbvv8Nzk_EHlyfpCx.RAR6mfzcOZc-";
  const getDecodeData = await axios
    .get("https://leaseapitest.gobikebank.com/v1/decode/", {
      params,
    })
    .then((res) => {
      if (res.data.result_code === "00") {
        // setGetOrderNum;
        // console.log("[LOG_SW][암호화 api get Data]] : ", res.data);
        // order_no = res.data.result;
        getData.result_code = res.data.result_code;
        getData.result = res.data.result;
        return getData.result;
      } else {
        console.log("[LOG_SW][11 api test] : ", res.data);
        getData.result_code = res.data.result_code;
        getData.result = res.data.result;
        return getData.result;
      }
    })
    .catch((error) => {
      console.log("[LOG_SW][456 error code] : ", error.code);
      console.log("[LOG_SW][456 error response] : ", error.response.status);
      console.log("[LOG_SW][456 error response] : ", error.response.data);
    });
  return getDecodeData;
}

/* [aes256Encode 이벤트 함수 정의] */
// export function aes256Encode(data) {
//   console.log("[data123123] : ");
//   const CryptoJS = require("crypto-js");
//   var aesSecretKey = "0123456789abcdef0123456789abcdef";
//   var aes256Iv = "0123456789abcdef"; //iv 16 바이트
//   var aes256EncodeData;

//   // [aes 인코딩 수행 실시 : cbc 모드]
//   const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(aesSecretKey), {
//     iv: CryptoJS.enc.Utf8.parse(aes256Iv), // [Enter IV (Optional) 지정 방식]
//     padding: CryptoJS.pad.Pkcs7,
//     mode: CryptoJS.mode.CBC, // [cbc 모드 선택]
//   });
//   aes256EncodeData = cipher.toString();
//   // [인코딩 된 데이터 확인 실시]
//   console.log("[data] : " + aes256EncodeData);

//   return aes256EncodeData;
// }

/* [aes256Decode 이벤트 함수 정의] */
// export function aes256Decode(data) {
//   const CryptoJS = require("crypto-js");
//   var aesSecretKey = "0123456789abcdef0123456789abcdef";
//   var aes256Iv = "0123456789abcdef"; //iv 16 바이트
//   var aes256DecodeData;

//   // [aes 디코딩 수행 실시 : cbc 모드]
//   const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(aesSecretKey), {
//     iv: CryptoJS.enc.Utf8.parse(aes256Iv), // [Enter IV (Optional) 지정 방식]
//     padding: CryptoJS.pad.Pkcs7,
//     mode: CryptoJS.mode.CBC, // [cbc 모드 선택]
//   });

//   // [인코딩 된 데이터 확인 실시]
//   aes256DecodeData = cipher.toString(CryptoJS.enc.Utf8);

//   console.log("[decode data] : " + aes256DecodeData);

//   return aes256DecodeData;
// }
