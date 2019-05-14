import React from "react";

export default function Footer({ company }) {
  return (
    <footer className="my-5 pt-5 text-muted text-center text-small">
      <p className="mb-1">{company} Copyright &copy; 2019 </p>
    </footer>
  );
}
