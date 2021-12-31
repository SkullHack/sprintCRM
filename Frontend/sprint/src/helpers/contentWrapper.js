import styled from "styled-components";

const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto;
  grid-auto-rows: minmax(25px, auto);
  background-color: white;
  border-radius: 25px;
  padding: 1em;
  width: auto;
  height: auto;
  min-height: 100%;
  margin-bottom: 1em;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export default ContentWrapper;
