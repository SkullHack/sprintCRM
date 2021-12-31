import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";
import isEmpty from "validator/lib/isEmpty";
import { registerUser } from "../api/auth";

import GridWrapper from "../helpers/gridWrapper";
import ContentWrapper from "../helpers/contentWrapper";

import NavigationbarL1 from "../components/sub/Navbar-L1";
import { NavigationbarAdminL2 } from "../components/sub/Navbar-L2";
import { NavigationbarAdminL3 } from "../components/sub/Navbar-L3";
import Sidebar from "../components/sub/Sidebar";

import "./stylesheets/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    successMsg: false,
    errorMsg: false,
    loadingSpinner: false,
  });

  // destructure form data
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    occupation,
    mobilePhone,
    AddressNum,
    AddressLineOne,
    AddressLineTwo,
    province,
    postcode,
    nic,
    successMsg,
    errorMsg,
    loadingSpinner,
  } = formData;

  /****************************
   * Event handlers
   ****************************/
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //form validation
    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword) ||
      isEmpty(occupation)
    ) {
      setFormData({
        ...formData,
        errorMsg: "Required fields should not be empty ",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid Email",
      });
    } else if (!equals(password, confirmPassword)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const {
        firstName,
        lastName,
        email,
        password,
        occupation,
        mobilePhone,
        AddressNum,
        AddressLineOne,
        AddressLineTwo,
        province,
        postcode,
        nic,
      } = formData;
      const data = {
        firstName,
        lastName,
        email,
        password,
        occupation,
        mobilePhone,
        AddressNum,
        AddressLineOne,
        AddressLineTwo,
        province,
        postcode,
        nic,
      };
      setFormData({
        ...formData,
        loadingSpinner: true,
      });

      registerUser(data)
        .then((response) => {
          console.log(response);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            occupation: "",
            mobilePhone: "",
            AddressNum: "",
            AddressLineOne: "",
            AddressLineTwo: "",
            province: "",
            postcode: "",
            nic: "",
            loadingSpinner: false,
            successMsg: response.data.successMsg,
          });
        })
        .catch((err) => {
          console.log("Register Error : ", err);
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

  const showRegisterForm = () => (
    <Fragment>
      <div className=" px-5">
        <h5 className="text-center pt-3 pb-2">Register Employee</h5>
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            {/* First Name */}
            <div className=" form-group col-md-12">
              <label className="  ">First Name*</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={firstName}
                placeholder="First Name"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            {/* Last Name */}
            <div className="form-group  col-md-12">
              <label className="  ">Last Name*</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={lastName}
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            {/* Email */}
            <div className=" form-group col-md-12">
              <label className="  ">Email*</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            {/* Password */}
            <div className=" form-group col-md-6">
              <label className="  ">Password*</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div className=" form-group col-md-6">
              <label className="  ">Confirm Password*</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            {/* Access Level */}
            <div className=" form-group col-md-12">
              <label className="  ">Employee Access Level*</label>
              <select
                className="form-control custom-select"
                name="occupation"
                onChange={handleChange}
                value={occupation}
              >
                <option value="Developer">Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Quality Assurance Engineer">
                  Quality Assurance Engineer
                </option>
                <option value="Project Manager">Project Manager</option>
                <option value="HOD">HOD</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="hr-tag my-4"></div>

          <div className="form-row">
            {/* Mobile Phone Number */}
            <div className=" form-group col-md-6">
              <label className="  ">Mobile Phone Number</label>
              <input
                type="number"
                className="form-control"
                name="mobilePhone"
                value={mobilePhone}
                placeholder="Mobile Phone Number"
                onChange={handleChange}
              />
            </div>

            {/* NIC */}
            <div className=" form-group col-md-6">
              <label className="  ">NIC Number</label>
              <input
                type="text"
                className="form-control"
                name="NIC"
                value={nic}
                placeholder="NIC Number"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            {/* Address Line Number */}
            <div className=" form-group col-md-4">
              <label className="  ">Address Line Number</label>
              <input
                type="text"
                className="form-control"
                name="AddressNum"
                value={AddressNum}
                placeholder="Address Line Number"
                onChange={handleChange}
              />
            </div>

            {/* Postal Code */}
            <div className=" form-group col-md-4">
              <label className="  ">Postal Code</label>
              <input
                type="number"
                className="form-control"
                name="postcode"
                value={postcode}
                placeholder="Postal Code"
                onChange={handleChange}
              />
            </div>

            {/* Province */}
            <div className=" form-group col-md-4">
              <label className="  ">Province</label>
              <input
                type="text"
                className="form-control"
                name="province"
                value={province}
                placeholder="Province"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            {/* Address Line One */}
            <div className=" form-group col-md-6">
              <label className="  ">Address Line One</label>
              <input
                type="text"
                className="form-control"
                name="AddressLineOne"
                value={AddressLineOne}
                placeholder="Address Line One"
                onChange={handleChange}
              />
            </div>

            {/* Address Line Two */}
            <div className=" form-group col-md-6">
              <label className="">Address Line two</label>
              <input
                type="text"
                className="form-control"
                name="AddressLineTwo"
                value={AddressLineTwo}
                placeholder="Address Line Two"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="  pt-3">
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Register Employee
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );

  /****************************
   * Render
   ****************************/
  return (
    <Fragment>
      <NavigationbarL1 />
      <NavigationbarAdminL2 />
      <NavigationbarAdminL3 />
      <Sidebar />
      <GridWrapper>
        <ContentWrapper>
          <div className="">
            <div className="container-fluid">
              <div className="row px-4">
                <div className="col-12 align-self-center">
                  {successMsg && showSuccessMsg(successMsg)}
                  {errorMsg && showErrorMsg(errorMsg)}
                  {loadingSpinner && (
                    <div className="text-center pb-5">{showLoading()}</div>
                  )}

                  {showRegisterForm()}
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </GridWrapper>
    </Fragment>
  );
};

export default Register;
