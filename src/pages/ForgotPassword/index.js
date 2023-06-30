import { useState } from "react";
import * as yup from "yup";
import api from "axiosConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPassword = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
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
      const response = await api.post("/api/users/forgotpassword", data);
      if (response) setIsValidEmail(true);
    } catch (error) {
      setError("catch", error.response.data);
    }
  };

  return (
    <>
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
            />
            <p className="text-danger">{errors.email?.message}</p>
          </div>
        </div>
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
