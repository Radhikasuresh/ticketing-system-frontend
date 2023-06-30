import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./createQuery.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "axiosConfig";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  category: yup.string().required(),
  selectLanguage: yup.string().required(),
  title: yup.string().min(5).max(50).required(),
  description: yup.string().min(20).max(200).required(),
  availableFrom: yup
    .string()
    .test("not empty", "From time greater than 09:00 AM", function (value) {
      const timeString = value;
      const [hours, minutes] = timeString.split(":");
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
      const minMinutes = 9 * 60;
      const maxMinutes = 19 * 60;
      if (totalMinutes >= minMinutes && totalMinutes <= maxMinutes) return true;
    }),
  availableTo: yup
    .string()
    .test("not empty", "To time lesser than 07:00 PM", function (value) {
      const timeString = value;
      const [hours, minutes] = timeString.split(":");
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
      const minMinutes = 9 * 60;
      const maxMinutes = 19 * 60;
      if (totalMinutes >= minMinutes && totalMinutes <= maxMinutes) return true;
    }),
});

const CreateQuery = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      const response = await api.post("/api/tickets/", data, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Replace `token` with your actual token variable
        },
      });
      if (response) {
        reset();
        navigate("/dashboard");
      }
    } catch (error) {
      setError("catch", error.response.data);
    }
  };

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
              <form
                className="d-flex justify-content-center flex-column mt-2"
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                <div className="containerLabel">Topic</div>
                <div className="inputContainer">
                  <label htmlFor="category" className="label-style mb-0">
                    Category
                  </label>
                  <div>
                    <select
                      {...register("category")}
                      className="formInputs"
                      name="category"
                    >
                      <option label="--- Select Category---"></option>
                      <option
                        value="Zen-Class Doubt"
                        index="0"
                        label="Zen-Class Doubt"
                      ></option>
                      <option
                        value="Placement Related"
                        index="1"
                        label="Placement Related"
                      ></option>
                      <option
                        value="Coordination Related"
                        index="2"
                        label="Coordination Related"
                      ></option>
                      <option
                        value="Pre-Bootcamp Related"
                        index="3"
                        label="Pre-Bootcamp Related"
                      ></option>
                    </select>
                    <p className="text-danger">{errors.category?.message}</p>
                  </div>
                  <label htmlFor="language" className="label-style mb-0">
                    Prefered Voice Communication Language
                  </label>
                  <div>
                    <select
                      className="formInputs"
                      name="language"
                      {...register("selectLanguage")}
                    >
                      <option label="--- Select Language---"></option>
                      <option
                        value="English"
                        index="0"
                        label="English"
                      ></option>
                      <option value="Hindi" index="1" label="Hindi"></option>
                      <option value="Tamil" index="2" label="Tamil"></option>
                    </select>
                    <p className="text-danger">
                      {errors.selectLanguage?.message}
                    </p>
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
                      {...register("title")}
                      className="formInputs"
                      name="title"
                      placeholder="Enter the query title"
                      type="text"
                    />
                    <p className="text-danger">{errors.title?.message}</p>
                  </div>
                  <label htmlFor="description" className="label-style mb-0">
                    Query Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="formInputs"
                    rows="5"
                    name="description"
                    type="text"
                    placeholder="Enter the Description"
                  ></textarea>
                  <p className="text-danger">{errors.description?.message}</p>
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
                      {...register("availableFrom")}
                      className="formInputs"
                      type="time"
                      max="19:00"
                    />
                  </div>
                  <p className="text-danger">{errors.availableFrom?.message}</p>
                  <label htmlFor="endTime" className="label-style mb-0">
                    Till
                  </label>
                  <div>
                    <input
                      {...register("availableTo")}
                      className="formInputs"
                      type="time"
                      max="19:00"
                    />
                    <p className="text-danger">{errors.availableTo?.message}</p>
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
                  <button
                    type="reset"
                    className="btn cancel-btn"
                    onClick={reset}
                  >
                    Cancel
                  </button>
                  <div className="lastBtns">
                    <button type="submit" className="btn submit-btn">
                      Create
                    </button>
                  </div>
                </div>
                {errors?.catch?.message && (
                  <div className="alert alert-warning" role="alert">
                    <span>{errors?.catch?.message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuery;
