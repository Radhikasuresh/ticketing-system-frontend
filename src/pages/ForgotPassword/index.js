import { useState } from "react";
import * as yup from "yup";
import api from "axiosConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .test(
      "isRequired",
      "Password must be at least 8 Character",
      function (value) {
        if (!value) return true;
        if (value) {
          return value.length >= 8 && value.length <= 32;
        }
      }
    ),
  otp: yup
    .string()
    .test("isRequired", "OTP should be 6 characters", function (value) {
      if (!value) return true;
      if (value) {
        return value.length === 6;
      }
    }),
});

const ForgotPassword = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      if (isValidEmail) {
        setLoading(true);
        const response = await api.post("/api/users/resetpassword", {
          email: data.email,
          password: data.password,
          otp: data.otp,
        });
        setLoading(false);
        if (response) navigate("/queries");
      } else {
        setLoading(true);

        const response = await api.post("/api/users/forgotpassword", {
          email: data.email,
        });
        setLoading(false);

        if (response) setIsValidEmail(true);
      }
    } catch (error) {
      setError("catch", error.response.data);
    }
  };

  return (
    <>
      {isLoading && <h3>Loading...</h3>}
      <form
        class="col-md-6 mt-2"
        autocomplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div class="form-group mt-2">
          <label for="email" class="label-style mb-0">
            Enter Registered Email
          </label>
          <div>
            <input
              {...register("email")}
              class="formInputs"
              name="email"
              placeholder="Eg: John@abc.com"
              type="email"
              disabled={isValidEmail}
            />
            <p className="text-danger">{errors.email?.message}</p>
          </div>
        </div>
        {isValidEmail ? (
          <>
            <div class="form-group mt-2">
              <label for="password" class="label-style mb-0">
                Enter New Password
              </label>
              <div>
                <input
                  {...register("password")}
                  class="formInputs"
                  name="password"
                  type="password"
                />
                <p className="text-danger">{errors.password?.message}</p>
              </div>
            </div>
            <div class="form-group mt-2">
              <label for="otp" class="label-style mb-0">
                Enter OTP
              </label>
              <div>
                <input
                  {...register("otp")}
                  class="formInputs"
                  name="otp"
                  type="text"
                />
                <p className="text-danger">{errors.otp?.message}</p>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <button
          type="submit"
          class="col-md-12 btn btn-lg btn-block login-btn mt-4 mb-4"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ForgotPassword;
