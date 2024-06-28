import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../Redux/Slices/AuthSlice";

function Signup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
    name: "",
    userType: "",
    userStatus: "",
    clientName: ""
  });

  function resetSignupStatus() {
    setSignupDetails({
      email: "",
      password: "",
      name: "",
      userType: "",
      userStatus: "",
      clientName: ""
    });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value });
  }
  function handleUserType(e) {
    const userTypeSelected = e.target.textContent;
    setSignupDetails({
      ...signupDetails,
      userType: userTypeSelected,
      userStatus: (userTypeSelected == "customer") ? "approved" : "suspended"
    });
    const dropDown = document.getElementById("userTypeDropdown");
    dropDown.open = !dropDown.open;
  }
  async function onSubmit() {
    if (!signupDetails.email || !signupDetails.password || !signupDetails.userStatus || !signupDetails.userType || !signupDetails.name || !signupDetails.clientName) return;
    const response = await dispatch(signup(signupDetails));
    console.log(response);
    if (response.payload) { toast.success("Successfully signed up!"); navigate("/login"); }
    else { toast.error("Something went wrong. Please try again!"); resetSignupStatus(); }
  }
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xl text-white">Signup</h2>
          </div>
          <div className="w-full">
            <input
              onChange={handleInputChange}
              name="email"
              type="text"
              placeholder="Enter Email"
              className="input input-bordered input-primary w-full max-w-xs text-white"
              autoComplete="one-time-code"
              value={signupDetails.email}
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
              value={signupDetails.password}
            />
          </div>
          <div className="w-full">
            <input
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="Enter Name"
              className="input input-bordered input-primary w-full max-w-xs text-white"
              autoComplete="one-time-code"
              value={signupDetails.name}
            />
          </div>
          <details className="dropdown w-full" id="userTypeDropdown">
            <summary className="btn">{(!signupDetails.userType) ? "User Type" : signupDetails.userType}</summary>
            <ul onClick={handleUserType} className="menu dropdown-content bg-base-100 text-white rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <a>customer</a>
              </li>
              <li>
                <a>engineer</a>
              </li>
              <li>
                <a>admin</a>
              </li>
            </ul>
          </details>
          <div className="w-full">
            <input
              onChange={handleInputChange}
              name="clientName"
              type="text"
              placeholder="Enter Client Name"
              className="input input-bordered input-primary w-full max-w-xs text-white"
              autoComplete="one-time-code"
              value={signupDetails.clientName}
            />
          </div>
          <div className="card-actions w-full mt-4">
            <button className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300" onClick={onSubmit}>
              Submit
            </button>
          </div>
          <p className="text-l text-white">
            Already have an account? <Link className="text-yellow-200 font-semibold hover:text-white" to="/login">Login Instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
