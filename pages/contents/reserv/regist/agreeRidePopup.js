/*******************************************************************************************/
/*  작 성 자 : 바이크뱅크(주)
/*  작 성 일 : 2022.
/*  수 정 일 : 2022.
/*  버    전 : 0.0.1
/*  설    명 : 시승 신청 동의 페이지
/*  위    치 : /contents/reserv/regist/agreeRidePopup.js
/*******************************************************************************************/

import { style } from "../../../../lib/component/layout/regist";

export default function AgreeRidePopup({ onClickHandler }) {
  return (
    <>
      <div className="reserv-agreement1-wrap popup-wrap">
        <div className="layer-bg"></div>
        <div className="reserv-agreement1-info">
          <div className="contents-detail">
            <h3 className="subject">(필수) 시승 신청 동의</h3>
            <div className="input-controls responsive-contents">
              <div id="shop_basic_wrap">
                1. 법적 효력이 있는 운전면허증을 소유하였습니다.
                <br />
                <br />
                2. 시승 시 시승자는 회사의 안내에 따라야 하며, 안전운전에 최선을 다 하여야 합니다.
                <br />
                <br />
                3. 운전자의 과실이나 고의로 인한 사고 시에는 사고에 따른 책임을 운전자가 지며, 시승차량의 파손에 대하여 회사와의 협의 하에 배상하겠습니다.
                <br />
                <br />
                <span style={{ color: "red" }}>4. 해당 시승차량은 만 19세 이상 책임 보험에 가입되어 있으며, 보험 연령을 준수하여 시승 하겠습니다.</span>
                <br />
                <br />
                5. 상기의 시승 신청은 신청인의 희망에 따른 것이며, 운전자 본인확인을 위하여 시승인의 개인정보 수집 이용, 제공에 동의하여야 시승이 가능합니다.
                <br />
                <br />
              </div>
            </div>
            <div className="agreement-command">
              <span className="confirm">
                <a onClick={() => onClickHandler(true)} title="동의">
                  <span className="agreement_confirm">동의</span>
                </a>
              </span>
            </div>
          </div>
          <div className="close">
            <span className="close">
              <a onClick={() => onClickHandler(false)} title="닫기">
                <img src="/images/board/button/btn_layer_close02.png" alt="닫기" />
              </a>
            </span>
          </div>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
