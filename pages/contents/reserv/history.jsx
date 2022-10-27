/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 예약 이력 조회 페이지
/*  위    치 : /contents/reserv/history.js
/*******************************************************************************************/

import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function History() {
  // [ 페이지 초기화 ]
  const [isReserv, setIsReserv] = useState();
  const router = useRouter();
  /**
   * 로그인 확인여부 useEffect
   * api/login/check 에서 로그인 상태를 쿠키와 세션값으로 확인 후 결과 처리
   */
  useEffect(() => {
    const getLoginStatus = () => {
      axios
        .post("/api/reserv/history/orderNo")
        .then((res) => {
          const result = res.data.code;
          if (result === "OK") {
            setIsReserv(true);
            router.push("/contents/reserv/history/orderNo");
          } else if (result === "NO") {
            setIsReserv(false);
            alert(res.data.message);
            router.push("/");
          } else if (result === "No Login") {
            alert(res.data.message);
            router.push("/contents/login");
          }
        })
        .catch((e) => {
          alert("시스템 오류로 인해 해당 서비스가 실행되지 않습니다.\n\n\t시스템 개발사에 문의 해 주세요.");
          router.push("/");
        });
    };
    getLoginStatus();
  }, []);

  return (
    <div>
      <Head>
        <title>:: 고고로 시승행사 예약 ::</title>
      </Head>
    </div>
  );
}
