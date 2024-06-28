import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../Redux/Slices/AuthSlice";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  function resetLoginStatus() {
    setLoginDetails({
      email: "",
      password: ""
    });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  }
  async function onSubmit() {
    if (!loginDetails.email || !loginDetails.password) return;
    console.log(loginDetails);
    const response = await dispatch(login(loginDetails));
    if (response.payload) navigate("/");
    else resetLoginStatus();
  }
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xl text-white">Login</h2>
          </div>
          <div className="w-full">
            <input
              onChange={handleInputChange}
              name="email"
              type="text"
              placeholder="Enter Email"
              className="input input-bordered input-primary w-full max-w-xs text-white"
              autoComplete="one-time-code"
              value={loginDetails.email}
            />
          </div>
          <div className="w-full">
            <input
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Enter Password"
              className="input input-bordered input-primary w-full max-w-xs text-white"
              autoComplete="one-time-code"
              value={loginDetails.password}
            />
          </div>
          <div className="card-actions w-full mt-4">
            <button className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300" onClick={onSubmit}>
              Submit
            </button>
          </div>
          <p className="text-l text-white">
            Do not have an account? <Link className="text-yellow-200 font-semibold hover:text-white" to="/signup">Signup Instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
