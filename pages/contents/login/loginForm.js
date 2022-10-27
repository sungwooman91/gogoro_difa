/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 사용자 확인 입력 세부 페이지
/*  위    치 : /contents/login/loginForm.js
/*******************************************************************************************/

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// 유효성검사 (React Hook Form 사용)
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { style } from "../../../lib/component/layout/login";
import { hasCookie, setCookie } from "cookies-next";
//
import { handleNextFocus } from "../../../utils/form";
//
const Logintest = (props) => {
  // [ 페이지 상태 초기화 ]
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [authState, setAuthState] = useState(false);
  const [nameError, setNameError] = useState(false);
  // 이름 입력 state
  const nameInput = useRef();
  // [휴대전화번호 입력 State]
  const [numError, setNumError] = useState(false);
  const msgError = "숫자를 입력하세요! 올바른 형식이 아닙니다.";
  const [inputValue, setInputValue] = useState("");
  const [inputFirst, setInputFirst] = useState("");
  const [inputSecond, setInputSecond] = useState("");
  const [inputLast, setInputLast] = useState("");
  // [인증번호 입력 State]
  const [authError, setAuthError] = useState(false);
  const [msgAuthError, setMsgAuthError] = useState("인증번호는 4자리 숫자로 입력해주세요!");

  const [inputAuthValue, setInputAuthValue] = useState("");
  // 공백 및 띄어쓰기 비교 변수 설정
  const regexSpacing = /^[^\s]+$/;

  // 유효성 검사 스키마 설정
  const validationSchema = yup.object().shape({
    name: yup.string().min(2, "두글자 이상 입력해주세요.").max(7, "8자 이상 안됩니다").matches(regexSpacing, "빈칸금지").required("이름을 입력하세요."),
    tel_no1: yup
      .string()
      .required()
      .matches(/^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g, "Invalid phone number"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  };
  // useForm 초기화 셋팅
  const { register, handleSubmit, getValues, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const router = useRouter();

  // submit 처리시 사용자 등록
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);

  // 휴대전화번호 첫번째
  const phoneNumFirst = (e) => {
    setInputFirst(e.target.value);
    handleNextFocus(e, "tel_no2");
  };

  // 휴대전화번호 두번째
  const phoneNumSecond = (e) => {
    setInputSecond(e.target.value);
    handleNextFocus(e, "tel_no3");
  };

  // 휴대전화번호 세번째
  const phoneNumLast = (e) => {
    setInputLast(e.target.value);
    handleNextFocus(e, "btn_send");
  };

  // [고객 이름 엘리먼트 포커스 설정]
  useEffect(() => {
    document.getElementById("user_name").focus();
  }, []);

  // 인증번호 입력 유효성 검사
  const handleAuthNumPress = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setInputAuthValue(e.target.value);
      setAuthError(false);
    } else {
      setAuthError(true);
      if (inputAuthValue.length === 4) {
        setAuthError(false);
      }
    }
  };

  /**
   * 인증번호 발송 버튼 이벤트
   * @param {*} event 인증번호 발급 버튼이벤트 클릭 param
   * @returns
   */
  const getUserIfo = (event) => {
    event.preventDefault();
    // 에레 메세지 상태값 초기화
    const totalPhoneNumber = inputFirst + "-" + inputSecond + "-" + inputLast;
    setMsgAuthError("");

    let errorStatus = false,
      customerSendBit = false;

    // console.log("[LOG_SW] 에러 bit 시작지점 :", errorStatus);
    console.log("[LOG_SW] 전송 bit 시작지점 :", customerSendBit);
    if (!event) {
      return;
    } else {
      const getName = getValues().name;
      console.log("name:::", getName);
      const getTelNum = totalPhoneNumber;
      // 이름 유효성 체크
      if (getName == undefined) {
        // setNameError(true);
        errorStatus = true;
        alert("이름을 입력해주세요.");
        return;
      } else if (getName.length < 2) {
        // setNameError(true);
        errorStatus = true;
        alert("이름을 정확히 입력해주세요");
        return;
      } else {
        if (!getName.match(/^[가-힣a-zA-Z]+$/)) {
          errorStatus = true;
          alert("이름을 정확히 입력해주세요");
          return;
        } else {
          errorStatus = false;
        }
      }
      // 휴대 전화 번호 유효성 검사
      const userPhoneNum = getTelNum;
      if (!userPhoneNum.match(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/)) {
        errorStatus = true;
        alert("휴대전화번호를 정확히 입력해주세요");
        return;
      } else {
        // console.log("[LOG_SW] 입력한 휴대전화번호 :", userPhoneNum);
        customerSendBit = true;
      }
      // 상태변경 확인
      console.log("errorStatus", errorStatus);
      console.log("check", customerSendBit);
      // errorStatus 상태 체크 후 백엔드로 데이터 전송
      if (!errorStatus) {
        setNameError(false);
        setNameError(false);
        // 유효성 검사 완료된 이름 state 저장
        setUserName(getName);
        // gogoroAPI
        const api_address = "http://rentapi.gobikebank.com/v1/login/auth/";
        // const api_address = "http://localhost:3000/v1/login/auth/";
        axios
          .post(
            api_address,
            {
              name: getName,
              phone_number: userPhoneNum,
              sms_send_bit: customerSendBit,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.status === 200) {
              console.log("[LOG_SW] response status : ", res.status);
              console.log("[LOG_SW] response data : ", res.data);

              setUserPhone(res.data.user_phone);
              setAuthState(res.data.display_add_button);
              // setUserAuth(res.data.auth_number);
              alert("인증 번호가 발송 되었습니다!");
            } else if (res.status === 500) {
              console.log("[LOG_SW] response data : ", res.data);
            }
            // console.log("[LOG_SW] res status : ", res);
          })
          .catch((error) => {
            console.log("[LOG_SW][ERROR] ", error);
          });
      }
    }
  };
  // 사용자 등록
  /**
   * 입력받은 인증번호 확인 및 사용자 등록 후 예약 페이지 이동
   * @param {*} event
   * @returns
   */
  const postUserInfo = (event) => {
    event.preventDefault();
    let errorStatus = false;
    if (!event) {
      return;
    } else {
      // axios 파라미터 설정
      const authNum = inputAuthValue;
      const getPhoneNum = userPhone;
      // 인증번호 4자리 유효성검사
      if (!authNum.match(/^[A-Za-z0-9]{4,4}$/)) {
        errorStatus = true;
        alert("인증번호 4자리를 정확히 입력해주세요");
        return;
      }
      // 유효성 검사가 정확히 끝났을때 전송
      if (!errorStatus) {
        console.log("To send param nmae ::: ", userName);
        axios
          .post("/api/login/token", {
            user_name: userName,
            user_phone: getPhoneNum,
            auth_number: authNum,
          })
          .then((res) => {
            console.log("[LOG_SW] [response status]", res.status);
            if (res.status === 200) {
              console.log("[LOG_SW] [response data]", res.data);

              if (res.data.code === "OK" || res.data.code === "00") {
                // 조회되었습니다?
                console.log("[LOG_SW] 예약 정보 입력 페이지로 이동");
                // 쿠키 생성
                if (!hasCookie("DIFA2022")) {
                  const cookieOptions = { maxAge: 60 * 60 * 6 };
                  setCookie("DIFA2022", res.data.cookieValue, cookieOptions);
                }
                alert("로그인 되었습니다.");
                //
                router.push("/contents/reserv/regist");
              } else if (res.data.code === "88") {
                alert(res.data.message);
                router.push("/contents/reserv/history/orderNo");
              } else if (res.data.code === "NO") {
                setAuthError(true);
                setMsgAuthError(res.data.message);
                alert(res.data.message);
              } else if (res.data.code === "99") {
                setAuthError(true);
                setMsgAuthError(res.data.message);
                alert(res.data.message);
              }
            }
          })
          .catch((error) => {
            console.log("[LOG_SW][ERROR] ", error);
          });
      }
    }
  };
  /**
   * 입력 초기화 버튼 이벤트 함수
   * @param {*} event
   * @returns
   */
  const onReset = (event) => {
    if (!event) {
      return;
    }
    reset();
    setInputValue("");
    setInputAuthValue("");
    setAuthState("");
    setInputSecond("");
    setInputFirst("");
    setInputLast(false);
  };

  return (
    <>
      <div className="login-wrap">
        <form id="login-input-form" onSubmit={handleSubmit(onSubmit, onError)}>
          <fieldset>
            {/* 이름 입력 확인 */}
            <div className="row-input-id">
              <div className="uname">
                <label>
                  <span className="subject">이름</span>
                </label>
              </div>
              <input
                id="user_name"
                placeholder="이름을 입력해주세요."
                name="name"
                type="text"
                autoComplete="off"
                maxLength={8}
                // initValue={initValue.name}
                {...register("name", { maxLength: 8 })}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                disabled={authState}
                // ref={nameInput}
              />
              {nameError === true && (
                <div id="user_name_error" className="error">
                  {errors.name?.message}
                </div>
              )}
            </div>
            {/* 휴대전화번호 입력 */}
            <div className="row-input-tel">
              <div className="tel_no">
                <label htmlFor="tel_no">
                  <span className="subject">휴대전화번호</span>
                </label>
              </div>
              {/* <input type="text" id="tel_no1" name="tel_no1" autoComplete="off" placeholder="휴대전화번호를 입력해주세요." maxLength={13} onChange={handlePhoneNumPress} value={inputValue} disabled={authState} /> */}
              <input type="number" id="tel_no1" name="tel_no1" autoComplete="off" maxLength={3} onChange={phoneNumFirst} value={inputFirst} disabled={authState} autoFocus inputMode="numeric" />
              <input type="number" id="tel_no2" name="tel_no2" autoComplete="off" maxLength={4} onChange={phoneNumSecond} value={inputSecond} disabled={authState} autoFocus inputMode="numeric" />
              <input type="number" id="tel_no3" name="tel_no3" autoComplete="off" maxLength={4} onChange={phoneNumLast} value={inputLast} disabled={authState} autoFocus inputMode="numeric" />
              {numError === true && (
                <div id="tel_no_error" className="error">
                  {/* {errors.tel_no1 && "전화번호 형식이 맞지 않습니다."} */}
                  {msgError}
                </div>
              )}
            </div>
            <div className="row-hr"></div>
            {/* 인증번호 확인 */}
            {authState && (
              <div id="code" className="row-input-code">
                <div className="login_code">
                  <label htmlFor="login_code">
                    <span className="subject">본인확인 인증번호</span>
                  </label>
                </div>
                <input type="number" id="login_code" name="authNumber" autoComplete="off" placeholder="인증번호 4자리" maxLength={4} onChange={handleAuthNumPress} value={inputAuthValue} inputMode="numeric" />
                {authError === true && (
                  <div id="login_code_error" className="error">
                    {msgAuthError}
                  </div>
                )}
              </div>
            )}
          </fieldset>

          <div className="command">
            {!authState && (
              <a id="btn_send" type="button" onClick={getUserIfo} className="btn_send" tabIndex={3005}>
                <span className="subject">인증번호 발송</span>
              </a>
            )}
            {authState && (
              <a id="btn_reset" type="button" onClick={onReset} className="btn_reset" tabIndex={3006}>
                <span className="subject">초기화</span>
              </a>
            )}
            {authState && (
              <a id="btn_confirm" type="button" onClick={postUserInfo} className="btn_confirm" tabIndex={3007}>
                <span className="subject">확인</span>
              </a>
            )}
          </div>
        </form>
      </div>
      <style jsx>{style}</style>
    </>
  );
};

export default Logintest;
