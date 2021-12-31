import React from 'react';
import Pdf from "react-to-pdf";
import GridWrapperL from './twoSideBySideWrapper/gridWrapperL';
import GridWrapperR from './twoSideBySideWrapper/gridWrapperR';

const ref = React.createRef();

const PDF = (props) => {

  return (
    <GridWrapperR>
      <div className="Post" ref={ref}>
        {/* <h1>{props.title}</h1> */}
        {console.log(props.title)}
        <img src={props.image} alt={props.title} />
        {/* <p>{props.content}</p> */}
      </div>
      <Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </Pdf>
    </GridWrapperR>
  );
}

export default PDF;