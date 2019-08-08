import React from "react";
import "./Footer.css";

export default function Footer({ company, year }) {
  return (
    <footer className="my-2 pt-3 text-muted text-center text-small">
      <p className="mb-0 fas fa-check">
        {`${company} `} Copyright &copy; {` ${year}`}
      </p>
    </footer>
  );
}
