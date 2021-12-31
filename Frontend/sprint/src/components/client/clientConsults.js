import React, { Fragment,useEffect, useState } from "react";
import { ClientSidebar } from "../../components/sub/Sidebar";
import NavBar_client from "../sub/NavBar_client";
import { NavigationbarClientConsultsL2 } from "../../components/sub/Navbar-L2";
import { NavigationbarClientL3 } from "../../components/sub/Navbar-L3";
import "../stylesheets/clientConsults.css";
import { Row, Col } from "react-bootstrap";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { getRelatedclientConsults } from "../../redux/actions/consultAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GlassLoading from '@material-ui/icons/HourglassEmpty';
import { showErrorMsg } from "../../helpers/message"
import SearchConcultsIcon from '@material-ui/icons/Search';
import {getLocalStorage} from "../../helpers/localStorage";

const ClientConsults = () => {

  let clientDetails = (getLocalStorage("client"));

  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getRelatedclientConsults(clientDetails._id));
  }, [dispatch]);

  const { consult } = useSelector(state => state.consult);

    /*********************************************
   * TO SEARCH AND FILTER CONSULTANCY PROJECTS *
   *********************************************/
     const[search, setSearch] = useState("");
     const [consultancyProjectErrorMsg, setConsultancyProjectErrorMsg] = useState("No Consultancy Projects Found");
   
     const filteredConsultancyProjects = consult.filter(consult=>{
       return consult.consultTitle.toLowerCase().includes(search.toLowerCase())
     })


  return (
    <Fragment>
    <NavBar_client />
    <NavigationbarClientConsultsL2 />
    <NavigationbarClientL3 />
    <ClientSidebar />

    
        
    <div className="client-consult-main">
      {/* <div className="client-consult-submain"> */}
      <div className="input-group "> 
            <input 
              type="text" 
              placeholder="Search " 
              className="form-control client-consults-searchConsults "
              onChange={e => setSearch(e.target.value)}>
            </input>
            <div className="input-group-text client-consults-newSearch"><SearchConcultsIcon></SearchConcultsIcon></div>
          </div>

          {filteredConsultancyProjects?.length >0?
              <Row>
                {filteredConsultancyProjects.map(consults =>(
                  <div className="client-consult-card-3d-wrap " key={consults._id}>
                  <div className="client-consult-card-3d-wrapper"> 
                  <Link to={`/client/ClientConsults/${consults._id}`}>
                     <div className="client-consult-card-front ">
                           <div className="client-consult-pricing-wrap">
                                 <div className="client-consult-card-project-title">
                                     {consults.consultTitle}
                                 </div>
                                 <div className="client-consult-clientEmplo-card" >
                                     <AssignmentIndIcon fontSize="medium" color="black"></AssignmentIndIcon>
                                     {consults.employeeName.firstName  + " " + consults.employeeName.lastName}
                                     </div>
                                     <div className="client-consult-date" >
                                     <GlassLoading fontSize="small" color="black"></GlassLoading>
                                       <span className="client-consult-date-abjust">{new Date(consults.startDate).toLocaleString('en-us', { month: 'short' }) + " "}{new Date(consults.startDate).getDay()}</span> -
                                       <span className="client-consult-date-abjust"> {new Date(consults.endDate).toLocaleString('en-us', { month: 'short' }) + " "}{new Date(consults.endDate).getDay()}</span>
                                     </div>
                               </div>
                                 
                             </div>
         
         
                             </Link>
                             
                    </div>
             </div> 
                ))}
              </Row>
              : showErrorMsg(consultancyProjectErrorMsg)
            }
    </div>
    
    
  </Fragment>
  

  );
};

export default ClientConsults;
