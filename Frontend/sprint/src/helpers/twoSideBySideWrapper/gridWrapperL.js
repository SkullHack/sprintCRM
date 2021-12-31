import styled from "styled-components";

const GridWrapperL = styled.div`
  display: grid;
  grid-gap: 10px;
 
  grid-template-columns: auto;
  grid-auto-rows: minmax(25px, auto);
  width: 75%;
  height: auto;
  float: left;
  min-height: 100%;
  margin-bottom: 1em;
`;

export default GridWrapperL;
