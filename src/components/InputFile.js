import React, { Component } from "react";
import axios from "axios";
import "./InputFile.css";

export default class InputFile extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      datosFactura: [],
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
      fileSearch: "",
      numeroResolucion: "",
      fechaIResolucion: "",
      prefijoResolucion: "",
      desdeResolucion: "",
      hastaResolucion: ""
    };
  }

  componentWillMount() {
    // this.getDataFile();
    // this.handleDataChange();
  }

  fileSelectedHandler = event => {
    event.preventDefault(); // Detener la acción por defecto
    this.setState({
      selectedFile: event.target.files[0]
    });
    console.log(event.target.files[0]);
  };

  fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append(
      "facturaXML",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    await axios
      .post("http://localhost:3700/api/upload-xml", fd)
      .then(res => {
        console.log(res.data.files);
        this.setState({
          fileSearch: String(res.data.files)
        });
      })
      .catch(error => console.log(error));
  };

  getDataFile = async () => {
    await axios
      .get("http://localhost:3700/api/getinfo-xml/" + this.state.fileSearch)
      .then(res => {
        console.log(res);
        this.setState({
          numeroFactura: String(res.data["fe:Invoice"]["cbc:ID"]["_text"]),
          fechaFactura: String(
            res.data["fe:Invoice"]["cbc:IssueDate"]["_text"]
          ),
          horaFactura: String(res.data["fe:Invoice"]["cbc:IssueTime"]["_text"]),
          idGeneradorFactura: String(
            res.data["fe:Invoice"]["fe:AccountingSupplierParty"]["fe:Party"][
              "cac:PartyIdentification"
            ]["cbc:ID"]["_text"]
          ),
          idClienteFactura: String(
            res.data["fe:Invoice"]["fe:AccountingCustomerParty"]["fe:Party"][
              "cac:PartyIdentification"
            ]["cbc:ID"]["_text"]
          ),
          subtotalFactura:
            res.data["fe:Invoice"]["fe:LegalMonetaryTotal"][
              "cbc:LineExtensionAmount"
            ]["_text"],
          ivaFactura:
            res.data["fe:Invoice"]["fe:LegalMonetaryTotal"][
              "cbc:TaxExclusiveAmount"
            ]["_text"],
          totalFactura:
            res.data["fe:Invoice"]["fe:LegalMonetaryTotal"][
              "cbc:PayableAmount"
            ]["_text"],
          codigoFactura: String(
            res.data["fe:Invoice"]["fe:AccountingCustomerParty"]["fe:Party"][
              "cac:PartyIdentification"
            ]["cbc:ID"]["_attributes"]["schemeID"]
          ),
          xmlCufe: String(res.data["fe:Invoice"]["cbc:UUID"]["_text"]),
          nombreEmpresa: String(
            res.data["fe:Invoice"]["fe:AccountingSupplierParty"]["fe:Party"][
              "cac:PartyName"
            ]["cbc:Name"]["_text"]
          ),
          numeroResolucion: String(
            res.data["fe:Invoice"]["ext:UBLExtensions"]["ext:UBLExtension"][0][
              "ext:ExtensionContent"
            ]["sts:DianExtensions"]["sts:InvoiceControl"][
              "sts:InvoiceAuthorization"
            ]["_text"]
          ),
          fechaIResolucion: String(
            res.data["fe:Invoice"]["ext:UBLExtensions"]["ext:UBLExtension"][0][
              "ext:ExtensionContent"
            ]["sts:DianExtensions"]["sts:InvoiceControl"][
              "sts:AuthorizationPeriod"
            ]["cbc:StartDate"]["_text"]
          ),
          prefijoResolucion: String(
            res.data["fe:Invoice"]["ext:UBLExtensions"]["ext:UBLExtension"][0][
              "ext:ExtensionContent"
            ]["sts:DianExtensions"]["sts:InvoiceControl"][
              "sts:AuthorizedInvoices"
            ]["sts:Prefix"]["_text"]
          ),
          desdeResolucion: String(
            res.data["fe:Invoice"]["ext:UBLExtensions"]["ext:UBLExtension"][0][
              "ext:ExtensionContent"
            ]["sts:DianExtensions"]["sts:InvoiceControl"][
              "sts:AuthorizedInvoices"
            ]["sts:From"]["_text"]
          ),
          hastaResolucion: String(
            res.data["fe:Invoice"]["ext:UBLExtensions"]["ext:UBLExtension"][0][
              "ext:ExtensionContent"
            ]["sts:DianExtensions"]["sts:InvoiceControl"][
              "sts:AuthorizedInvoices"
            ]["sts:To"]["_text"]
          )
        });
        console.log(
          this.state.numeroFactura,
          this.state.fechaFactura,
          this.state.horaFactura,
          this.state.idGeneradorFactura,
          this.state.idClienteFactura,
          this.state.subtotalFactura,
          this.state.ivaFactura,
          this.state.totalFactura,
          this.state.codigoFactura,
          this.state.xmlCufe,
          this.state.nombreEmpresa,
          this.state.numeroResolucion
        );
        this.handleDataChange();
      })
      .catch(error => {
        alert("Error de conexión al servidor");
      });
  };

  fileInfo = () => {
    setTimeout(this.getDataFile.bind(this), 800);
  };

  validateFile = () => {
    if (this.state.selectedFile === null) {
      alert("Por favor cargar un archivo válido");
    } else {
      let ext = this.state.selectedFile.name.split(".");
      let extFile = ext[1];

      if (extFile === "xml" || extFile === "XML") {
        this.fileUploadHandler();
        alert(
          "Archivo " + this.state.selectedFile.name + " cargado exitosamente"
        );
      } else {
        alert("Por favor cargar un archivo válido");
      }
    }
  };

  handleDataChange() {
    this.props.onSelectData(
      this.state.numeroFactura,
      this.state.fechaFactura,
      this.state.horaFactura,
      this.state.subtotalFactura,
      this.state.ivaFactura,
      this.state.totalFactura,
      this.state.idGeneradorFactura,
      this.state.codigoFactura,
      this.state.idClienteFactura,
      this.state.xmlCufe,
      this.state.nombreEmpresa,
      this.state.numeroResolucion,
      this.state.fechaIResolucion,
      this.state.prefijoResolucion,
      this.state.desdeResolucion,
      this.state.hastaResolucion
    );
  }

  fileCargar = () => {
    this.validateFile();
    this.fileInfo();
  };

  render() {
    return (
      <div className="input-group">
        <div className="custom-file">
          <input
            type="file"
            onChange={this.fileSelectedHandler}
            className="custom-file-input"
            accept="text/xml"
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
          />
          <label className="custom-file-label" htmlFor="inputGroupFile04">
            Seleccionar archivo
          </label>
        </div>
        <div className="input-group-append">
          {/* <button
            onClick={this.validateFile}
            // onChange={}
            // onChange={this.handleDataChange.bind(this)}
            className="btn btn-outline-primary"
            type="button"
            id="inputGroupFileAddon04"
          >
            Subir archivo
          </button> */}
          <button
            onClick={this.fileCargar}
            // onChange={}
            // onChange={this.handleDataChange.bind(this)}
            className="btn btn-outline-primary"
            type="button"
            id="inputGroupFileAddon01"
          >
            Cargar Datos
          </button>
        </div>
      </div>
    );
  }
}
