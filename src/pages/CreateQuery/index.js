import React from "react";
import { Link } from "react-router-dom";
import "./createQuery.css";

const CreateQuery = () => {
  return (
    <div className="Body_body__box__Y49P-">
      <div className="Body_body__wrapper__6cj6C">
        {/* button -> create query */}
        <div className="Navbar_navbar__container__3Q3Zl">
          <div className="sc-jTrPJq gFWlwy">
            <Link to="/dashboard">
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
        <div className="Body_body__content__1jKgz">
          <div className="fullContainer mt-4">
            <div className="baseContainer">
              <form className="d-flex justify-content-center flex-column mt-2">
                <div className="containerLabel">Topic</div>
                <div className="inputContainer">
                  <label htmlFor="category" className="label-style mb-0">
                    Category
                  </label>
                  <div>
                    <select className="formInputs" name="category">
                      <option label="--- Select Category---"></option>
                      <option
                        value="1"
                        index="0"
                        label="Zen-Class Doubt"
                      ></option>
                      <option
                        value="2"
                        index="1"
                        label="Placement Related"
                      ></option>
                      <option
                        value="3"
                        index="2"
                        label="Coordination Related"
                      ></option>
                      <option
                        value="4"
                        index="3"
                        label="Pre-Bootcamp Related"
                      ></option>
                    </select>
                  </div>
                  <label htmlFor="language" className="label-style mb-0">
                    Prefered Voice Communication Language
                  </label>
                  <div>
                    <select className="formInputs" name="language">
                      <option label="--- Select Language---"></option>
                      <option value="1" index="0" label="English"></option>
                      <option value="2" index="1" label="Hindi"></option>
                      <option value="3" index="2" label="Tamil"></option>
                    </select>
                  </div>
                </div>
                <div className="horizontal__rule"></div>
                {/* details */}
                <div className="containerLabel">Details</div>
                <div className="inputContainer">
                  <label htmlFor="title" className="label-style mb-0">
                    Query Title
                  </label>
                  <div>
                    <input
                      className="formInputs"
                      name="title"
                      placeholder="Enter the query title"
                      type="text"
                    />
                  </div>
                  <label htmlFor="description" className="label-style mb-0">
                    Query Description
                  </label>
                  <textarea
                    className="formInputs"
                    rows="5"
                    name="description"
                    type="text"
                    placeholder="Enter the Description"
                  ></textarea>
                  <div className="horizontal__rule"></div>
                </div>
                {/*  */}
                <div className="containerLabel">
                  Your available Time ? ( Ours : 9:00 AM - 7:00 PM )
                </div>
                <div className="inputContainer">
                  <label htmlFor="startTime" className="label-style mb-0">
                    From
                  </label>
                  <div>
                    <input
                      className="formInputs"
                      name="startTime"
                      type="time"
                      max="19:00"
                    />
                  </div>
                  <label htmlFor="endTime" className="label-style mb-0">
                    Till
                  </label>
                  <div>
                    <input
                      className="formInputs"
                      name="endTime"
                      type="time"
                      max="19:00"
                    />
                  </div>
                </div>
                <div className="horizontal__rule"></div>
                <div className="containerLabel">Attachments (Optional)</div>
                <div className="d-flex">
                  <div className="attachments__body">
                    <div type="file" className="add__attachment">
                      <img
                        src="https://www.zenclass.in/Icons/attachmentAdd.svg"
                        alt="add attachments"
                      />
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="d-flex justify-content-end">
                  <button type="reset" className="btn cancel-btn">
                    Cancel
                  </button>
                  <div className="lastBtns">
                    <button type="submit" className="btn submit-btn">
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuery;
