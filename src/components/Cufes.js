import React from "react";
import Badge from "./Badge";
import Cufe from "./Cufe";

export default function Cufes({ cufes, xmlCufe, timeNow }) {
  console.log(cufes[0]);

  return (
    <div className="col-md-5 order-md-2 mb-4 overflow-auto">
      <Badge timeNow={timeNow} />
      <ul className="list-group mb-3">
        {cufes.map(cufe => (
          <Cufe cufe={cufe} key={cufe.idCUFE} xmlCufe={xmlCufe} />
        ))}
      </ul>
    </div>
  );
}
