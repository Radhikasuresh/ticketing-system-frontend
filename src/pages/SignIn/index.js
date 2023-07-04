import { useEffect, useState } from "react";
import "./SignIn.css";
import * as yup from "yup";
import api from "axiosConfig";
import { useForm } from "react-hook-form";
import { loginAction } from "store/actions";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import Loader from 'react-loader-spinner';
import ReactLoaderSpinner from 'react-loader-spinner';



const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const SignIn = () => {
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
    try {
      const response = await api.post("/api/users/login", data);
      dispatch(loginAction(response.data));
      reset();
    } catch (error) {
      setError("catch", error.response.data);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/queries");
  }, [auth, navigate]);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
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
            <div>
              <input
                className="form-control"
                name="password"
                {...register("password")}
                placeholder="Your Password"
                type="password"
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
            type="submit"
            className="col-md-12 btn btn-lg btn-block login-btn mt-4 mb-4"
          >
            Login
          </button>
</form>
      </div>
      <Link to="/forgot-password">
        <div className="row forgot">Forgot Password?</div>
      </Link>
      <div className="note">
Login Credentials
 </div>
<div className="notes">
 <><b>Email:</b>  radhikasuresh@yopmail.com</><br></br>
 <><b>Password:</b>  test@yopmail.com</>
 </div>


    </>
  
  );
};


export default SignIn;



