import React, { Component } from "react";
import uuid from "uuid";
import InputFile from "./InputFile";
import {
  NumeroFactura,
  Hora,
  Fecha,
  validarDecimal,
  ID,
  validarCufe
} from "./Helper";

export default class IngresoDatos extends Component {
  constructor() {
    super();
    this.state = {
      validado: false,
      tipoUBL: "",
      numeroFactura: "",
      fechaFactura: "",
      horaFactura: "",
      idGeneradorFactura: "",
      idClienteFactura: "",
      subtotalFactura: 0,
      codImp1: "01",
      ivaFactura: 0,
      codImp2: "04",
      icoFactura: 0,
      codImp3: "03",
      icaFactura: 0,
      totalFactura: 0,
      codigoFactura: "",
      xmlCufe: "",
      nombreEmpresa: "",
      numeroResolucion: "",
      fechaIResolucion: "",
      fechaHResolucion: "",
      prefijoResolucion: "",
      desdeResolucion: "",
      hastaResolucion: "",
      claveTecnica: "",
      dianNumeroResolucion: "",
      dianFechaIResolucion: "",
      dianFechaHResolucion: "",
      dianPrefijoResolucion: "",
      dianDesdeResolucion: "",
      dianHastaResolucion: "",
      nombreClienteFactura: "",
      tipoAmbiente: "",
      validation: {
        NumeroDeFactura: "",
        FechaDeGeneracion: "",
        HoraDeGeneracion: "",
        Subtotal: "",
        Iva: "",
        Impuesto2: "",
        Impuesto3: "",
        Total: "",
        NitObligado: "",
        NitAdquiriente: "",
        Cufe: ""
      },
      fileType: "",
      fileType2: "Número de Documento"
    };
  }
  numeroRef = React.createRef();
  ambienteRef = React.createRef();
  fechaRef = React.createRef();
  horaRef = React.createRef();
  subtotalRef = React.createRef();
  ivaRef = React.createRef();
  impuesto1Ref = React.createRef();
  impuesto2Ref = React.createRef();
  totalRef = React.createRef();
  ambienteRef = React.createRef();
  nitEmpresaRef = React.createRef();
  tipoIdRef = React.createRef();
  idClienteRef = React.createRef();
  ctcRef = React.createRef();
  tipoUblRef = React.createRef();
  // TODO Crear object
  crearCufe = event => {
    event.preventDefault(); // Detener la acción por defecto
    const tipoubl = this.tipoUblRef.current.value,
      numero = this.numeroRef.current.value.replace(/-/g, ""),
      fecha = this.fechaRef.current.value,
      hora = this.horaRef.current.value,
      subtotal = this.subtotalRef.current.value,
      codimp1 = this.state.codImp1,
      iva = this.ivaRef.current.value,
      codimp2 = this.state.codImp2,
      impuesto1 = this.impuesto1Ref.current.value,
      codimp3 = this.state.codImp3,
      impuesto2 = this.impuesto2Ref.current.value,
      total = this.totalRef.current.value,
      nitEmpresa = this.nitEmpresaRef.current.value,
      tipoId = this.tipoIdRef.current.value,
      idCliente = this.idClienteRef.current.value,
      ctc = this.ctcRef.current.value,
      tipoambiente = this.state.tipoAmbiente,
      fileType = this.state.fileType,
      idCUFE = uuid();
    if (numero !== "") {
      const registroCUFE = {
        tipoubl,
        numero,
        fecha,
        hora,
        subtotal,
        codimp1,
        iva,
        codimp2,
        impuesto1,
        codimp3,
        impuesto2,
        total,
        nitEmpresa,
        tipoId,
        idCliente,
        ctc,
        tipoambiente,
        fileType,
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
    tipoUBL,
    numeroFactura,
    fechaFactura,
    horaFactura,
    subtotalFactura,
    codImp1,
    ivaFactura,
    codImp2,
    icoFactura,
    codImp3,
    icaFactura,
    totalFactura,
    idGeneradorFactura,
    codigoFactura,
    idClienteFactura,
    xmlCufe,
    nombreEmpresa,
    numeroResolucion,
    fechaIResolucion,
    fechaHResolucion,
    prefijoResolucion,
    desdeResolucion,
    hastaResolucion,
    claveTecnica,
    dianNumeroResolucion,
    dianFechaIResolucion,
    dianFechaHResolucion,
    dianPrefijoResolucion,
    dianDesdeResolucion,
    dianHastaResolucion,
    nombreClienteFactura,
    tipoAmbiente,
    validation,
    fileType,
    reglas
  ) {
    this.setState({
      tipoUBL: tipoUBL,
      numeroFactura: numeroFactura,
      fechaFactura: fechaFactura,
      horaFactura: horaFactura,
      subtotalFactura: subtotalFactura,
      codImp1: codImp1,
      ivaFactura: ivaFactura,
      codImp2: codImp2,
      icoFactura: icoFactura,
      codImp3: codImp3,
      icaFactura: icaFactura,
      totalFactura: totalFactura,
      idGeneradorFactura: idGeneradorFactura,
      codigoFactura: codigoFactura,
      idClienteFactura: idClienteFactura,
      xmlCufe: xmlCufe,
      nombreEmpresa: nombreEmpresa,
      numeroResolucion: numeroResolucion,
      fechaIResolucion: fechaIResolucion,
      fechaHResolucion: fechaHResolucion,
      prefijoResolucion: prefijoResolucion,
      desdeResolucion: desdeResolucion,
      hastaResolucion: hastaResolucion,
      claveTecnica: claveTecnica,
      dianNumeroResolucion: dianNumeroResolucion,
      dianFechaIResolucion: dianFechaIResolucion,
      dianFechaHResolucion: dianFechaHResolucion,
      dianPrefijoResolucion: dianPrefijoResolucion,
      dianDesdeResolucion: dianDesdeResolucion,
      dianHastaResolucion: dianHastaResolucion,
      nombreClienteFactura: nombreClienteFactura,
      tipoAmbiente: tipoAmbiente,
      validation: validation,
      fileType: fileType,
      reglas: reglas
    });
    document.getElementById("titulodocumento").title =
      String(this.state.fileType) === "Invoice" ||
      String(this.state.fileType) === "fe:Invoice"
        ? this.setState({ fileType2: "Número de Factura" })
        : this.setState({ fileType2: "Número de Nota" });
    document.getElementById("numerodefactura").value = this.state.numeroFactura;
    document.getElementById("tipoxml").value = this.state.tipoUBL;
    document.getElementById("fechadefactura").value = this.state.fechaFactura;
    document.getElementById("horadegeneracion").value = this.state.horaFactura;
    document.getElementById("valorsubtotal").value = String(
      this.state.subtotalFactura
    );
    document.getElementById("valoriva").value = String(this.state.ivaFactura);
    document.getElementById("valorimpuesto2").value = this.state.icoFactura;
    document.getElementById("valorimpuesto3").value = this.state.icaFactura;
    document.getElementById("totalapagar").value = String(
      this.state.totalFactura
    );
    // debugger;
    document.getElementById("ambiente").value =
      String(this.state.tipoAmbiente) === "2" ||
      String(this.state.prefijoResolucion) === "PRUE"
        ? "Pruebas"
        : "Producción";
    document.getElementById(
      "nitobligado"
    ).value = this.state.idGeneradorFactura;
    document.getElementById("tipodocumento").value = this.state.codigoFactura;
    document.getElementById("nitcliente").value = this.state.idClienteFactura;
    document.getElementById("ctc").value = this.state.claveTecnica;
    console.log(`
${this.state.numeroFactura}
${this.state.fechaFactura}
${this.state.horaFactura}
${this.state.subtotalFactura}
${this.state.ivaFactura}
${this.state.totalFactura}
${this.state.idGeneradorFactura}
${this.state.idClienteFactura}
${this.state.claveTecnica}`);
    this.validateDataXML();
    console.log(this.state.validation);
  }
  handleDataChange2() {
    this.props.onSelectData2(
      this.state.xmlCufe,
      this.state.nombreEmpresa,
      this.state.numeroResolucion,
      this.state.fechaIResolucion,
      this.state.fechaHResolucion,
      this.state.prefijoResolucion,
      this.state.desdeResolucion,
      this.state.hastaResolucion,
      this.state.dianNumeroResolucion,
      this.state.dianFechaIResolucion,
      this.state.dianFechaHResolucion,
      this.state.dianPrefijoResolucion,
      this.state.dianDesdeResolucion,
      this.state.dianHastaResolucion,
      this.state.nombreClienteFactura,
      this.state.validation,
      this.state.reglas
    );
  }
  validateDataXML = () => {
    this.setState({
      validation: {
        NumeroDeFactura: NumeroFactura(this.state.numeroFactura),
        FechaDeGeneracion: Fecha(this.state.fechaFactura),
        HoraDeGeneracion: Hora(this.state.horaFactura, this.state.tipoUBL),
        Subtotal: validarDecimal(this.state.subtotalFactura),
        Iva: validarDecimal(this.state.ivaFactura),
        Total: validarDecimal(this.state.totalFactura),
        NitObligado: ID(this.state.idGeneradorFactura, "", "NIT Facturador"),
        NitAdquiriente: ID(
          this.state.idClienteFactura,
          this.state.codigoFactura,
          "NIT Adquiriente"
        ),
        Cufe: validarCufe(this.state.xmlCufe)
      }
    });
    console.log(this.state.validation.Reglas);
  };
  render() {
    return (
      <div className="col-md-7 order-md-1">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Ingreso de Datos</span>
          <InputFile onSelectData={this.handleData.bind(this)} />
        </h4>
        <form onSubmit={this.crearCufe}>
          {/* <div className="mb-0">
            <label>Número de Factura</label>
            <input
              id="numerodefactura"
              ref={this.numeroRef}
              type="text"
              className="form-control"
              required
            />
          </div> */}
          <div className="row">
            <div className="col-md-6 mb-0">
              <label id="titulodocumento">{this.state.fileType2}</label>
              <input
                id="numerodefactura"
                ref={this.numeroRef}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-0">
              <label>Tipo de XML</label>
              <input
                id="tipoxml"
                ref={this.tipoUblRef}
                readOnly="readonly"
                type="text"
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-0">
              <label>Fecha de Documento</label>
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
                type="string"
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
                type="string"
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
                type="string"
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
                type="string"
                className="form-control"
                required
              />
            </div>
          </div>
          {/* <div className="mb-0">
            <label>Total a Pagar</label>
            <input
              id="totalapagar"
              step="any"
              ref={this.totalRef}
              type="string"
              className="form-control"
              required
            />
          </div> */}
          <div className="row">
            <div className="col-md-6 mb-0">
              <label>Total a Pagar</label>
              <input
                id="totalapagar"
                step="any"
                ref={this.totalRef}
                type="string"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-0">
              <label>Ambiente</label>
              <input
                id="ambiente"
                step="any"
                ref={this.ambienteRef}
                readOnly="readonly"
                type="string"
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-0">
              <label>NIT facturador electrónico</label>
              <input
                id="nitobligado"
                ref={this.nitEmpresaRef}
                type="number"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-0">
              <label>Tipo ID Adquiriente</label>
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
              <label>ID Adquiriente</label>
              <input
                id="nitcliente"
                ref={this.idClienteRef}
                type="any"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-0">
              <label>Clave Técnica (CTC) - PIN (Notas)</label>
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
