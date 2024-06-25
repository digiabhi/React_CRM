import React from "react";

function Login() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xl text-white">Login</h2>
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
              type="password"
              placeholder="Enter Password"
              className="input input-bordered input-primary w-full max-w-xs text-white"
              autoComplete="one-time-code"
            />
          </div>
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

export default Login;
