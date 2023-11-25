import { FunctionComponent } from 'react';
import styled from 'styled-components';

const DivclControl1 = styled.div`
  position: absolute;
  height: calc(100% - 233px);
  width: 100%;
  top: 16px;
  right: 0px;
  bottom: 217px;
  left: 0px;
  overflow: hidden;
`;
const Div = styled.div`
  position: relative;
  letter-spacing: -0.75px;
  line-height: 1.2; /* Adjust this value */
  font-weight: 500;
`;
const DivclText = styled.div`
  position: absolute;
  top: calc(50% - 4px);
  left: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  padding: var(--padding-12xs-5) 60px var(--padding-12xs-5) 0px;
  align-items: flex-start;
  justify-content: flex-start;
`;
const DivclText1 = styled.div`
  position: relative;
  width: 368.89px;
  height: 19px;
  overflow: hidden;
  flex-shrink: 0;
`;
const DivclLayoutContent4 = styled.div`
  width: 788px;
  display: flex;
  flex-direction: row;
  padding: 10.15999984741211px 248.83998107910156px 0px var(--padding-3xs);
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
`;
const DivuuidOh = styled.div`
  position: absolute;
  height: calc(100% - 106.84px);
  width: calc(100% - 158px);
  top: 54px;
  right: 10px;
  bottom: 52.84px;
  left: 148px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const DivclText2 = styled.div`
  position: absolute;
  top: calc(50% + 28px);
  left: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  padding: var(--padding-10xs-5) 7px var(--padding-10xs-5) 0px;
  align-items: flex-start;
  justify-content: flex-start;
`;
const DivclLayoutContent3 = styled.div`
  position: absolute;
  height: calc(100% - 121px);
  width: 100%;
  top: 86px;
  right: 0px;
  bottom: 35px;
  left: 0px;
`;
const CopyrightBy = styled.div`
  position: relative;
  letter-spacing: -0.8px;
  line-height: 16px;
`;
const DivclText4 = styled.div`
  position: absolute;
  top: calc(50% + 112.5px);
  left: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  padding: var(--padding-8xs-5) 612px var(--padding-8xs-5) 0px;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 16px;
  color: #222;
`;
const DivclLayoutContent2 = styled.div`
  position: relative;
  width: 936px;
  height: 257px;
`;
const DivclLayout = styled.div`
  position: absolute;
  width: calc(100% + 16px);
  top: -16px;
  right: 0px;
  left: -16px;
  overflow: hidden;
`;
const DivclControl2 = styled.div`
  position: relative;
  width: 280px;
  height: 126px;
  overflow: hidden;
  flex-shrink: 0;
`;
const DivclLayoutContent6 = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  padding: 16px 0px 55px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
`;
const DivclLayoutContent1 = styled.div`
  width: 1280px;
  height: 335px;
  display: flex;
  flex-direction: row;
  padding: 40px 32px 44px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
`;
const DivclLayoutContent = styled.div`
  flex: 1;
  height: 335px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  padding: 0px 80px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
`;
const DivclControlRoot = styled.div`
  position: relative;
  background-color: #fff;
  border-top: 1px solid #dfdfdf;
  margin-top: 100px;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  padding: 1px 0px 0px;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: var(--font-size-mini);
  color: var(--color-dimgray);
  font-family: var(--font-noto-sans-kr);
`;
const Footer: FunctionComponent = () => {
  return (
    <DivclControlRoot>
      <DivclLayoutContent>
        <DivclLayoutContent1>
          <DivclLayoutContent2>
            <DivclControl1 />
            <DivclLayoutContent3>
              <DivclText>
                <Div>명지대학교 에이쁠조</Div>
              </DivclText>
              <DivuuidOh>
                <DivclLayoutContent4>
                  <DivclText1 />
                </DivclLayoutContent4>
              </DivuuidOh>
              <DivclText2>
                <Div>배수연 이윤아 최혁 홍향미</Div>
              </DivclText2>
            </DivclLayoutContent3>
            <DivclText4>
              <CopyrightBy>
                Copyright ⓒ by Leeyuna. All rights reserved.
              </CopyrightBy>
            </DivclText4>
          </DivclLayoutContent2>
          <DivclLayoutContent6>
            <DivclControl2>
              <DivclLayout />
            </DivclControl2>
          </DivclLayoutContent6>
        </DivclLayoutContent1>
      </DivclLayoutContent>
    </DivclControlRoot>
  );
};

export default Footer;
