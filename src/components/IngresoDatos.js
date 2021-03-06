import React, { Component } from "react";
import uuid from "uuid";
import InputFile from "./InputFile";

export default class IngresoDatos extends Component {
  constructor() {
    super();
    this.state = {
      validado: false,
      numeroFactura: "",
      fechaFactura: "",
      horaFactura: "",
      idGeneradorFactura: "",
      idClienteFactura: "",
      subtotalFactura: 0,
      ivaFactura: 0,
      totalFactura: 0,
      codigoFactura: "",
      xmlCufe: "",
      nombreEmpresa: "",
      numeroResolucion: "",
      fechaIResolucion: "",
      prefijoResolucion: "",
      desdeResolucion: "",
      hastaResolucion: ""
    };
  }
  numeroRef = React.createRef();
  fechaRef = React.createRef();
  horaRef = React.createRef();
  subtotalRef = React.createRef();
  ivaRef = React.createRef();
  impuesto1Ref = React.createRef();
  impuesto2Ref = React.createRef();
  totalRef = React.createRef();
  nitEmpresaRef = React.createRef();
  tipoIdRef = React.createRef();
  idClienteRef = React.createRef();
  ctcRef = React.createRef();
  // TODO Crear object
  crearCufe = event => {
    event.preventDefault(); // Detener la acción por defecto
    const numero = this.numeroRef.current.value.replace(/-/g, ""),
      fecha = String(this.fechaRef.current.value).replace(/-/g, ""),
      hora = String(this.horaRef.current.value).replace(/:/g, ""),
      subtotal = this.subtotalRef.current.value,
      iva = this.ivaRef.current.value,
      impuesto1 = this.impuesto1Ref.current.value,
      impuesto2 = this.impuesto2Ref.current.value,
      total = this.totalRef.current.value,
      nitEmpresa = this.nitEmpresaRef.current.value,
      tipoId = this.tipoIdRef.current.value,
      idCliente = this.idClienteRef.current.value,
      ctc = this.ctcRef.current.value,
      idCUFE = uuid();
    if (numero !== "") {
      // Revisar
      const registroCUFE = {
        numero,
        fecha,
        hora,
        subtotal,
        iva,
        impuesto1,
        impuesto2,
        total,
        nitEmpresa,
        tipoId,
        idCliente,
        ctc,
        idCUFE
      };
      // TODO send
      this.props.agregarCUFE(registroCUFE);
      this.setState({
        validado: false
      });
      // event.currentTarget.reset();
    } else {
      this.setState({ validado: true });
    }
  };
  handleData(
    numeroFactura,
    fechaFactura,
    horaFactura,
    subtotalFactura,
    ivaFactura,
    totalFactura,
    idGeneradorFactura,
    codigoFactura,
    idClienteFactura,
    xmlCufe,
    nombreEmpresa,
    numeroResolucion,
    fechaIResolucion,
    prefijoResolucion,
    desdeResolucion,
    hastaResolucion
  ) {
    this.setState({
      numeroFactura: numeroFactura,
      fechaFactura: fechaFactura,
      horaFactura: horaFactura,
      subtotalFactura: subtotalFactura,
      ivaFactura: ivaFactura,
      totalFactura: totalFactura,
      idGeneradorFactura: idGeneradorFactura,
      codigoFactura: codigoFactura,
      idClienteFactura: idClienteFactura,
      xmlCufe: xmlCufe,
      nombreEmpresa: nombreEmpresa,
      numeroResolucion: numeroResolucion,
      fechaIResolucion: fechaIResolucion,
      prefijoResolucion: prefijoResolucion,
      desdeResolucion: desdeResolucion,
      hastaResolucion: hastaResolucion
    });
    document.getElementById("numerodefactura").value = this.state.numeroFactura;
    document.getElementById("fechadefactura").value = this.state.fechaFactura;
    document.getElementById("horadegeneracion").value = this.state.horaFactura;
    document.getElementById("valorsubtotal").value = this.state.subtotalFactura;
    document.getElementById("valoriva").value = this.state.ivaFactura;
    document.getElementById("valorimpuesto2").value = "0.00";
    document.getElementById("valorimpuesto3").value = "0.00";
    document.getElementById("totalapagar").value = this.state.totalFactura;
    document.getElementById(
      "nitobligado"
    ).value = this.state.idGeneradorFactura;
    document.getElementById("tipodocumento").value = this.state.codigoFactura;
    document.getElementById("nitcliente").value = this.state.idClienteFactura;
  }
  handleDataChange2() {
    this.props.onSelectData2(
      this.state.xmlCufe,
      this.state.nombreEmpresa,
      this.state.numeroResolucion,
      this.state.fechaIResolucion,
      this.state.prefijoResolucion,
      this.state.desdeResolucion,
      this.state.hastaResolucion
    );
  }
  render() {
    return (
      <div className="col-md-7 order-md-1">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Ingreso de Datos</span>
          <InputFile onSelectData={this.handleData.bind(this)} />
        </h4>
        <form onSubmit={this.crearCufe}>
          <div className="mb-0">
            <label>Número de Factura</label>
            <input
              id="numerodefactura"
              ref={this.numeroRef}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-0">
              <label>Fecha de Factura</label>
              <input
                id="fechadefactura"
                ref={this.fechaRef}
                type="date"
                className="form-control"
                format="YYYY-MM-AA"
                required
              />
            </div>
            <div className="col-md-6 mb-0">
              <label>Hora de generación</label>
              <input
                id="horadegeneracion"
                step="1"
                ref={this.horaRef}
                type="datetime"
                className="form-control"
                format="HH:MM:SS"
                placeholder="HH:MM:SS"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-0">
              <label>Valor Subtotal</label>
              <input
                id="valorsubtotal"
                step="any"
                ref={this.subtotalRef}
                type="number"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-0">
              <label>Valor IVA</label>
              <input
                id="valoriva"
                step="any"
                ref={this.ivaRef}
                type="number"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-0">
              <label>Valor Impuesto 2</label>
              <input
                id="valorimpuesto2"
                step="any"
                ref={this.impuesto1Ref}
                type="number"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-0">
              <label>Valor Impuesto 3</label>
              <input
                id="valorimpuesto3"
                step="any"
                ref={this.impuesto2Ref}
                type="number"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="mb-0">
            <label>Total a Pagar</label>
            <input
              id="totalapagar"
              step="any"
              ref={this.totalRef}
              type="number"
              className="form-control"
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-0">
              <label>NIT obligado a facturar</label>
              <input
                id="nitobligado"
                ref={this.nitEmpresaRef}
                type="number"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-0">
              <label>Tipo de documento del Cliente</label>
              <select
                id="tipodocumento"
                ref={this.tipoIdRef}
                className="custom-select d-block w-100"
                required
              >
                <option value="">Selecciona...</option>
                <option value="11">11 - Registro civil </option>
                <option value="12">12 - Tarjeta de identidad </option>
                <option value="13">13 - Cédula de ciudadanía</option>
                <option value="21">21 - Tarjeta de extranjería</option>
                <option value="22">22 - Cédula de extranjería</option>
                <option value="31">31 - NIT</option>
                <option value="41">41 - Pasaporte</option>
                <option value="42">42 - Documento de Extranjería</option>
                <option value="91">91 - NUIP</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-0">
              <label>ID del cliente</label>
              <input
                id="nitcliente"
                ref={this.idClienteRef}
                type="number"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-0">
              <label>Clave Técnica de Control (CTC)</label>
              <input
                id="ctc"
                ref={this.ctcRef}
                type="text"
                className="form-control"
                required
              />
            </div>
          </div>
          {/* Si devuelve true se muestra el Alert */}
          {/* {this.state.validado && <Alert />} */}
          <hr className="mb-1" />
          <button
            className="btn btn-primary btn-lg btn-block bg-blue text-white lh-100"
            type="submit"
            onClick={this.handleDataChange2.bind(this)}
          >
            Generar CUFE
          </button>
        </form>
      </div>
    );
  }
}
