import React, { Component } from "react";
import axios from "axios";
import "./InputFile.css";

export default class InputFile extends Component {
  state = {
    selectedFile: null
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
    // console.log(event.target.files[0]);
  };

  fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append("file", this.state.selectedFile, this.state.selectedFile.name);
    await axios
      .post("http://localhost:3001/subir", fd)
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
    axios.get("http://localhost:3001/info", fd).then(res => {
      console.log(res);
    });
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
            onClick={this.fileUploadHandler}
            className="btn btn-outline-secondary"
            type="button"
            id="inputGroupFileAddon04"
          >
            Cargar
          </button>
        </div>
      </div>
    );
  }
}
