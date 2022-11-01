/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 예약 등록 상세 페이지
/*  위    치 : /contents/reserv/regist/registFrom.js
/*******************************************************************************************/

// 페이지 이동 모듈
import { useRouter } from "next/router";
// 변수 상태관리 및 초기 설정을 위한 리액트 훅
import { useEffect, useState } from "react";
import axios from "axios";
// css
import { style } from "../../../../lib/component/layout/regist";
// 팝업 컴포넌트
import AgreeRide from "./agreeRidePopup";
import AgreeInfo from "./agreeInfoPopup";
// 현재 시간 및 날짜 계산 모듈
import { getToDate, getToday } from "../../../../common/lib";

const Registform = () => {
  /** 1. 에러메세지 */
  // [1-1.유효성 상태]
  const [hasError, setHasError] = useState(true);
  // [1-2. 시승차이용약관동의 입력 에러메세지 상태]
  const [rideBoxError, setRideBoxError] = useState(false);
  // [1-3. 개인정보활용동의 입력 에러메세지 상태]
  const [infoBoxError, setInfoBoxError] = useState(false);

  // [ 데이터 수신 체크 ]
  const [isGetData, setIsGetData] = useState(false);
  // [예약 날짜 선택 상태]
  const router = useRouter();
  const [isDate, setIsDate] = useState(false);
  const [isHour, setIsHour] = useState(false);
  const [isMinute, setIsMinute] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  // [ 시간 설정 에러메세지 상태 ]
  const [dateError, setDateError] = useState(false);
  const [hourError, setHourError] = useState(false);
  const [minError, setMinError] = useState(false);

  // [예약 선택 정보 response ]
  const [daysList, setDaysList] = useState([]);
  const [hourList, setHourList] = useState([]);
  const [minuteList, setMinuteList] = useState([]);

  // [예약 등록 관련 변수 설정]
  const getDay = () => getToDate();
  const [monthValue, setMonthValue] = useState("");
  const [getFullDate, setGetFullDate] = useState(getToday());
  const [getDate, setGetDate] = useState("");
  const [getHour, setGetHour] = useState("");
  const [getMinute, setGetMinute] = useState("");
  const [reservId, setReservId] = useState("");

  // 시승 약관 동의 체크박스 및 팝업 설정 초기화
  const [rideCheck, setRideCheck] = useState(false);
  const [onClick, setOnClick] = useState(false);
  // 개인정보 활용 동의 체크박스 및 팝업
  const [infoCheck, setInfoCheck] = useState(false);
  const [onClickSecond, setOnClickSecond] = useState(false);

  // [ 페이징 초기 렌더링 예약날짜 데이터 GET ]
  useEffect(() => {
    console.log("timming get reservDate");

    const getDataFromServer = async () => {
      try {
        axios.post("/api/reserv/regist/search/reservDate").then((res) => {
          if (res.status === 200) {
            console.log("[LOG_SW][Response result] : ", res.data);
            console.log("[LOG_SW][Response result getDay] : ", getDay);

            // 시간 상태값
            setIsGetData(true);

            // 현재 진행되는 10월
            setMonthValue(res.data.month);
            //
            setDaysList(res.data.days);
            //
            setHourList(res.data.time);
            // setGetDate(getDay);
            setGetHour("");

            console.log("[LOG_SW][Time Date] : ", res.data.time);
            console.log("[LOG_SW][check Date] : ", res.data.days);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    getDataFromServer();
  }, []);

  // [ 1-1. 예약 날짜 정보 표시 Handler ]
  const onChangeDateHandler = async (event) => {
    const date = event.target.value.split("-");
    console.log("date:::", date);
    // 날짜 전체 입력
    setGetFullDate(event.target.value);
    // 날짜,시간,분 선택 값 초기화
    setGetDate(date[2]);
    setGetHour("");
    setGetMinute("");
    // 시간 선택 리스트 초기화
    setHourList([]);
    // 날짜, 시간, 분 선택 박스 상태값 초기화
    setIsMinute(false);
    setIsSubmit(false);
    setReservId(null);
    // 에러메시지 초기화
    setIsDate(true);
    setDateError(false);
    setHasError(false);
    /** [axios post 요청 예약 시간 선택 정보 조회] */
    try {
      const response = await axios
        .post("/api/reserv/regist/search/reservHour", {
          select_date: event.target.value,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsHour(true);
            setHourList(res.data.reserv_time);
            console.log("[LOG_SW][response Hour] ", res.data);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  // [ 1-2. 예약 시간 정보 표시 Handler ]
  const onChangeHourHandler = async (event) => {
    console.log("hour:: ", hourList);
    console.log("Minute:: ", minuteList);
    setGetHour(event.target.value);
    // setGetMinute("");
    // 분선택 선택 리스트 초기화
    setMinuteList([]);
    // 날짜, 시간, 분 선택 박스 상태값
    setIsMinute(false);
    setIsSubmit(false);
    setReservId(null);
    // 에러메시지 초기화
    setHourError(false);
    setHasError(false);
    const getHourValue = event.target.value;
    try {
      const response = await axios
        .post("/api/reserv/regist/search/reservMinute", {
          select_date: getFullDate,
          select_hour: getHourValue,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsMinute(true);
            // setGetMinute(event.target.value);
            setMinuteList(res.data.reserv_result);
            console.log("[LOG_SW][ minute reserv_result ] ", res.data);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  // [ 1-3 예약 분 정보 표시 Handler ]
  const onChangeMinuteHandler = (event) => {
    // 에러메시지 초기화
    setMinError(false);
    console.log("분체크:: ", event.target.value);
    for (let index = 0; index < minuteList.length; index++) {
      console.log(minuteList[index]);
      if (minuteList[index].RESERVATION_MINUTE === event.target.value) {
        setGetMinute(event.target.value);
        setReservId(`comm_reservation_idx_${minuteList[index].SERIAL_NUMBER}`);
        break;
      }
    }
    setIsSubmit(true);
    // console.log("reservId:: ", reservId);
  };

  // 시승차이용약관 동의 변경시 전환 기능
  useEffect(() => {
    if (rideCheck === true) {
      setOnClick(false);
      setRideBoxError(false);
      // 시승차이용약관 동의 에러메세지 상태 변경
    } else if (rideCheck === false) {
      // 시승차이용약관 동의 에러메세지 상태 변경
      setOnClick(false);
      setRideBoxError(false);
    }
  }, [rideCheck]);

  // 개인정보활용 동의 변경시 전환 기능
  useEffect(() => {
    if (infoCheck === true) {
      setOnClickSecond(false);
      setInfoBoxError(false);
      // setInfoBoxError(true);
    } else if (infoCheck === false) {
      setOnClickSecond(false);
      setInfoBoxError(false);
    }
  }, [infoCheck]);

  // [약관 동의 1]
  const doAgreePopupEvent = (e) => {
    setOnClick(true);
    setRideCheck("");
    // 에러상태 관리
    setHasError(false);
  };
  const onClickHandler = (value) => {
    setRideCheck(value);
  };

  /**  */
  // [약관 동의 2]
  const doAgreeSecondPopupEvent = (e) => {
    setOnClickSecond(true);
    setInfoCheck("");
    // 에러상태 관리
    setHasError(false);
  };

  const onClickSecondHandler = (value) => {
    setInfoCheck(value);
  };

  // [ 예약 등록 정보 전송 submit ]
  const setReservationSubmit = async (event) => {
    // let errorState = false;
    console.log("등록할 예약 넘버 : ", reservId);

    // 오류메세지 초기화
    let message = `필수 입력항목을 확인 해 주세요.`;
    // let inputErrorMessage = "입력 양식을 확인 해 주세요.";

    // 입력폼 유효성 검사 (시승차 이용 약관 동의)
    if (!rideCheck) {
      setRideBoxError(true);
    }
    // 입력폼 유효성 검사 (개인정보 활용 동의)
    if (!infoCheck) {
      setInfoBoxError(true);
    }
    // 입력폼 유효성 검사 (날짜 정보 입력유무)
    if (!isDate) {
      setDateError(true);
      setHasError(true);
    }
    // 입력폼 유효성 검사 (시간 정보 입력유무)
    if (!isHour) {
      setHourError(true);
      setHasError(true);
    }
    // 입력폼 유효성 검사 (분 정보 입력유무)
    if (!isMinute) {
      setMinError(true);
      setHasError(true);
    }

    // 예약 승인 확인 처리
    let isConfirm = false;
    const confirm = "선택하신 예약정보로 시승 예약 하시겠습니까?";
    //
    if (!hasError && infoCheck && rideCheck) {
      //
      if (reservId !== null) {
        if (window.confirm(confirm)) {
          console.log("send complete");
          //
          try {
            await axios
              .post("/api/reserv/regist/complete", {
                reserv_id: reservId,
                date: getDate,
                reserv_date: getFullDate,
                reserv_hour: getHour,
                reserv_minute: getMinute,
              })
              .then((res) => {
                if (res.status === 200) {
                  console.log("[LOG_SW][response 예약하기 버튼 처리] ", res.data);
                  if (res.data.code === "00" || res.data.code === "OK") {
                    // 동적페이지 만들기
                    alert(res.data.message);
                    router.push("/contents/reserv/history/orderNo");
                  } else if (res.data.code === "99") {
                    alert(res.data.message);
                    router.push("/contents/login");
                  } else if (res.data.code === "88") {
                    alert(res.data.message);
                    router.push("/contents/reserv/history/orderNo");
                  } else {
                    alert(res.data.message);
                  }
                }
              });
          } catch (e) {
            console.log(e);
            alert("시스템 오류로 인해 해당 서비스가 실행되지 않습니다.\n\t시스템 개발사에 문의 해 주세요.");
          }
        } else {
          return;
        }
      } else {
        // switch:
        alert(message);
      }
    } else {
      alert(message);
      return;
    }
    //
  };

  /** 예약 요일 선택 박스 생성 */
  const setDateView = isGetData && (
    <>
      {daysList.map((date, index) => (
        <span key={index}>
          <input type="radio" name="reservation_date" id={`reservation_date_${daysList[index].reserv_fulldate}`} value={daysList[index].reserv_fulldate} onChange={onChangeDateHandler} />
          <label htmlFor={`reservation_date_${daysList[index].reserv_fulldate}`}>{date.reserv_date}</label>
        </span>
      ))}
      <style jsx>{style}</style>
    </>
  );
  /** 예약 시간 선택 박스 생성 */
  const setHourView = isHour && (
    <>
      {hourList.map((data, index) => (
        <span key={index}>
          <input type="radio" name="reservation_hour" id={`reservation_hour_${hourList[index]}`} value={hourList[index]} onChange={onChangeHourHandler} />
          <label htmlFor={`reservation_hour_${hourList[index]}`}>{data}시</label>
        </span>
      ))}
      <style jsx>{style}</style>
    </>
  );

  /** 예약 시간/분 선택 박스 생성 */
  const setMinuteView = isMinute && (
    <>
      {minuteList.map((date, index) => (
        <span key={index}>
          <input type="radio" name="reservation_minute" id={`comm_reservation_idx_${minuteList[index].SERIAL_NUMBER}`} value={minuteList[index].RESERVATION_MINUTE} onChange={onChangeMinuteHandler} />
          <label htmlFor={`comm_reservation_idx_${minuteList[index].SERIAL_NUMBER}`}>{date.RESERVATION_MINUTE}분</label>
        </span>
      ))}
      <style jsx>{style}</style>
    </>
  );

  return (
    <>
      <div className="reserv-wrap">
        <form id="reserv-input-form" action="" method="post" encType="application/x-www-form-urlencoded">
          <div id="reserv-step-1" className="reserv-step">
            <label htmlFor="agreement1_bit">
              <input type="checkbox" id="agreement1_bit" name="agreement1_bit" checked={rideCheck} onChange={doAgreePopupEvent} tabIndex="3000" />
              (필수) 시승차이용약관동의
            </label>
            {rideBoxError && (
              <div id="agreement1_bit_error" className="error">
                <strong>시승차이용약관동의</strong>를 선택 해 주세요.
              </div>
            )}
          </div>

          <div id="reserv-step-4" className="reserv-step">
            <label htmlFor="agreement2_bit">
              <input type="checkbox" id="agreement2_bit" name="agreement2_bit" checked={infoCheck} onChange={doAgreeSecondPopupEvent} tabIndex="3001" />
              (필수) 개인정보활용동의
            </label>
            {infoBoxError && (
              <div id="agreement2_bit_error" className="error">
                <strong>개인정보활용동의</strong>를 선택 해 주세요.
              </div>
            )}
          </div>

          <div id="reserv-step-2" className="reserv-step">
            <div className="reservation_date">
              <label htmlFor="reservation_date">
                <span className="subject">날짜선택</span>
              </label>
            </div>
            {isGetData === true && <div>{monthValue}</div>}
            {isGetData === true && (
              <div id="option-reserv-date">
                {/* 날짜 선택 select 박스 영역 */}
                {setDateView}
              </div>
            )}
            {dateError == true && (
              <div id="reservation_date_error" className="error">
                <strong>날짜</strong>를 선택 해 주세요.
              </div>
            )}
          </div>
          <div id="reserv-step-3" className="reserv-step">
            <div id="reserv-hour-wrap">
              <div className="reservation_hour">
                <label htmlFor="reservation_hour">
                  <span className="subject">시간선택</span>
                </label>
              </div>
              {isHour === true && (
                <div id="option-reserv-hour">
                  {/* 날짜 선택 select 박스 영역 */}
                  {setHourView}
                </div>
              )}
              {isHour === false && <div id="option-reserv-hour">예약가능한 시간이 없습니다.</div>}
              {hourError == true && (
                <div id="reservation_hour_error" className="error">
                  <strong>시간</strong>을 선택 해 주세요.
                </div>
              )}
            </div>
            {isMinute === true && (
              <div id="reserv-minute-wrap">
                <div className="reservation_minute">
                  <label htmlFor="reservation_minute">
                    <span className="subject">분 선택</span>
                  </label>
                </div>
                <div id="option-reserv-minute">
                  {/* 날짜 선택 select 박스 영역 */}
                  {setMinuteView}
                </div>
                {minError == true && (
                  <div id="reservation_minute_error" className="error">
                    <strong>분</strong>을 선택 해 주세요.
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="command">
            <span id="selected_reservate_info">{isSubmit === true && `${monthValue} ${getDate}일 ${getHour}:${getMinute} 시승하기`}</span>
            <a onClick={setReservationSubmit} title="예약하기" id="btn_send" className="btn_send" tabIndex="3002">
              <span className="subject">예약하기</span>
            </a>
          </div>
        </form>
      </div>
      {onClick && (
        <>
          <AgreeRide onClickHandler={onClickHandler} />
        </>
      )}
      {onClickSecond && <AgreeInfo onClickSecondHandler={onClickSecondHandler} />}
      <style jsx>{style}</style>
    </>
  );
};

export default Registform;
