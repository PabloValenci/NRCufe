import React from "react";
import "./Footer.css";

export default function Footer({ company }) {
  return (
    <footer className="my-2 pt-3 text-muted text-center text-small">
      <p className="mb-0">{company} Copyright &copy; 2019 </p>
    </footer>
  );
}
