import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../Redux/Slices/AuthSlice";

function Login() {

  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginDetails({ ...loginDetails, [name]: value });
  }
  function onSubmit() {
    if (!loginDetails.email || !loginDetails.password) return;
    console.log(loginDetails);
    const response = dispatch(login(loginDetails));
    console.log(response);
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
            />
          </div>
          <div className="card-actions w-full mt-4">
            <button className="btn btn-warning w-full font-bold text-xl" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
