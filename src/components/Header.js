import React from "react";
import "./Header.css";

export default function Header({ title, year, nombreEmpresa, texto }) {
  return (
    <header>
      <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm row">
        <div className="col-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://numrot.com/#/inicio"
          >
            <img
              className="mr-3"
              src="./LogoNR.png"
              alt={title}
              width="243"
              height="46"
            />
          </a>
        </div>
        <div className="col-8 lh-100 text-right">
          <h4 className="text-right text-black lh-100">{nombreEmpresa}</h4>
          <p className=" text-black lh-100">{texto}</p>
        </div>
      </div>
    </header>
  );
}
