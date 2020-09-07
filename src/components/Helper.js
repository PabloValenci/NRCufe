export var sha1 = require("sha1");
export var sha384 = require("sha384");
export var sha_ = "";
export var concatenado = "";
export var qr = "";

export function NumeroFactura(data) {
  if (data === "") {
    return "No existe número de documento asociado";
  } else {
    return "Correcto";
  }
}

export function Fecha(data) {
  var regEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  if (data === "") {
    return "No existe fecha de generación";
  } else {
    if (!data.match(regEx)) {
      return "Fecha con formato incorrecto";
    } else {
      return "Correcto";
    }
  }
}

export function Hora(data, ubl) {
  var regEx = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
  var regExVP = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)-(?:[01]\d|2[0-3]):(?:[0-5]\d)/;
  var message = "";

  switch (ubl) {
    case "UBL 2.0 FE Versión 1":
      if (data === "") {
        message = "No existe hora de generación";
      } else {
        if (!data.match(regEx)) {
          message = "Hora con formato incorrecto"; // Invalid format
        } else {
          message = "Correcto";
        }
      }
      break;

    case "UBL 2.1 Validación previa":
      if (data === "") {
        message = "No existe hora de generación";
      } else {
        if (!data.match(regExVP)) {
          message = "Hora con formato incorrecto"; // Invalid format
        } else {
          message = "Correcto";
        }
      }
      break;
    default:
      console.log("Error " + ubl);
      break;
  }
  return message;
}

export function validarDecimal(valor) {
  var RE = /^\d*(\.\d{1})?\d{0,1}$/;
  if (valor === "") {
    return "No existe valor";
  } else {
    if (!RE.test(valor)) {
      return "Valor con formato incorrecto";
    } else {
      return "Correcto";
    }
  }
}

export function ID(id, schemeID, texto) {
  var regEx42 = /^[a-zA-Z0-9]+$/;
  var regEx = /^[0-9]*$/;
  if (id === "") {
    return "No existe ID";
  } else {
    if (schemeID === "42") {
      if (!regEx42.test(id)) {
        return (
          texto +
          " no tiene el formato correcto, se deben revisar caracteres especiales"
        );
      } else {
        return "Correcto";
      }
    } else {
      if (!regEx.test(id)) {
        return (
          texto +
          " no tiene el formato correcto, se deben revisar caracteres especiales"
        );
      } else {
        return "Correcto";
      }
    }
  }
}

export function validarCufe(cufe) {
  var regEx = /^[a-z0-9]+$/;
  if (cufe === "") {
    return "No existe cufe asociado";
  } else {
    if (!regEx.test(cufe)) {
      return "CUFE no tiene el formato correcto, se deben revisar caracteres especiales";
    } else {
      if (cufe.length <= 96) {
        return "Correcto";
      } else {
        return "CUFE del XML sobrepasa los 40 digitos";
      }
    }
  }
}

export function sha(cufe) {
  const subtotal = parseFloat(cufe.subtotal);
  const total = parseFloat(cufe.total);
  const iva = parseFloat(cufe.iva);
  //debugger;
  switch (cufe.tipoubl) {
    case "UBL 2.0 FE Versión 1":
      concatenado =
        cufe.numero +
        String(cufe.fecha).replace(/-/g, "") +
        String(cufe.hora).replace(/:/g, "") +
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
      sha_ = sha1(concatenado);
      break;

    case "UBL 2.1 Validación previa":
      concatenado =
        cufe.numero +
        cufe.fecha +
        cufe.hora +
        subtotal.toFixed(2) +
        "01" +
        iva.toFixed(2) +
        "04" +
        cufe.impuesto1 +
        "03" +
        cufe.impuesto2 +
        total.toFixed(2) +
        cufe.nitEmpresa +
        cufe.idCliente +
        cufe.ctc +
        cufe.tipoambiente;
      sha_ = sha384(concatenado, "utf-8").toString("hex");
      break;

    default:
      console.log("Error " + cufe.tipoubl);
      break;
  }
  debugger;
  console.log(concatenado);
  return sha_;
}

export function qrGenerado(cufe, cufeGenerado) {
  var ambiente = cufe.tipoambiente === "1" ? "" : "-hab";
  const fechaE = String(cufe.fecha).replace(/-/g, "");
  const subtotal = parseFloat(cufe.subtotal);
  const total = parseFloat(cufe.total);
  const iva = parseFloat(cufe.iva);
  const impuestos = parseFloat(cufe.impuesto1) + parseFloat(cufe.impuesto2);
  switch (cufe.tipoubl) {
    case "UBL 2.0 FE Versión 1":
      qr = `NumFac: ${cufe.numero}
FecFac: ${fechaE}${String(cufe.hora).replace(/:/g, "")}
NitFac: ${cufe.nitEmpresa}
DocAdq: ${cufe.idCliente}
ValFac: ${subtotal.toFixed(2)}
ValIva: ${iva.toFixed(2)}
ValOtroIm: ${impuestos.toFixed(2)}
ValFacImp: ${total.toFixed(2)}
${cufeGenerado}`;
      break;

    case "UBL 2.1 Validación previa":
      if (cufe.fileType === "Número de Factura") {
        qr = `NumFac: ${cufe.numero}
FecFac: ${cufe.fecha}
HorFac: ${cufe.hora}
NitFac: ${cufe.nitEmpresa}
DocAdq: ${cufe.idCliente}
ValFac: ${subtotal.toFixed(2)}
ValIva: ${iva.toFixed(2)}
ValOtroIm: ${impuestos.toFixed(2)}
ValTolFac: ${total.toFixed(2)}
CUFE: ${cufeGenerado}
URL: https://catalogo-vpfe${ambiente}.dian.gov.co/document/searchqr?documentkey=${cufeGenerado}`;
      } else {
        qr = `NumNota: ${cufe.numero}
NitFacturador: ${cufe.nitEmpresa}
NitAdquiriente: ${cufe.idCliente}
FecNota: ${cufe.fecha}
ValTolNota: ${total.toFixed(2)}
CUDE: ${cufeGenerado}
URL: https://catalogo-vpfe${ambiente}.dian.gov.co/document/searchqr?documentkey=${cufeGenerado}`;
      }
      break;
    default:
      console.log("Error " + cufe.tipoubl);
      break;
  }
  console.log(qr);
  return qr;
}
