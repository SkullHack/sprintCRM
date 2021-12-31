import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetails } from "../../redux/actions/projectAction";
import axios from "axios";
import Swal from "sweetalert2";
import isEmpty from "validator/lib/isEmpty";

import NavigationbarL1 from "../sub/Navbar-L1";
import { NavigationbarProjectsL2 } from "../sub/Navbar-L2";
import { NavigationbarProjectsL3 } from "../sub/Navbar-L3";
import Sidebar from "../sub/Sidebar";
import GridWrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";

const UpdateProject = ({ match, history }) => {
  const projectID = match.params.id;

  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.projectDetails);

  const [projectName, setProjectName] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectCategory, setProjectCategory] = useState("");

  useEffect(() => {
    if (!project) {
      dispatch(getProjectDetails(projectID));
    } else {
      setProjectName(project.projectName);
      setProjectKey(project.projectKey);
      setProjectType(project.projectType);
      setProjectCategory(project.projectCategory);
    }
  }, [dispatch, projectID, project]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(projectName) || isEmpty(projectKey) || isEmpty(projectType)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "PLEASE FILL ALL THE FIELDS!",
        customClass: "swal-wide",
      });
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        projectName: projectName,
        projectKey: projectKey,
        projectType: projectType,
        projectCategory: projectCategory,
      });

      await axios
        .put(`http://localhost:5000/api/projects/${projectID}`, body, config)
        .then((res) => {
          history.push(`/project/${projectID}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarProjectsL2 />
      <NavigationbarProjectsL3 />
      <Sidebar />
      <GridWrapper>
        <ContentWrapper>
          <Fragment>
            <div className="my-2">
              <div className="row">
                <div className="col-12">
                  <form onSubmit={handleOnSubmit} noValidate>
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6">
                        <div className="text-secondary">Project Name</div>
                        <div className="form-group ">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setProjectName(e.target.value)}
                            value={projectName}
                            name="projectName"
                            placeholder="Project Name"
                          />
                        </div>
                      </div>
                      <div className="col-3"></div>
                      <div className="col-3"></div>
                      <div className="col-3">
                        <div className="text-secondary">Project Key</div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setProjectKey(e.target.value)}
                            value={projectKey}
                            name="projectKey"
                            placeholder="Key"
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="text-secondary">Project Type</div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setProjectType(e.target.value)}
                            value={projectType}
                            name="projectType"
                            placeholder="Type"
                          />
                        </div>
                      </div>
                      <div className="col-3"></div>
                      <div className="col-3"></div>
                      <div className="col-6">
                        <div className="text-secondary">Project Category</div>
                        <input
                          className="form-control "
                          list="datalistOptions"
                          onChange={(e) => setProjectCategory(e.target.value)}
                          value={projectCategory}
                          name="projectCategory"
                          placeholder="Category"
                        />
                        <datalist id="datalistOptions">
                          <option value="Web App" />
                          <option value="Mobile App" />
                          <option value="Website" />
                          <option value="Windows Application" />
                          <option value="QA" />
                        </datalist>
                      </div>
                      <div className="col-3"></div>

                      <div className="col-3"></div>
                      <div className="col-3 my-5">
                        <button type="submit" className="btn btn-warning">
                          Update Project
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Fragment>
        </ContentWrapper>
      </GridWrapper>
    </Fragment>
  );
};

export default UpdateProject;
