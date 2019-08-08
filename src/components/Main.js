import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import IngresoDatos from "./IngresoDatos";
import Cufes from "./Cufes";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      cufes: [],
      contadorCufes: 0,
      xmlCufe: "",
      nombreEmpresa: "",
      numeroResolucion: "",
      fechaIResolucion: "",
      prefijoResolucion: "",
      desdeResolucion: "",
      hastaResolucion: "",
      texto: "",
      timeNow: "",

      dianNumeroResolucion: "",
      dianFechaIResolucion: "",
      dianFechaHResolucion: "",
      dianPrefijoResolucion: "",
      dianDesdeResolucion: "",
      dianHastaResolucion: "",
      validation: {}
    };
  }
  agregarCUFE = cufe => {
    // const cufes = [...this.state.cufes, cufe];
    const cufes = [cufe];
    const cantidadCufes = cufes.length;
    this.setState({ cufes, cantidadCufes });
  };

  handleData2 = (
    xmlCufe,
    nombreEmpresa,
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
    nombreClienteFactura,
    validation
  ) => {
    this.setState({
      xmlCufe: xmlCufe,
      nombreEmpresa: nombreEmpresa,
      numeroResolucion: numeroResolucion,
      fechaIResolucion: fechaIResolucion,
      fechaHResolucion: fechaHResolucion,
      prefijoResolucion: prefijoResolucion,
      desdeResolucion: desdeResolucion,
      hastaResolucion: hastaResolucion,

      dianNumeroResolucion: dianNumeroResolucion,
      dianFechaIResolucion: dianFechaIResolucion,
      dianFechaHResolucion: dianFechaHResolucion,
      dianPrefijoResolucion: dianPrefijoResolucion,
      dianDesdeResolucion: dianDesdeResolucion,
      dianHastaResolucion: dianHastaResolucion,

      timeNow:
        new Date().toLocaleDateString("zh-Hans-CN") +
        ", " +
        new Date().toLocaleTimeString(),
      texto:
        "Resolución No. " +
        numeroResolucion +
        " de fecha " +
        fechaIResolucion +
        " hasta fecha " +
        fechaHResolucion +
        " Prefijo " +
        prefijoResolucion +
        " desde " +
        desdeResolucion +
        " hasta " +
        hastaResolucion,
      nombreClienteFactura: "Adquiriente: " + nombreClienteFactura,
      validation: validation
    });
  };

  render() {
    const year = new Date().getFullYear();
    const title = "NumRot CUFE";
    const company = "NumRot CUFE V190619";
    return (
      <div className="container">
        <Header
          title={title}
          year={year}
          texto={this.state.texto}
          numeroResolucion={this.state.numeroResolucion}
          nombreEmpresa={this.state.nombreEmpresa}
          nombreClienteFactura={this.state.nombreClienteFactura}
        />
        <div className="row">
          <IngresoDatos
            agregarCUFE={this.agregarCUFE}
            onSelectData2={this.handleData2}
          />
          <Cufes
            xmlCufe={this.state.xmlCufe}
            cufes={this.state.cufes}
            contadorCufes={this.state.contadorCufes}
            timeNow={this.state.timeNow}
            numeroResolucion={this.state.numeroResolucion}
            fechaIResolucion={this.state.fechaIResolucion}
            fechaHResolucion={this.state.fechaHResolucion}
            prefijoResolucion={this.state.prefijoResolucion}
            desdeResolucion={this.state.desdeResolucion}
            hastaResolucion={this.state.hastaResolucion}
            dianNumeroResolucion={this.state.dianNumeroResolucion}
            dianFechaIResolucion={this.state.dianFechaIResolucion}
            dianFechaHResolucion={this.state.dianFechaHResolucion}
            dianPrefijoResolucion={this.state.dianPrefijoResolucion}
            dianDesdeResolucion={this.state.dianDesdeResolucion}
            dianHastaResolucion={this.state.dianHastaResolucion}
            validation={this.state.validation}
          />
        </div>
        <Footer company={company} year={year} />
      </div>
    );
  }
}
