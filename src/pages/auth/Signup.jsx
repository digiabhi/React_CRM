import React from "react";

function Signup() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xltext-white">Signup</h2>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter User Id"
              className="input input-bordered input-primary w-full max-w-xs text-white"
              autoComplete="one-time-code"
            />
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered input-primary w-full max-w-xs text-white"
              autoComplete="one-time-code"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered input-primary w-full max-w-xs text-white"
              autoComplete="one-time-code"
            />
          </div>
          <details className="dropdown w-full">
            <summary className="btn">User Type</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <a>Customer</a>
              </li>
              <li>
                <a>Engineer</a>
              </li>
            </ul>
          </details>
          <div className="card-actions w-full mt-4">
            <button className="btn btn-warning w-full font-bold text-xl">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
