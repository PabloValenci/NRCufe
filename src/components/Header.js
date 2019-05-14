import React from "react";
import "./Header.css";

export default function Header({ title, year }) {
  return (
    <header>
      <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://numrot.com/#/inicio"
        >
          <img
            className="mr-3"
            src="./LogoNR.png"
            alt={title}
            width="220"
            height="60"
          />
        </a>
        {/* <div className="lh-100">
          <h4 className="mb-1 text-white lh-100">{title}</h4>
          <small>NumRot</small>
        </div> */}
      </div>
    </header>
  );
}
