import React from "react";
import { Link } from "react-router-dom";
const Query = () => {
  return (
    <div className="Body_body__box__Y49P-">
      <div className="Body_body__wrapper__6cj6C">
        {/* button -> create query */}
        <div className="Navbar_navbar__container__3Q3Zl">
          <div className="sc-jTrPJq gFWlwy">
            <Link to="/queries">
              <button className="NavButtons_add__button__q_2E5">
                <img
                  src="https://www.zenclass.in/Icons/backArrow.svg"
                  alt="add/plus"
                />
                Back
              </button>
            </Link>
          </div>
        </div>
        {/*  */}
        <div></div>
      </div>
    </div>
  );
};

export default Query;
