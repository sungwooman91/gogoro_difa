/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 시승행사 안내 페이지
/*  위    치 : /contents/intro.js
/*******************************************************************************************/
import Head from "next/head";
import { useRouter } from "next/router";
//
import { style } from "../../lib/component/layout/intro";

export default function IntroGogoro() {
  const router = useRouter();
  /** 페이지 이동  */
  const backToPageHandler = () => {
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>:: 고고로 시승행사 예약 ::</title>
      </Head>
      <div id="ContentsWrapper">
        <div id="MainContents">
          <div className="contents-wrap">
            <div id="header-wrapper" onClick={backToPageHandler}>
              <span className="btn_back">
                <img src="/images/contents/icon_back.png" alt="뒤로가기" />
              </span>
              <span className="header-subject">이전화면</span>
            </div>
            <div className="articles">
              <div className="event-wrapper">
                <div className="btn_gps">
                  <img src="/images/contents/icon_gps.png" alt="시승 행사 안내" />
                </div>
                <div className="subject">
                  <h2 className="subject">시승 행사 안내</h2>
                </div>
                <div className="event-wrap">
                  <img src="/images/contents/event_info_2.png" alt="시승 행사 안내" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
