import React from "react";
import Badge from "./Badge";
import Cufe from "./Cufe";

export default function Cufes({ cufes, contadorCufes }) {
  return (
    <div className="col-md-5 order-md-2 mb-4">
      <Badge contadorCufes={contadorCufes} />
      <ul className="list-group mb-3">
        {cufes.map(cufe => (
          <Cufe cufe={cufe} key={cufe.idCUFE} />
        ))}
      </ul>
    </div>
  );
}
