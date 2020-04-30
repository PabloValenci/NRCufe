import React, { Component } from "react";
import axios from "axios";
import "./InputFile.css";

export default class InputFile extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      datosFactura: [],
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
      fileSearch: "",
      numeroResolucion: "",
      fechaIResolucion: "",
      fechaHResolucion: "",
      prefijoResolucion: "NOTA",
      desdeResolucion: "",
      hastaResolucion: "",
      claveTecnica: "",
      tipoAmbiente: "",

      dianNumeroResolucion: "",
      dianFechaIResolucion: "",
      dianFechaHResolucion: "",
      dianPrefijoResolucion: "",
      dianDesdeResolucion: "",
      dianHastaResolucion: "",

      nombreClienteFactura: "",
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
      reglas: {}
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
      .post("http://localhost:3700/api/upload-xml/", fd)
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
        console.log(this.state.fileType);
        debugger;
        console.log(res.data);

        this.setState({
          fileType: res.data.fileType,
          tipoUBL: res.data.tipoUBL,
          numeroFactura: res.data.numeroFactura,
          fechaFactura: res.data.fechaFactura,
          horaFactura: res.data.horaFactura,
          idGeneradorFactura: res.data.idGeneradorFactura,
          idClienteFactura: res.data.idClienteFactura,
          subtotalFactura: res.data.subtotalFactura,
          ivaFactura: res.data.ivaFactura,
          icoFactura: res.data.icoFactura,
          icaFactura: res.data.icaFactura,
          totalFactura: res.data.totalFactura,
          codigoFactura: res.data.codigoFactura,
          xmlCufe: res.data.xmlCufe,
          nombreEmpresa: res.data.nombreEmpresa,
          fileSearch: res.data.fileSearch,
          numeroResolucion: res.data.numeroResolucion,
          fechaIResolucion: res.data.fechaIResolucion,
          fechaHResolucion: res.data.fechaHResolucion,
          prefijoResolucion: res.data.prefijoResolucion,
          desdeResolucion: res.data.desdeResolucion,
          hastaResolucion: res.data.hastaResolucion,
          claveTecnica: res.data.claveTecnica,
          tipoAmbiente: res.data.tipoAmbiente,
          dianNumeroResolucion: res.data.dianNumeroResolucion,
          dianFechaIResolucion: res.data.dianFechaIResolucion,
          dianFechaHResolucion: res.data.dianFechaHResolucion,
          dianPrefijoResolucion: res.data.dianPrefijoResolucion,
          dianDesdeResolucion: res.data.dianDesdeResolucion,
          dianHastaResolucion: res.data.dianHastaResolucion,
          nombreClienteFactura: res.data.nombreClienteFactura,
          reglas: {
            Regla_FAU02: res.data.rechazo_FAU02,
            Regla_FAU04: res.data.rechazo_FAU04,
            Regla_FAU06: res.data.rechazo_FAU06,
            Regla_FAU08: res.data.rechazo_FAU08,
            Regla_FAU14: res.data.rechazo_FAU14
          }
        });

        console.log(this.state.numeroFactura, this.state.reglas);
        // debugger;
      })
      .catch(error => {
        if (this.state.selectedFile !== null) {
          alert("Error de conexión al servidor" + error);
        }
      });
  };

  getDataJSON = async () => {
    if (
      this.state.fileType === "Invoice" ||
      this.state.fileType === "fe:Invoice"
    ) {
      await axios
        .get(
          "http://localhost:3700/api/getinfo-js/" + this.state.prefijoResolucion
        )
        .then(res => {
          console.log(res);
          console.log(this.state.fileType);
          for (let i = 0; i < res.data.respuesta.length; i++) {
            if (
              this.state.idGeneradorFactura === res.data.respuesta[i].nitEmpresa
            ) {
              const numFac = this.state.numeroFactura;
              const prefi = this.state.prefijoResolucion;
              const numFac2 = parseInt(numFac.replace(prefi, ""));

              if (
                parseInt(res.data.respuesta[i].rangoDesde) <= numFac2 &&
                numFac2 <= parseInt(res.data.respuesta[i].rangoHasta)
              ) {
                this.setState({
                  claveTecnica: String(res.data.respuesta[i].ctc),
                  dianNumeroResolucion: String(
                    res.data.respuesta[i].numeroResolucion
                  ),
                  dianFechaIResolucion: String(
                    res.data.respuesta[i].fechaDesde
                  ),
                  dianFechaHResolucion: String(
                    res.data.respuesta[i].fechaHasta
                  ),
                  dianPrefijoResolucion: String(res.data.respuesta[i].prefijo),
                  dianDesdeResolucion: String(res.data.respuesta[i].rangoDesde),
                  dianHastaResolucion: String(res.data.respuesta[i].rangoHasta)
                });
                console.log(
                  parseInt(res.data.respuesta[i].rangoDesde),
                  numFac2,
                  parseInt(res.data.respuesta[i].rangoHasta)
                );
              }
            }
          }
          this.handleDataChange();
        })
        .catch(error => {
          if (this.state.selectedFile !== null) {
            alert(
              "Error de conexión al servidor, por favor intenta nuevamente: " +
                error
            );
          }
        });
    } else {
      await axios
        .get("http://localhost:3700/api/getinfo-js/NOTA")
        .then(res => {
          console.log(res);
          console.log(this.state.fileType);
          this.setState({
            claveTecnica: "00842",
            dianNumeroResolucion: "",
            dianFechaIResolucion: "",
            dianFechaHResolucion: "",
            dianPrefijoResolucion: "",
            dianDesdeResolucion: "",
            dianHastaResolucion: ""
          });
          // debugger;
          this.handleDataChange();
        })
        .catch(error => {
          if (this.state.selectedFile !== null) {
            alert(
              "Error de conexión al servidor, por favor intenta nuevamente: " +
                error
            );
          }
        });
    }
  };

  getDataJSON2 = async () => {
    if (this.state.prefijoResolucion === "undefined") {
      this.setState({ prefijoResolucion: "SINPREFIJO" });
    }
    if (
      this.state.fileType === "Invoice" ||
      this.state.fileType === "fe:Invoice"
    ) {
      await axios
        .get(
          "http://localhost:3700/api/getinfo-js/" + this.state.prefijoResolucion
        )
        .then(res => {
          console.log(res);

          console.log(this.state.fileType);
          for (let i = 0; i < res.data.respuesta.length; i++) {
            if (
              this.state.idGeneradorFactura === res.data.respuesta[i].nitEmpresa
            ) {
              const numFac = this.state.numeroFactura;
              const prefi = this.state.prefijoResolucion;
              const numFac2 = parseInt(numFac.replace(prefi, ""));

              if (
                parseInt(res.data.respuesta[i].rangoDesde) <= numFac2 &&
                numFac2 <= parseInt(res.data.respuesta[i].rangoHasta)
              ) {
                this.setState({
                  claveTecnica: String(res.data.respuesta[i].ctc),
                  dianNumeroResolucion: String(
                    res.data.respuesta[i].numeroResolucion
                  ),
                  dianFechaIResolucion: String(
                    res.data.respuesta[i].fechaDesde
                  ),
                  dianFechaHResolucion: String(
                    res.data.respuesta[i].fechaHasta
                  ),
                  dianPrefijoResolucion: String(res.data.respuesta[i].prefijo),
                  dianDesdeResolucion: String(res.data.respuesta[i].rangoDesde),
                  dianHastaResolucion: String(res.data.respuesta[i].rangoHasta)
                });
                console.log(
                  parseInt(res.data.respuesta[i].rangoDesde),
                  numFac2,
                  parseInt(res.data.respuesta[i].rangoHasta)
                );
              }
            }
          }
          this.handleDataChange();
        })
        .catch(error => {
          if (this.state.selectedFile !== null) {
            alert(
              "Error de conexión al servidor, por favor intenta nuevamente: " +
                error
            );
          }
        });
    } else {
      await axios
        .get("http://localhost:3700/api/getinfo-js/NOTA")
        .then(res => {
          console.log(res);
          console.log(this.state.fileType);
          this.setState({
            claveTecnica: "00842",
            dianNumeroResolucion: "",
            dianFechaIResolucion: "",
            dianFechaHResolucion: "",
            dianPrefijoResolucion: "",
            dianDesdeResolucion: "",
            dianHastaResolucion: ""
          });
          // debugger;
          this.handleDataChange();
        })
        .catch(error => {
          if (this.state.selectedFile !== null) {
            alert(
              "Error de conexión al servidor, por favor intenta nuevamente: " +
                error
            );
          }
        });
    }
  };

  fileInfo = () => {
    setTimeout(this.getDataFile.bind(this), 500); //antes 1000
    // setTimeout(this.getDataJSON.bind(this), 1000); //antes 1400
    setTimeout(this.getDataJSON2.bind(this), 1000); //antes 1400
  };

  validateFile = () => {
    if (this.state.selectedFile === null) {
      alert("Por favor carga un archivo válido");
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
      this.state.tipoUBL,
      this.state.numeroFactura,
      this.state.fechaFactura,
      this.state.horaFactura,
      this.state.subtotalFactura,
      this.state.codImp1,
      this.state.ivaFactura,
      this.state.codImp2,
      this.state.icoFactura,
      this.state.codImp3,
      this.state.icaFactura,
      this.state.totalFactura,
      this.state.idGeneradorFactura,
      this.state.codigoFactura,
      this.state.idClienteFactura,
      this.state.xmlCufe,
      this.state.nombreEmpresa,
      this.state.numeroResolucion,
      this.state.fechaIResolucion,
      this.state.fechaHResolucion,
      this.state.prefijoResolucion,
      this.state.desdeResolucion,
      this.state.hastaResolucion,
      this.state.claveTecnica,
      this.state.dianNumeroResolucion,
      this.state.dianFechaIResolucion,
      this.state.dianFechaHResolucion,
      this.state.dianPrefijoResolucion,
      this.state.dianDesdeResolucion,
      this.state.dianHastaResolucion,
      this.state.nombreClienteFactura,
      this.state.tipoAmbiente,
      this.state.validation,
      this.state.fileType,
      this.state.reglas
    );
    // debugger;
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
          <button
            onClick={this.fileCargar}
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
