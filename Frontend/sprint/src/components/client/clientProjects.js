import React , { Fragment, useEffect, useState } from "react";
import { ClientSidebar } from "../../components/sub/Sidebar";
import NavBar_client from "../sub/NavBar_client";
import { NavigationbarClientProjectsL2 } from "../sub/Navbar-L2";
import { NavigationbarClientL3 } from "../sub/Navbar-L3";
import GridWrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificProjects } from "../../redux/actions/projectAction";
import ClientProjectsCard from "../cards/ClientProjectsCard";
import { Row, Container } from "react-bootstrap";
import SearchIcon from '@material-ui/icons/Search';
import { showErrorMsg } from "../../helpers/message"
import {getLocalStorage} from "../../helpers/localStorage";
import "../stylesheets/ClientProject.css";

const ClientProjects = () => {

  let clientDetails = (getLocalStorage("client"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpecificProjects(clientDetails._id));
  },[dispatch]);

  const { projects } = useSelector(state => state.projects);

  const[search, setSearch] = useState("");
  const [clientProjectErrorMsg, setClientProjectErrorMsg] = useState("No Projects Found");

  const filteredClientProjects = projects.filter(clienProject=>{
    return clienProject.projectName.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <Fragment>
      
      {/* display clickable project cards here */}
      <NavBar_client />
      <NavigationbarClientProjectsL2 />
      <NavigationbarClientL3 />
      <ClientSidebar />

      <GridWrapper>
        <ContentWrapper>
        <div className="input-group"> 
            <input 
              type="text" 
              placeholder="Search " 
              className="form-control searchConsults "
              onChange={e => setSearch(e.target.value)}>
            </input>
            <div className="input-group-text newSearch"><SearchIcon></SearchIcon></div>
          </div>
          {/* display clickable project cards here */}

          <Container className="scrolly">
            {filteredClientProjects?.length >0?
              <Row>
                {filteredClientProjects.map(p =>(
                  <ClientProjectsCard key={p._id} projects={p}></ClientProjectsCard>
                ))}
              </Row>
              : showErrorMsg(clientProjectErrorMsg)
            }
          </Container>

        </ContentWrapper>
      </GridWrapper>
    </Fragment>
      
    
      );
};

export default ClientProjects;
