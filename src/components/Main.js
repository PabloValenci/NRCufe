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
      timeNow: ""
    };
  }
  agregarCUFE = cufe => {
    const cufes = [...this.state.cufes, cufe];
    const cantidadCufes = cufes.length;
    this.setState({ cufes, cantidadCufes });
  };

  handleData2 = (
    xmlCufe,
    nombreEmpresa,
    numeroResolucion,
    fechaIResolucion,
    prefijoResolucion,
    desdeResolucion,
    hastaResolucion
  ) => {
    this.setState({
      xmlCufe: xmlCufe,
      nombreEmpresa: nombreEmpresa,
      numeroResolucion: numeroResolucion,
      fechaIResolucion: fechaIResolucion,
      prefijoResolucion: prefijoResolucion,
      desdeResolucion: desdeResolucion,
      hastaResolucion: hastaResolucion,
      timeNow: new Date().toLocaleTimeString(),
      texto:
        "Resolución No. " +
        numeroResolucion +
        " de " +
        fechaIResolucion +
        " Prefijo " +
        prefijoResolucion +
        " desde " +
        desdeResolucion +
        " hasta " +
        hastaResolucion
    });
  };

  render() {
    const year = new Date().getFullYear();
    const title = "App CUFE";
    const company = "VSDC S.A.S";
    return (
      <div className="container">
        <Header
          title={title}
          year={year}
          texto={this.state.texto}
          nombreEmpresa={this.state.nombreEmpresa}
        />
        <div className="row">
          <IngresoDatos
            agregarCUFE={this.agregarCUFE}
            onSelectData2={this.handleData2}
          />
          {/* <InputFile /> */}
          <Cufes
            xmlCufe={this.state.xmlCufe}
            cufes={this.state.cufes}
            contadorCufes={this.state.contadorCufes}
            timeNow={this.state.timeNow}
          />
        </div>
        <Footer company={company} />
      </div>
    );
  }
}
