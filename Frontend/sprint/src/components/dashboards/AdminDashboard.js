import React, { Fragment } from "react";
import GridWrapper from "../../helpers/gridWrapper";
import ContentWrapper from "../../helpers/contentWrapper";
import NavigationbarL1 from "../../components/sub/Navbar-L1";
import { NavigationbarAdminL2 } from "../../components/sub/Navbar-L2";
import { NavigationbarAdminL3 } from "../../components/sub/Navbar-L3";
import Sidebar from "../../components/sub/Sidebar";
import { getLocalStorage } from "../../helpers/localStorage";

const AdminDashboard = () => {
  let userDetails = getLocalStorage("employee");

  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarAdminL2 />
      <NavigationbarAdminL3 />
      <Sidebar />
      <div>AdminDashboard</div>
      <center>
        <ContentWrapper
          style={{
            marginTop: "10%",
            width: "60%",
            zIndex: "9",
            position: "relative",
          }}
        >
          <div className="float-container">
            <div className="float-child">
              <img
                src="/images/adminAvatar.png"
                style={{ width: "80%", height: "30%", borderRadius: "20%" }}
              />
            </div>
            <div className="float-child">
              <h3 style={{ textAlign: "left" }}>
                Hello, {userDetails.firstName ? userDetails.firstName : "N/A"}{" "}
                {userDetails.lastName ? userDetails.lastName : "N/A"}
              </h3>{" "}
              <br />
              <p style={{ textAlign: "left" }}>
                I work as a{" "}
                {userDetails.occupation ? userDetails.occupation : "N/A"}{" "}
              </p>
              <hr
                style={{
                  color: "#000000",
                  backgroundColor: "#000000",
                  height: 0.5,
                  borderColor: "#000000",
                }}
              />
              <p
                style={{
                  textAlign: "left",
                  fontSize: "0.9em",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                Email :<br></br> <br></br>
                Phone :<br></br>
                <br></br>
                Postal Code :<br></br>
                <br></br>
                Address :<br></br>
                <br></br>
              </p>
            </div>
            <div className="float-childR" style={{ marginTop: "-14em" }}>
              <p
                style={{
                  textAlign: "right",
                  fontSize: "0.9em",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {userDetails.email ? userDetails.email : "N/A"}
                <br></br> <br></br>
                {userDetails.mobilePhone ? userDetails.mobilePhone : "N/A"}
                <br></br>
                <br></br>
                {userDetails.postcode ? userDetails.postcode : "N/A"}
                <br></br>
                <br></br>
                {userDetails.AddressNum ? userDetails.AddressNum : "N/A"}
                <br></br>{" "}
                {userDetails.AddressLineOne
                  ? userDetails.AddressLineOne
                  : "N/A"}
                <br></br>
                {userDetails.AddressLineTwo
                  ? userDetails.AddressLineTwo
                  : "N/A"}
                <br></br>
                <br></br>
                <br></br>
              </p>
            </div>
          </div>
        </ContentWrapper>
      </center>
    </Fragment>
  );
};
export default AdminDashboard;
