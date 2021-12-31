import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/AllProjectsCard.css";

const ClientProjectsCard = ({ projects }) => {
  return (
    <div className="col-md-4 my-3">
      <Link to={`/client/ClientProjects/${projects._id}`}>
        <div className="card h-100">
          <h5 className="cardTitle">{projects.projectName}</h5>
          <div className="row">
            <div className="col-4 ">
              <img
                src={
                  projects.clientCompanyName
                    ? projects.clientCompanyName.companyLogo
                    : "/../../../Backend/uploads/521744286221.jpg"
                }
                alt=""
                className="card_img img-fluid"
              />
            </div>
            <div className="col-8">
              <div className="card_text">
                <div className="cardtextBold">
                  Key :{" "}
                  <div className="d-inline cardtextNormal">
                    {projects.projectKey}
                  </div>
                </div>
                <div className="cardtextBold">
                  Company :{" "}
                  <div className="d-inline cardtextNormal">
                    {projects.clientCompanyName
                      ? projects.clientCompanyName.companyName
                      : "N/A"}
                  </div>
                </div>
                <div className="cardtextBold">
                  Lead :{" "}
                  <div className="d-inline cardtextNormal">
                    {projects.lead.firstName ? projects.lead.firstName : "N/A"} { " "} {projects.lead.lastName ? projects.lead.lastName : "N/A"} 
                  </div>
                </div>
                <div className="cardtextBold">
                  Category :{" "}
                  <div className="d-inline cardtextNormal">
                    {projects.projectCategory}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClientProjectsCard;
