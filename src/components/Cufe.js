import React from "react";
import "./Cufe.css";
import QRCode from "qrcode.react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Rejections from "./Rejections";
import { sha, qrGenerado } from "./Helper";

export default function Cufe({
  cufe,
  xmlCufe,
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
  const valor = [
    parseFloat(cufe.subtotal),
    parseFloat(cufe.iva),
    parseFloat(cufe.impuesto1),
    parseFloat(cufe.impuesto2)
  ].reduce(function(a, b) {
    return a + b;
  });

  const total = parseFloat(cufe.total);
  const cufeGenerado = sha(cufe);
  const qr = qrGenerado(cufe, cufeGenerado);

  const colorAbrobacion =
    valor.toFixed(2) === total.toFixed(2) ? "bg-aprobado" : "bg-rechazado";
  // const validacionVAL = colorAbrobacion === "bg-rechazado" ? false : true;
  const colorAbrobacionXML =
    cufeGenerado === xmlCufe ? "bg-aprobado" : "bg-rechazado";
  const validacionCUFE = cufeGenerado === String(xmlCufe) ? true : false;
  // const validacionRES =
  //   String(desdeResolucion) === String(dianDesdeResolucion) ? true : false;
  // const validacionRES2 =
  //   String(fechaHResolucion) ===
  //   String(
  //     dianFechaHResolucion
  //       .split("/")
  //       .reverse()
  //       .join("-")
  //   )
  //     ? true
  //     : false;
  // const validacionRES3 =
  //   String(numeroResolucion) === String(dianNumeroResolucion) ? true : false;
  // console.log(validacionRES, validacionRES2, validacionRES3);
  // console.log(
  //   fechaHResolucion,
  //   dianFechaHResolucion
  //     .split("/")
  //     .reverse()
  //     .join("-")
  // );
  // var hola = reglas.Regla_FAU07.filter(
  //   respuesta => respuesta.respuesta === false
  // );
  debugger;
  console.log(reglas);

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle
          className={`list-group-item ${colorAbrobacion}`}
          as={Card.Header}
          eventKey="0"
        >
          {`CUFE Generado:  ${cufeGenerado}`}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div className={"col-xs-12 col-md-6 example-col center"}>
              <QRCode value={qr} color={"#67a814"} size={120} />
            </div>
            <br />
            <div fontSize="1">
              {/* <ul className="pad">
                {validacionVAL ? (
                  <span role="img" aria-label="check">
                    &#9989;
                    <strong>Coinciden </strong>
                  </span>
                ) : (
                  <span role="img" aria-label="check">
                    &#10060;
                    <strong>No Coinciden </strong>
                  </span>
                )}
                {` Suma de valores totales `}
              </ul> */}
              {xmlCufe !== "" ? (
                <div>
                  <ul className="pad">
                    {validacionCUFE ? (
                      <span role="img" aria-label="check">
                        &#9989;
                        <strong>Coinciden </strong>
                      </span>
                    ) : (
                      <span role="img" aria-label="check">
                        &#10060;
                        <strong>No Coinciden </strong>
                      </span>
                    )}
                    {` CUFE generado y CUFE xml`}
                  </ul>
                  {/* <ul className="pad">
                    {validacionRES && validacionRES2 && validacionRES3 ? (
                      <span role="img" aria-label="check">
                        &#9989;
                        <strong>Coinciden </strong>
                      </span>
                    ) : (
                      <span role="img" aria-label="check">
                        &#10060;
                        <strong>No Coinciden </strong>
                      </span>
                    )}
                    {` Resolución DIAN y resolución XML`}
                  </ul> */}
                  <Rejections reglas={reglas}></Rejections>
                  {/* <br />
                  {colorAbrobacionXML === "bg-rechazado" ? (
                    <ul className="pad">
                      {validation.NumeroDeFactura.indexOf("Correcto") !== 0 ? (
                        <li type="disc">{validation.NumeroDeFactura}</li>
                      ) : (
                        ""
                      )}
                      {validation.FechaDeGeneracion.indexOf("Correcto") !==
                      0 ? (
                        <li type="disc">{validation.FechaDeGeneracion}</li>
                      ) : (
                        ""
                      )}
                      {validation.HoraDeGeneracion.indexOf("Correcto") !== 0 ? (
                        <li type="disc">{validation.HoraDeGeneracion}</li>
                      ) : (
                        ""
                      )}
                      {validation.Subtotal.indexOf("Correcto") !== 0 ? (
                        <li type="disc">{validation.Subtotal}</li>
                      ) : (
                        ""
                      )}
                      {validation.Iva.indexOf("Correcto") !== 0
                        ? (this.setState({ validado: true }),
                          (<li type="disc">{validation.Iva}</li>))
                        : ""}
                      {validation.Total.indexOf("Correcto") !== 0 ? (
                        <li type="disc">{validation.Total}</li>
                      ) : (
                        ""
                      )}
                      {validation.NitObligado.indexOf("Correcto") !== 0 ? (
                        <li type="disc">{validation.NitObligado}</li>
                      ) : (
                        ""
                      )}
                      {validation.NitAdquiriente.indexOf("Correcto") !== 0 ? (
                        <li type="disc">{validation.NitAdquiriente}</li>
                      ) : (
                        ""
                      )}
                      {validation.Cufe.indexOf("Correcto") !== 0 ? (
                        <li type="disc">{validation.Cufe}</li>
                      ) : (
                        ""
                      )}
                    </ul>
                  ) : (
                    ""
                  )} */}
                  <br />
                  {!validacionCUFE ? (
                    <span>
                      <b>
                        Se debe revisar la cadena de caracteres que genera el
                        CUFE
                      </b>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              ) : null}
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        {xmlCufe !== "" ? (
          <Accordion.Toggle
            className={`list-group-item ${colorAbrobacionXML}`}
            as={Card.Header}
            eventKey="1"
          >
            {`CUFE xml: ${xmlCufe}`}
          </Accordion.Toggle>
        ) : null}
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <small>
              <ul>
                <h6>Datos XML</h6>
              </ul>
              {/* <ul>
                <strong>No. Resolución: </strong>
                {numeroResolucion}
              </ul>
              <ul>
                <strong>Fecha desde: </strong>
                {fechaIResolucion}
              </ul>
              <ul>
                <strong>Fecha hasta: </strong>
                {fechaHResolucion}
              </ul>
              <ul>
                <strong>Prefijo:</strong> {prefijoResolucion}
              </ul>
              <ul>
                <strong>Desde: </strong>
                {desdeResolucion}
              </ul>
              <ul>
                <strong>Hasta: </strong>
                {hastaResolucion}
              </ul>
              <br />
              <ul>
                <h6>Datos DIAN</h6>
              </ul>
              <ul>
                <strong>No. Resolución: </strong>
                {dianNumeroResolucion}
              </ul>
              <ul>
                <strong>Fecha desde: </strong>
                {dianFechaIResolucion
                  .split("/")
                  .reverse()
                  .join("-")}
              </ul>
              <ul>
                <strong>Fecha hasta: </strong>
                {dianFechaHResolucion
                  .split("/")
                  .reverse()
                  .join("-")}
              </ul>
              <ul>
                <strong>Prefijo:</strong> {dianPrefijoResolucion}
              </ul>
              <ul>
                <strong>Desde: </strong>
                {dianDesdeResolucion}
              </ul>
              <ul>
                <strong>Hasta: </strong>
                {dianHastaResolucion}
              </ul> */}
            </small>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <hr />
      <div className="center-block">
        <a
          href={`${
            cufe.fileType === "fe:Invoice"
              ? "https://muisca.dian.gov.co/WebFacturaelectronica/paginas/VerificarFacturaElectronicaExterno.faces"
              : `https://catalogo-vpfe${
                  cufe.tipoambiente === "1" ? "" : "-hab"
                }.dian.gov.co/document/searchqr?documentkey=${xmlCufe}`
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consulte su Factura Electrónica
        </a>
      </div>
    </Accordion>
  );
}
