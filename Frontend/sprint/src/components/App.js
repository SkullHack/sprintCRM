import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Sidebar from "./sub/Sidebar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import { Fragment } from "react";
import AdminDashboard from "./dashboards/AdminDashboard";
import EmployeeDashboard from "./dashboards/EmployeeDashboard";

import AdminRoute from "./dashboards/AdminRoute";
import EmployeeRoute from "./dashboards/EmployeeRoute";
import ClientRoute from "./dashboards/ClientRoute";

import Contacts from "./Contacts";
import createContact from "./contacts/createContact";

import Projects from "./Projects";
import createProject from "./projects/createProject";
import designProject from "./projects/designProject";
import Detailproject from "./projects/detailProject";
import UpdateProject from "./projects/updateProject";

import Consults from "./Consults";
import createConsult from "./consults/createConsult";
import consultDetails from "./consults/ConsultDetails";

import Statistics from "./Statistics";

import Tickets from "./Tickets";
import createTicket from "./tickets/createTickets";
import myTickets from "./tickets/myTickets";

import SprintChat from "./SprintChat";

// client
import ClientConsults from "./client/clientConsults";
import ClientConsultsDetails from "./client/clientConsultDetails";
import ClientDashboard from "./client/clientDashboard";
import ClientLogin from "./client/clientLogin";
import ClientTickets from "./client/clientTickets";
import CreateClientTicket from "./client/createClientTicket";
import ClientProjects from "./client/clientProjects";
import ClientProjectDetail from "./client/clientProjectDetail";

const App = () => (
  <Fragment>
    <div className="App">
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />

            {/* Dashboard Routes */}
            <AdminRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />

            <EmployeeRoute
              exact
              path="/employee/dashboard"
              component={EmployeeDashboard}
            />

            <AdminRoute exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {/* Contacts Routes */}
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/createContact" component={createContact} />

            {/* Projects Routes */}
            <Route path="/projects" component={Projects} />
            <Route exact path="/createProject" component={createProject} />
            <Route exact path="/designProject" component={designProject} />
            <Route exact path="/project/:id" component={Detailproject} />
            <Route exact path="/project/edit/:id" component={UpdateProject} />

            {/* Consults Routes */}
            <Route exact path="/consults" component={Consults} />

            <Route exact path="/createConsult" component={createConsult} />
            <Route path="/consults/:id" component={consultDetails} />

            {/* Tickets Routes */}
            <Route exact path="/tickets" component={Tickets} />
            <Route exact path="/createTicket" component={createTicket} />
            <Route exact path="/myTickets" component={myTickets} />

            {/* Statistics Routes */}
            <Route exact path="/statistics" component={Statistics} />

            {/* sprintChat Routes */}
            <Route exact path="/sprintChat" component={SprintChat} />

            {/* Clients Routes */}
            <ClientRoute
              exact
              path="/client/ClientProjects"
              component={ClientProjects}
            />
            <ClientRoute
              exact
              path="/client/ClientProjects/:id"
              component={ClientProjectDetail}
            />
            <ClientRoute
              exact
              path="/client/ClientTickets"
              component={ClientTickets}
            />

            <ClientRoute
              exact
              path="/client/ClientTickets/create"
              component={CreateClientTicket}
            />
            <Route exact path="/client/ClientLogin" component={ClientLogin} />
            <ClientRoute
              exact
              path="/client/ClientDashboard"
              component={ClientDashboard}
            />
            <ClientRoute
              exact
              path="/client/ClientConsults"
              component={ClientConsults}
            />
            <ClientRoute
              exact
              path="/client/ClientConsults/:id"
              component={ClientConsultsDetails}
            />

            <Route component={NotFound} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  </Fragment>
);

export default App;
