import React from "react";
import "./Auth.css";
import { logo } from "./logo";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="container-custom mr-0 pr-0">
        <div className="row m-0">
          <div className="col-sm-8">
            <div className="row">
              <img src={logo} alt="" className="logo" />
            </div>
            <div className="row">
              <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
                {children}
              </div>
            </div>
          </div>
          <div className="col-sm-4 text-right pr-0 img-class-div">
            <img
              src="https://www.zenclass.in/static/media/login_img.cbed4040.png"
              className="img-class"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
