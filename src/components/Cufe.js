import React from "react";
import "./Cufe.css";
import QRCode from "qrcode.react";

export default function Cufe({ cufe, xmlCufe }) {
  const valor = [
    parseFloat(cufe.subtotal),
    parseFloat(cufe.iva),
    parseFloat(cufe.impuesto1),
    parseFloat(cufe.impuesto2)
  ].reduce(function(a, b) {
    return a + b;
  });

  const subtotal = parseFloat(cufe.subtotal);
  const total = parseFloat(cufe.total);
  const iva = parseFloat(cufe.iva);
  const impuestos = parseFloat(cufe.impuesto1) + parseFloat(cufe.impuesto2);

  var sha1 = require("sha1");

  const concatenado =
    cufe.numero +
    cufe.fecha +
    cufe.hora +
    subtotal.toFixed(2) +
    "01" +
    iva.toFixed(2) +
    "02" +
    cufe.impuesto1 +
    "03" +
    cufe.impuesto2 +
    total.toFixed(2) +
    cufe.nitEmpresa +
    cufe.tipoId +
    cufe.idCliente +
    cufe.ctc;
  console.log(concatenado);
  const qr = `NumFac: ${cufe.numero}
FecFac: ${cufe.fecha}${cufe.hora}
NitFac: ${cufe.nitEmpresa}
DocAdq: ${cufe.idCliente}
ValFac: ${subtotal.toFixed(2)}
ValIva: ${iva.toFixed(2)}
ValOtroIm: ${impuestos.toFixed(2)}
ValFacImp: ${total.toFixed(2)}
${sha1(concatenado)}`;

  const colorAbrobacion =
    valor.toFixed(2) === total.toFixed(2) ? "bg-aprobado" : "bg-rechazado";
  const colorAbrobacionXML =
    sha1(concatenado) === xmlCufe ? "bg-aprobado" : "bg-rechazado";

  return (
    <div>
      <ul className="list-group">
        <li className={`list-group-item ${colorAbrobacion}`}>
          {`CUFE Generado:  ${sha1(concatenado)}`}
        </li>

        <li className={`list-group-item ${colorAbrobacionXML}`}>
          {`CUFE xml: ${xmlCufe}`}
        </li>
        <hr />
      </ul>
      <div className={"col-xs-12 col-md-6 example-col center"}>
        <QRCode value={qr} color={"#67a814"} size={120} />
      </div>
      <hr />
    </div>
  );
}
