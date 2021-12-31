import styled from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  padding-top: 15.5em;
  margin-left: 5em;
  margin-right: 1em;
  grid-template-columns: auto;
  grid-auto-rows: minmax(25px, auto);
`;

export default GridWrapper;
