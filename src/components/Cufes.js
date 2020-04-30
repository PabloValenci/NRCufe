import React from "react";
import Badge from "./Badge";
import Cufe from "./Cufe";

export default function Cufes({
  cufes,
  xmlCufe,
  timeNow,
  numeroResolucion,
  fechaIResolucion,
  fechaHResolucion,
  prefijoResolucion,
  desdeResolucion,
  hastaResolucion,

  dianNumeroResolucion,
  dianFechaIResolucion,
  dianFechaHResolucion,
  dianPrefijoResolucion,
  dianDesdeResolucion,
  dianHastaResolucion,
  validation,
  reglas
}) {
  return (
    <div className="col-md-5 order-md-2 mb-4 overflow-auto">
      <Badge
        cufes={cufes}
        timeNow={timeNow}
        numeroResolucion={numeroResolucion}
      />
      <ul className="list-group mb-3">
        {cufes.map(cufe => (
          <Cufe
            cufe={cufe}
            key={cufe.idCUFE}
            xmlCufe={xmlCufe}
            numeroResolucion={numeroResolucion}
            fechaIResolucion={fechaIResolucion}
            fechaHResolucion={fechaHResolucion}
            prefijoResolucion={prefijoResolucion}
            desdeResolucion={desdeResolucion}
            hastaResolucion={hastaResolucion}
            dianNumeroResolucion={dianNumeroResolucion}
            dianFechaIResolucion={dianFechaIResolucion}
            dianFechaHResolucion={dianFechaHResolucion}
            dianPrefijoResolucion={dianPrefijoResolucion}
            dianDesdeResolucion={dianDesdeResolucion}
            dianHastaResolucion={dianHastaResolucion}
            validation={validation}
            reglas={reglas}
          />
        ))}
      </ul>
    </div>
  );
}
