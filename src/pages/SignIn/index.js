import { useEffect } from "react";
import "./SignIn.css";
import * as yup from "yup";
import api from "axiosConfig";
import { logo } from "./logo";
import { useForm } from "react-hook-form";
import { loginAction } from "store/actions";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(auth, "auth");
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
    if (auth.isAuthenticated) navigate("/dashboard");
  }, [auth, navigate]);

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
                          placeholder="email"
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
                          placeholder="password"
                          type="password"
                          required
                        />
                      </div>
                      <p className="text-danger">{errors.password?.message}</p>
                    </div>
                    {errors?.catch?.message && (
                      <div class="alert alert-warning" role="alert">
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
                <div className="row forgot">Forgot Password?</div>
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

export default SignIn;
