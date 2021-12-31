import React from "react";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import GroupIcon from "@material-ui/icons/Group";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import ChatIcon from "@material-ui/icons/Chat";

export const SidebarData = [
  {
    icon: <GroupIcon />,
    link: "/contacts",
    title: "Contacts",
    //activeBar: <div className="activeBar"></div>,
  },
  {
    icon: <AccountTreeIcon />,
    link: "/projects",
    title: "Projects",
  },
  {
    icon: <CastForEducationIcon />,
    link: "/consults",
    title: "Consult",
  },
  {
    icon: <AssessmentIcon />,
    link: "/statistics",
    title: "Reports",
  },
  {
    icon: <ConfirmationNumberIcon />,
    link: "/tickets",
    title: "Tickets",
  },
  {
    icon: <ChatIcon />,
    link: "/sprintChat",
    title: "Sprint Chat",
  },
];

export const SidebarDataClient = [
  {
    icon: <AccountTreeIcon />,
    link: "/client/ClientProjects",
    title: "Projects",
  },
  {
    icon: <CastForEducationIcon />,
    link: "/client/ClientConsults",
    title: "Consult",
  },

  {
    icon: <ConfirmationNumberIcon />,
    link: "/client/ClientTickets",
    title: "Tickets",
  },
];
