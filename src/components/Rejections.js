import React from "react";

export default function Rejections({ reglas }) {
  return (
    <div>
      <ul className="pad">
        {reglas.Regla_FAU02.respuesta === false ? (
          <span role="img" aria-label="check">
            &#10060;
            <strong>Regla FAU02: </strong>
            {`El total sin impuestos @FAU02 ${reglas.Regla_FAU02.valor} NO coincide con la sumatoria de las lineas @FAV06 ${reglas.Regla_FAU02.totalLineas}`}
          </span>
        ) : null}
      </ul>
      <ul className="pad">
        {reglas.Regla_FAU04.respuesta === false ? (
          <span role="img" aria-label="check">
            &#10060;
            <strong>Regla FAU04: </strong>
            {`La base para el cálculo de los impuestos @FAU04 ${reglas.Regla_FAU04.valor} NO coincide con la sumatoria de las lineas sin impuesto @FAX05 ${reglas.Regla_FAU02.totalLineas}`}
          </span>
        ) : null}
      </ul>
      <ul className="pad">
        {reglas.Regla_FAU06.respuesta === false ? (
          <span role="img" aria-label="check">
            &#10060;
            <strong>Regla FAU06: </strong>
            {Object.keys(reglas.Regla_FAU06).length}
            {`El total con impuesto @FAU06 ${reglas.Regla_FAU06.valor} NO coincide con la suma del tag @FAU02 ${reglas.Regla_FAU06.valor2} más la sumatoria de todos los tags @FAS02 ${reglas.Regla_FAU06.totalLineas}`}
          </span>
        ) : null}
      </ul>
      <ul className="pad">
        {reglas.Regla_FAU08.respuesta === false ? (
          <span role="img" aria-label="check">
            &#10060;
            <strong>Regla FAU08: </strong>
            {`El descuento total informado @FAU08 ${reglas.Regla_FAU08.valor} NO coincide con la suma de todos los descuentos aplicados @FAQ07 ${reglas.Regla_FAU08.totalLineas}`}
          </span>
        ) : null}
      </ul>
      <ul className="pad">
        {reglas.Regla_FAU14.respuesta === false ? (
          <span role="img" aria-label="check">
            &#10060;
            <strong>Regla FAU14: </strong>
            {`El valorBrutoConTributos @FAU06 ${reglas.Regla_FAU14.valorBrutoConTributos} menos el valorDescuentos @FAU08 ${reglas.Regla_FAU14.valorDescuentos} más el valorCargos @FAU10 ${reglas.Regla_FAU14.valorCargos} menos valorAnticipos @FAU12 ${reglas.Regla_FAU14.valorAnticipos} no es igual al valorTotal @FAU14 ${reglas.Regla_FAU14.valorTotal}`}
          </span>
        ) : null}
      </ul>
      {/* <ul className="pad">
        {reglas.Regla_FAS07.respuesta === false ||
        reglas.Regla_FAS07 === "undefined" ? (
          <span role="img" aria-label="check">
            &#10060;
            <strong>Regla FAS07: </strong>
            {`El valorBrutoConTributos @FAU06 ${reglas.Regla_FAU14.valorBrutoConTributos} menos el valorDescuentos @FAU08 ${reglas.Regla_FAU14.valorDescuentos} más el valorCargos @FAU10 ${reglas.Regla_FAU14.valorCargos} menos valorAnticipos @FAU12 ${reglas.Regla_FAU14.valorAnticipos} no es igual al valorTotal @FAU14 ${reglas.Regla_FAU14.valorTotal}`}
          </span>
        ) : null}
      </ul> */}
    </div>
  );
}
