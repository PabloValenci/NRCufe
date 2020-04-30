import React from "react";

export default function Rejection({ rechazo }) {
  return (
    <div>
      <ul className="pad">
        {rechazo.Regla_FAU02.valor == !rechazo.Regla_FAU02.totalLineas ? (
          <span role="img" aria-label="check">
            &#10060;
            <strong>Regla FAU02: </strong>
            {`El valor @FAU02 ${rechazo.Regla_FAU02.valor} NO coincide con la suma total de las lineas @FAV06 ${rechazo.Regla_FAU02.totalLineas}`}
          </span>
        ) : null}
      </ul>
    </div>
  );
}
