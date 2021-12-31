import styled from "styled-components";

const ProjectWrapper = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: auto;
  grid-auto-rows: minmax(25px, auto);
  background-color: white;
  padding: 1em;
  width: auto;
  height: auto;
  margin-bottom: 1em;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export default ProjectWrapper;
