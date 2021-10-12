import React from "react";

const NavLink = ({ data }) => {
  return (
    <li className="relative cursor-pointer text-gray-300 hover:text-white">
      <a className="px-6 py-3 inline-flex items-center w-full space-x-4" href={data.path}>
        <data.Icon className="text-2xl" />
        <span>{data.title}</span>
      </a>
    </li>
  );
};

export default NavLink;