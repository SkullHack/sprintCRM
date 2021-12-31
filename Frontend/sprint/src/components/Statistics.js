import React, { Fragment } from "react";
import GridWrapper from "../helpers/gridWrapper";
import Charts from "./chart";
import { useReactToPrint } from "react-to-print";
import ChartTicket from "./chartTicket";
import "./stylesheets/report.css";
import logo from "../images/logo.png";
import NavigationbarL1 from "./sub/Navbar-L1";
import { NavigationbarStatisticsL2 } from "./sub/Navbar-L2";
import { NavigationbarStatisticsL3 } from "./sub/Navbar-L3";
import Sidebar from "./sub/Sidebar";

class ComponentToPrint extends React.Component {
  render() {
    return (
      //Designing the pdf and its content

      <div className="onlyPrint">
        <img src={logo} className="statLogo" />

        <center>
          <p className="statTitle">Summary report </p>
        </center>
        <div style={{ marginLeft: "5%", marginRight: "5%", marginTop: "5%" }}>
          <p style={{ fontSize: "0.8em", fontWeight: "bold" }}>
            {" "}
            Project and Stages Summary{" "}
          </p>
          <Charts />
          <br />
          <br />
          <p style={{ fontSize: "0.8em", fontWeight: "bold" }}>
            {" "}
            Tickets Summary
          </p>
          <ChartTicket />
        </div>
      </div>
    );
  }
}
const Statistics = () => {
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarStatisticsL2 />
      <NavigationbarStatisticsL3 />
      <Sidebar />
      <GridWrapper>
        <div style={{ float: "right" }}>
          <button
            style={{
              position: "absolute",
              background: "linear-gradient(to right, #0467e9, #009ffd)",
              borderRadius: "20px",
              padding: "3px",
              color: "white",
              width: "10em",
              float: "right",
              border: "none",
            }}
            onClick={() => {
              handlePrint();
            }}
          >
            Capture as PDF
          </button>
        </div>

        <div ref={componentRef}>
          <ComponentToPrint ref={componentRef} />
        </div>

        <div>
          <center>
            <div>
              <Charts />
            </div>
          </center>

          <ChartTicket />
        </div>
      </GridWrapper>
    </Fragment>
  );
};
const rootElement = document.getElementById("root");

export default Statistics;
