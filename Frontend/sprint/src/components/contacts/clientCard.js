import React from "react";
import Card from "react-bootstrap/Card";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { isAuthenticated } from "../../helpers/auth";

export const clientCard = ({
  client,
  passfunction,
  updatepassFunction,
  deletepassFunction,
}) => {
  return (
    <Card className="employee-contacts-text-bolder text-center employee-contacts-card-mine">
      <Card.Header className="employee-contacts-cardBG" onClick={passfunction}>
        {client.clientFirstName} {client.clientLastName}
      </Card.Header>
      <Card.Body className="employee-contacts-cursor" onClick={passfunction}>
        <Card.Text>
          {client.clientContactNumber}
          <br></br>
          {client.clientEmail}
          <br></br>
          {client.clientJob}
        </Card.Text>
      </Card.Body>
      {isAuthenticated() && isAuthenticated().accessLevel === 1 && (
        <Card.Footer className="employee-contacts-cardBG">
          <button
            className="employee-contacts-btn employee-contacts-ClientEditBtn"
            onClick={deletepassFunction}
          >
            <DeleteOutlineIcon></DeleteOutlineIcon>
          </button>
          <button
            className="employee-contacts-btn employee-contacts-ClientDeleteBtn"
            onClick={updatepassFunction}
          >
            <EditOutlinedIcon></EditOutlinedIcon>
          </button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default clientCard;
