import React, { Fragment } from "react";
import GridWrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";
import Gantt from "./Gantt";
import "../stylesheets/Gantt.css";

//navigation bar
import NavigationbarL1 from "../sub/Navbar-L1";
import { NavigationbarProjectsL2 } from "../sub/Navbar-L2";
import { NavigationbarProjectsL3 } from "../sub/Navbar-L3";
import Sidebar from "../sub/Sidebar";

const DesignProject = () => {
  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarProjectsL2 />
      <NavigationbarProjectsL3 />
      <Sidebar />
      <GridWrapper>
        <ContentWrapper>
          <div>
            <div>
              <div className="gantt-container">
                <Gantt />
              </div>
            </div>
          </div>
        </ContentWrapper>
      </GridWrapper>
    </Fragment>
  );
};

export default DesignProject;
