import React, { useEffect, useState, Fragment } from "react";
import ConsultancyProjectCard from "../components/consults/consultancyProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { getConsultancyProjects } from "../redux/actions/consultAction";
import { Container, Row } from "react-bootstrap";
import { showErrorMsg } from "../helpers/message";
import SearchIcon from "@material-ui/icons/Search";
import Gridwrapper from "../helpers/gridWrapper";
import ContentWrapper from "../helpers/contentWrapper";
import { getSpecificConsultations } from "../redux/actions/consultAction";
import { getLocalStorage } from "../helpers/localStorage";

import NavigationbarL1 from "./sub/Navbar-L1";
import { NavigationbarConsultsL2 } from "./sub/Navbar-L2";
import { NavigationbarConsultsL3 } from "./sub/Navbar-L3";
import Sidebar from "./sub/Sidebar";

const Consults = () => {
  /***********************************
   * TO GET ALL CONSULTANCY PROJECTS *
   ***********************************/

  let userDetails = getLocalStorage("employee");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConsultancyProjects());
  }, [dispatch]);

  const { consultancyProjects } = useSelector(
    (state) => state.consultancyProjects
  );

  /*********************************************
   * TO SEARCH AND FILTER CONSULTANCY PROJECTS *
   *********************************************/
  const [search, setSearch] = useState("");
  const [consultancyProjectErrorMsg, setConsultancyProjectErrorMsg] = useState(
    "No Consultancy Projects Found"
  );

  const filteredConsultancyProjects = consultancyProjects.filter(
    (consProject) => {
      return consProject.consultTitle
        .toLowerCase()
        .includes(search.toLowerCase());
    }
  );

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarConsultsL2 />
      <NavigationbarConsultsL3 />
      <Sidebar />
      <Gridwrapper>
        <ContentWrapper>
          <div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Search "
                className="form-control searchConsults "
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <div className="input-group-text newSearch">
                <SearchIcon></SearchIcon>
              </div>
            </div>

            
          </div>
        </ContentWrapper>
        <Container>
              {filteredConsultancyProjects?.length > 0 ? (
                <Row>
                  {filteredConsultancyProjects.map((consultancyProject) => (
                    <ConsultancyProjectCard
                      key={consultancyProject._id}
                      consultancyProject={consultancyProject}
                    />
                  ))}
                </Row>
              ) : (
                showErrorMsg(consultancyProjectErrorMsg)
              )}
            </Container>
      </Gridwrapper>
    </Fragment>
  );
};

export default Consults;
