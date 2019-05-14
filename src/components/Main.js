import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import IngresoDatos from "./IngresoDatos";
import Cufes from "./Cufes";

export default class Main extends Component {
  state = {
    cufes: [],
    contadorCufes: 0
  };

  agregarCUFE = cufe => {
    const cufes = [...this.state.cufes, cufe];
    const cantidadCufes = cufes.length;
    this.setState({ cufes, cantidadCufes });
  };

  render() {
    const year = new Date().getFullYear();
    const title = "App CUFE";
    const company = "VSDC S.A.S";
    return (
      <div className="container">
        <Header title={title} year={year} />
        <div className="row">
          <IngresoDatos agregarCUFE={this.agregarCUFE} />
          {/* <InputFile /> */}
          <Cufes
            cufes={this.state.cufes}
            contadorCufes={this.state.contadorCufes}
          />
        </div>
        <Footer company={company} />
      </div>
    );
  }
}
