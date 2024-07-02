import styled from "styled-components";

export const RoundTrimming = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 12px 20px 2px 1px ColorPicker;
`;

export const ColorPicker = styled.input.attrs((props) => ({ type: "color" }))`
  border: 0;
  padding: 0;
  width: 200%;
  height: 200%;
  cursor: pointer;
  transform: translate(-25%, -25%);
`;
