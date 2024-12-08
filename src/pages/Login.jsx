import React from "react";

const Login = () => {
  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="bg-secondary p-6 rounded-md shadow-lg w-96">
        <h2 className="text-textPrimary text-2xl font-bold mb-4">Sign In</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border border-primary rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-primary rounded-md"
          />
          <button className="bg-primary text-secondary w-full py-2 rounded-md hover:bg-buttonHover">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
