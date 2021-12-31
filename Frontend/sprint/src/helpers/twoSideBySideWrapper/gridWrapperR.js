import styled from "styled-components";

const GridWrapperR = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto;
  grid-auto-rows: minmax(25px, auto);
  width: 30%;
  height: auto;
  margin-bottom: 1em;
  display: flex;
  float: right;
  margin-left: auto;
  margin-right: 0.5em;
  position: fixed;
  right: 0;
`;

export default GridWrapperR;
