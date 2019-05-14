import React from "react";

export default function Badge({ contadorCufes }) {
  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Cufe Generado</span>
        <span className="badge badge-secondary badge-pill bg-purple text-white lh-100">
          {/* {contadorCufes} */}
        </span>
      </h4>
    </div>
  );
}
