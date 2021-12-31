import React, { Fragment, useState, useEffect } from "react";
import GridWrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";
import "../stylesheets/CreateProject.css";
import isEmpty from "validator/lib/isEmpty";
import { createNewProject } from "../../api/project";
import { showErrorMsg } from "../../helpers/message";
import { showSuccessMsg } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { useDispatch } from "react-redux";
import { postConversation } from "../../api/consult";
import { getConversations } from "../../api/sprintchat";
import equals from "validator/lib/equals";

import { useSelector } from "react-redux";
//getting client information
import { getCompanies } from "../../api/client";
import { getClients } from "../../api/client";
import { getProjectManagers } from "../../api/auth";

//navigation bar
import NavigationbarL1 from "../sub/Navbar-L1";
import { NavigationbarProjectsL2 } from "../sub/Navbar-L2";
import { NavigationbarProjectsL3 } from "../sub/Navbar-L3";
import Sidebar from "../sub/Sidebar";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectKey: "",
    projectType: "",
    projectCategory: "",
    clientCompanyName: "",
    lead: "",
    clientID: "",
    errorMsg: false,
    successMsg: false,
    loadingSpinner: false,
  });

  // destructure form data
  const {
    projectName,
    projectKey,
    projectType,
    projectCategory,
    clientCompanyName,
    lead,
    clientID,
    errorMsg,
    successMsg,
    loadingSpinner,
  } = formData;

  const [companies, setCompanies] = useState(null);
  const [companyLoading] = useState(false);

  const [clients, setClients] = useState(null);
  const [clientsLoading] = useState(false);

  const [leads, setLead] = useState(null);
  const [leadLoading] = useState(false);

  /****************************
   * Event handlers
   ****************************/
  const dispatch = useDispatch();
  useEffect(() => {
    loadCompanies();
  }, [companyLoading]);

  useEffect(() => {
    loadClients();
  }, [clientsLoading]);

  useEffect(() => {
    loadLeads();
  }, [leadLoading]);

  const loadCompanies = async () => {
    await getCompanies()
      .then((response) => {
        setCompanies(response.data.companies);
        console.log(companies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const loadClients = async () => {
    await getClients()
      .then((response) => {
        setClients(response.data.clients);
        console.log(clients);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadLeads = async () => {
    await getProjectManagers()
      .then((response) => {
        setLead(response.data.employeePM);
        console.log(leads);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let conversations = null;
  let convoExist = false;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //form validation
    if (
      isEmpty(projectName) ||
      isEmpty(projectKey) ||
      isEmpty(projectType) ||
      isEmpty(projectCategory) ||
      isEmpty(clientCompanyName) ||
      isEmpty(lead) ||
      isEmpty(clientID)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All field are Required",
      });
    } else {
      const {
        projectName,
        projectKey,
        projectType,
        projectCategory,
        clientCompanyName,
        lead,
        clientID,
      } = formData;
      const data = {
        projectName,
        projectKey,
        projectType,
        projectCategory,
        lead,
        clientID,
        clientCompanyName,
      };
      setFormData({
        ...formData,
        loadingSpinner: true,
        successMsg: "Project Creation Success!",
      });

      createNewProject(data)
        .then((response) => {
          console.log(response);
          setFormData({
            projectName: "",
            projectKey: "",
            projectType: "",
            projectCategory: "",
            clientCompanyName: "",
            lead: "",
            clientID: "",
            successMsg: response.data.successMsg,
            loadingSpinner: false,
          });
          getConversations(formData.lead).then((response) => {
            conversations = response.data;
            for (let i = 0; i < conversations.length; i++) {
              for (let j = 0; j < 2; j++) {
                if (equals(conversations[i].members[j], formData.clientID)) {
                  convoExist = true;
                }
              }
            }
            if (convoExist === false) {
              postConversation({
                senderId: formData.lead,
                receiverId: formData.clientID,
              })
                .then((response) => {})
                .catch((err) => {});
            }
          });
        })
        .catch((err) => {
          console.log("Project creation Error : ", err);
          setFormData({
            ...formData,
            loadingSpinner: false,
            errorMsg: err.response.data.errorMsg,
          });
        });
    }
  };

  /****************************
   * View
   ****************************/
  const showCreateProjectForm = () => (
    <Fragment>
      <div className="my-2">
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control form_input"
                      onChange={handleChange}
                      value={projectName}
                      name="projectName"
                      placeholder="Project Name"
                    />
                  </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form_input"
                      onChange={handleChange}
                      value={projectKey}
                      name="projectKey"
                      placeholder="Key"
                    />
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form_input"
                      onChange={handleChange}
                      value={projectType}
                      name="projectType"
                      placeholder="Type"
                    />
                  </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-6">
                  <input
                    className="form-control form_input"
                    list="datalistOptions"
                    onChange={handleChange}
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
                <div className="col-6">
                  <div className="pt-3">
                    <select
                      className="form-control form_input"
                      name="clientCompanyName"
                      onChange={handleChange}
                    >
                      <option value="">Company</option>
                      {companies &&
                        companies.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.companyName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-3"></div>

                <div className="col-3"></div>
                <div className="col-6">
                  <div className="pt-3">
                    <select
                      className="form-control form_input"
                      name="clientID"
                      onChange={handleChange}
                    >
                      <option value="">Client</option>
                      {clients &&
                        clients.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.clientFirstName} {c.clientLastName} {" | "}{" "}
                            {c.clientEmail}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-3"></div>

                <div className="col-3"></div>
                <div className="col-6">
                  <div className="pt-3">
                    <select
                      className="form-control form_input"
                      name="lead"
                      onChange={handleChange}
                    >
                      <option value="">Lead</option>
                      {leads &&
                        leads.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.firstName} {c.lastName} {" | "} {c.email}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-3 my-5">
                  <button type="submit" className="btn btn-primary">
                    Create Project
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );

  /****************************
   * Render
   ****************************/
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
              {/* row 1 */}
              <div className="col-3"></div>
              <div className="col-6">
                <div className="display-6">Create a new project.</div>
              </div>
              <div className="col-3"></div>
              {/* row 2 */}
              <div className="col-3"></div>
              <div className="col-6 mt-4">
                {errorMsg && showErrorMsg(errorMsg)}
                {successMsg && showSuccessMsg(successMsg)}
              </div>
              <div className="col-3"></div>
            </div>

            {loadingSpinner && (
              <div className="text-center pb-4 mt-2">{showLoading()}</div>
            )}
            {showCreateProjectForm()}
          </div>
        </ContentWrapper>
      </GridWrapper>
    </Fragment>
  );
};

export default CreateProject;
