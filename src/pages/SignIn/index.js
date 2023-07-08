import { useEffect, useState } from "react";
import * as yup from "yup";
import api from "axiosConfig";
import { useForm } from "react-hook-form";
import { loginAction } from "store/actions";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const SignIn = () => {
  const linkStyle = {
    textDecoration: "none",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

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
    setLoading(true);
    try {
      const response = await api.post("/api/users/login", data);
      setLoading(false);

      dispatch(loginAction(response.data));
      reset();
    } catch (error) {
      setLoading(false);
      setError("catch", error.response.data);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/queries");
  }, [auth, navigate]);
  const [loading, setLoading] = useState(false);


  return (
    <>
      <div className="col-md-6">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="form-group mt-2">
            <label htmlFor="email" className="label-style mb-0">
              Email
            </label>
            <div>
              <input
                {...register("email")}
                className="form-control"
                name="email"
                placeholder="Example:johndoe@mail.com"
                type="email"
                required
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>
          </div>
          <div className="form-group mt-1">
            <label htmlFor="password" className="label-style mb-0">
              Password
            </label>
            <div className="two1">
              <input
                className="form-control"
                name="password"
                {...register("password")}
                placeholder="Your Password"
                type='password'
                required
              />
            </div>
            <p className="text-danger">{errors.password?.message}</p>
          </div>
          {errors?.catch?.message && (
            <div className="alert alert-warning" role="alert">
              <span>Wrong Password</span>
            </div>
          )}
          <button
            className="col-md-12 btn btn-lg btn-block login-btn mt-4 mb-4"
            type="submit"
          >
            {loading ? (
              <Loader type="TailSpin" color="white" height={30} width={40} />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
      <Link to="/forgot-password" style={linkStyle}>
        <div className="row forgot">Forgot Password?</div>
      </Link>
      <div className="note">User Credentials</div>
      <div className="notes">
        <>
          <b>Email:</b> radhikasuresh@yopmail.com
        </>
        <br></br>
        <>
          <b>Password:</b> test@yopmail.com
        </>
      </div>
      <div className="note1">Admin Credentials</div>
      <div className="notes1">
        <>
          <b>Email:</b> venkyiv@outlook.com
        </>
        <br></br>
        <>
          <b>Password:</b> test@yopmail.com
        </>
      </div>
    </>
  );
};

export default SignIn;
