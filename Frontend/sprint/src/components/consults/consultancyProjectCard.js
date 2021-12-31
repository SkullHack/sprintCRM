import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Row, Col } from "react-bootstrap";
import {getLocalStorage} from "../../helpers/localStorage";
import "../stylesheets/consults.css";

 export const consultancyProjectCard = ({consultancyProject}) => {
    let userDetails = (getLocalStorage("employee"))

    //  const findurl  = (access) => {
    //      if(access  === 1){
    //          return '/consults';
    //      }else{
    //         return `/consults/${consultancyProject._id}`;
    //      }
    //  }
    return(
        

        <div className="card-3d-wrap mx-auto">
			<div className="card-3d-wrapper">
                <Link to= {`/consults/${consultancyProject._id}`}>

					<div className="card-front">
						<div className="pricing-wrap">
                            <div className="card-project-title">
                                {consultancyProject.consultTitle}
                            </div>
                            <div className="clientEmplo-card">
                                <PersonIcon></PersonIcon>
                                {" "+consultancyProject.clientName.clientFirstName  + " " +consultancyProject.clientName.clientLastName }
                            </div>
                            <div className="clientEmplo-card">
                                <AssignmentIndIcon></AssignmentIndIcon>
                                {" "+consultancyProject.employeeName.firstName + " " + consultancyProject.employeeName.lastName}
                            </div>
			      		</div>

                        <Row className="bottom-date">
                            <Col className="newCol">
                                {" "+consultancyProject.startDate} 
                            </Col>
                            <Col >
                                {" "+consultancyProject.endDate}
                            </Col>
                        </Row>
			      	</div>
                </Link>

			</div>
		</div>

    )

 };

export default consultancyProjectCard;