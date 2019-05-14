import React from "react";
import "./Cufe.css";
import QRCode from "qrcode.react";

export default function Cufe({ cufe }) {
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
  const colorAbrobacion =
    valor.toFixed(2) === total.toFixed(2) ? "bg-aprobado" : "bg-rechazado";
  console.log(valor.toFixed(2));
  console.log(total.toFixed(2));

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

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">{`NumFac: ${cufe.numero}`}</li>
        <li className="list-group-item">{`FecFac: ${cufe.fecha +
          cufe.hora}`}</li>
        <li className="list-group-item">{`NitFac: ${cufe.nitEmpresa}`}</li>
        <li className="list-group-item">{`DocAdq: ${cufe.idCliente}`}</li>
        <li className="list-group-item">{`ValFac: ${subtotal.toFixed(2)}`}</li>
        <li className="list-group-item">{`ValIva: ${iva.toFixed(2)}`}</li>
        <li className="list-group-item">{`ValOtroIm: ${impuestos.toFixed(
          2
        )}`}</li>
        <li className="list-group-item">{`ValFacImp: ${total.toFixed(2)}`}</li>
        <li className={`list-group-item ${colorAbrobacion}`}>{`CUFE: ${sha1(
          concatenado
        )}`}</li>
        <hr />
      </ul>
      <div className={"col-xs-12 col-md-6 example-col center"}>
        <QRCode value={qr} errorCorrection={"Q"} color={"#67a814"} size={120} />
      </div>
    </div>
  );
}

// <div id="acordion">
//   <div className="card">
//     <li className="list-group-item d-flex justify-content-between lh-condensed">
//       {/* <div className={`accordion ${colorAbrobacion}`} id="headingOne"> */}
//       <div className="card-header" id="headingOne">
//         <h5 class="mb-0">
//           <button
//             className="btn btn-link"
//             data-toggle="collapse"
//             data-target={"#collapseOne" + cufe.idCUFE}
//             aria-expanded="false"
//             aria-controls="collapseOne"
//           >
//             CUFE: {sha1(concatenado)}
//           </button>
//         </h5>
//         {/* <button className="btn btn-danger" onClick={elimiar} type="button">
//             X
//           </button> */}
//       </div>
//       <div
//         id={"collapseOne" + cufe.idCUFE}
//         className="collapse show"
//         aria-labelledby="headingOne"
//         data-parent="#accordion"
//       >
//         <div className="card-body">
//           {`NumFac: ${cufe.numero}`}
//           <br />
//           {`FecFac: ${cufe.fecha + cufe.hora}`}
//           <br />
//           {`NitFac: ${cufe.nitEmpresa}`}
//           <br />
//           {`DocAdq: ${cufe.idCliente}`}
//           <br />
//           {`ValFac: ${subtotal.toFixed(2)}`}
//           <br />
//           {`ValIva: ${iva.toFixed(2)}`}
//           <br />
//           {`ValOtroIm: ${impuestos.toFixed(2)}`}
//           <br />
//           {`ValFacImp: ${total.toFixed(2)}`}
//           <br />
//           <div className={"col-xs-12 col-md-6 example-col center"}>
//             <QRCode
//               value={qr}
//               errorCorrection={"Q"}
//               color={"#67a814"}
//               size={120}
//             />
//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//     </li>
//   </div>
// </div>;
