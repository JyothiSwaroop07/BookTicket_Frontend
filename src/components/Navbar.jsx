import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-primary text-secondary px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        <h1 className="ml-2 text-xl font-bold">Book Ticket</h1>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <input
          type="text"
          placeholder="Search movies..."
          className="border border-primary rounded-md px-2 py-1"
        />
        <button className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-buttonHover">
          Sign In
        </button>
      </div>
      <button className="md:hidden text-secondary text-2xl">☰</button>
    </nav>
  );
};

export default Navbar;
