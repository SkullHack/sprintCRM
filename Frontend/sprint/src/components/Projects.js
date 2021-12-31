import React, { useEffect, useState, Fragment } from "react";
import GridWrapper from "../helpers/gridWrapper";
import ContentWrapper from "../helpers/contentWrapper";
import { useDispatch } from "react-redux";
import { getProjects } from "../redux/actions/projectAction";
import SearchIcon from "@material-ui/icons/Search";
import "../components/stylesheets/AllProjectsCard.css";
import { useSelector } from "react-redux";
import AllProjectsCard from "./cards/AllProjectsCard";

import NavigationbarL1 from "./sub/Navbar-L1";
import { NavigationbarProjectsL2 } from "./sub/Navbar-L2";
import { NavigationbarProjectsL3 } from "./sub/Navbar-L3";
import Sidebar from "./sub/Sidebar";

const Projects = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const { projects } = useSelector((state) => state.projects);
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) => {
    return project.projectName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarProjectsL2 />
      <NavigationbarProjectsL3 />
      <Sidebar />
      <GridWrapper>
        <ContentWrapper>
          <div>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <form>
                  <div className="input-group">
                    <input
                      type="text"
                      id="search_project"
                      className="form-control Input_text"
                      placeholder="Project Name"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="input-group-append ">
                      <button
                        id="search_project_btn"
                        className="btn"
                        style={{ zIndex: 0 }}
                      >
                        {" "}
                        <div>
                          <i>
                            <SearchIcon />
                          </i>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </ContentWrapper>
        <div className="cardView">
          <div className="container-fluid">
            <div className="row">
              {filteredProjects?.length > 0 ? (
                <div className="card-deck">
                  {filteredProjects.map((projects) => (
                    <AllProjectsCard
                      key={projects._id}
                      projects={projects}
                    ></AllProjectsCard>
                  ))}
                </div>
              ) : (
                <div>
                  {" "}
                  <i>No Projects Found.</i>{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </GridWrapper>
    </Fragment>
  );
};

export default Projects;
