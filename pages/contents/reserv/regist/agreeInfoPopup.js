/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 개인정보 수집 및 이용에 대한 동의 팝업 페이지
/*  위    치 : /contents/reserv/regist/agreeInfoPopup.js
/*******************************************************************************************/

import { useRouter } from "next/router";
import { style } from "../../../../lib/component/layout/regist";
// import Image from "next/image";

export default function AgreeInfoPopup({ onClickSecondHandler }) {
  const router = useRouter();

  // 뒤로가기 함수

  return (
    <>
      <div className="reserv-agreement2-wrap popup-wrap">
        <div className="layer-bg"></div>
        <div className="reserv-agreement2-info">
          <div className="contents-detail">
            <h3 className="subject">(필수) 개인정보 수집 및 이용에 대한 동의</h3>
            <div className="input-controls responsive-contents">
              <div id="shop_basic_wrap">
                <table>
                  <thead>
                    <tr>
                      <th colSpan="2">개인정보 수집 및 이용에 대한 동의</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>개인정보 수집 항목</td>
                      <td>성명, 연락처, 생년월일, 운전면허정보</td>
                    </tr>
                    <tr>
                      <td>개인정보 수집 및 이용 목적</td>
                      <td>시승접수 및 본인 확인과 최신 정보의 안내 등 마케팅 활동을 위하여 사용</td>
                    </tr>
                    <tr>
                      <td>개인정보 보유 및 이용 기간</td>
                      <td>개인정보는 수집 및 이용목적 달성 시까지 보유하며, 시승 신청 철회 또는 개인정보 수집 및 이용목적이 달성되면 즉시 파기함.</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <br />
                본인은 개인정보보호법 등 관련 법규에 의거하여 위와 같이 개인정보 수집 및 활용에 동의함.
              </div>
            </div>
            <div className="agreement-command">
              <span className="confirm">
                <a onClick={() => onClickSecondHandler(true)} title="동의">
                  <span className="agreement_confirm">동의</span>
                </a>
              </span>
            </div>
          </div>
          <div className="close">
            <span className="close">
              <a onClick={() => onClickSecondHandler(false)} title="닫기">
                <img src="/images/board/button/btn_layer_close02.png" alt="{0}" />
              </a>
            </span>
          </div>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
