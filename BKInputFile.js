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
      fileType: ""
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
        for (var key in res.data) {
          this.setState({ fileType: key });
        }
        debugger;

        if (
          this.state.fileType === "Invoice" ||
          this.state.fileType === "fe:Invoice"
        ) {
          if (
            res.data[String(this.state.fileType)]["ext:UBLExtensions"][
              "ext:UBLExtension"
            ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
              "sts:InvoiceControl"
            ]["sts:AuthorizedInvoices"]["sts:Prefix"] !== "undefined" ||
            res.data[String(this.state.fileType)]["ext:UBLExtensions"][
              "ext:UBLExtension"
            ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
              "sts:InvoiceControl"
            ]["sts:AuthorizedInvoices"]["sts:Prefix"]["_text"] !== "undefined"
          ) {
            this.setState({
              prefijoResolucion: "SINPREFIJO"
            });
          } else {
            if (
              res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                "ext:UBLExtension"
              ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                "sts:InvoiceControl"
              ] !== "undefined"
            ) {
              this.setState({
                prefijoResolucion: this.state.fileType.charAt(1) + "N"
              });
            } else {
              this.setState({
                prefijoResolucion: String(
                  res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                    "ext:UBLExtension"
                  ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                    "sts:InvoiceControl"
                  ]["sts:AuthorizedInvoices"]["sts:Prefix"]["_text"]
                )
              });
            }
          }
        } else {
          if (
            res.data[String(this.state.fileType)]["ext:UBLExtensions"][
              "ext:UBLExtension"
            ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
              "sts:InvoiceControl"
            ] !== "undefined"
          ) {
            this.setState({
              prefijoResolucion: "N" + this.state.fileType.charAt(0)
            });
          } else {
            this.setState({
              prefijoResolucion: String(
                res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                  "ext:UBLExtension"
                ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                  "sts:InvoiceControl"
                ]["sts:AuthorizedInvoices"]["sts:Prefix"]["_text"]
              )
            });
          }
        }
        console.log(this.state.fileType);
        console.log(
          res.data[String(this.state.fileType)]["cbc:UBLVersionID"]["_text"]
        );
        if (
          this.state.fileType === "Invoice" ||
          this.state.fileType === "fe:Invoice"
        ) {
          // console.log(
          //   String(
          //     res.data[String(this.state.fileType)]["ext:UBLExtensions"][
          //       "ext:UBLExtension"
          //     ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
          //       "sts:InvoiceControl"
          //     ]["sts:AuthorizedInvoices"]["sts:Prefix"]["_text"]
          //   )
          // );
          console.log(this.state.prefijoResolucion);
        }
        debugger;
        switch (
          String(
            res.data[String(this.state.fileType)]["cbc:UBLVersionID"]["_text"]
          )
        ) {
          case "UBL 2.1":
            if (String(this.state.fileType) === "Invoice") {
              this.setState({
                tipoUBL:
                  String(
                    res.data[String(this.state.fileType)]["cbc:UBLVersionID"][
                      "_text"
                    ]
                  ) + " Validación previa",
                numeroFactura: String(
                  res.data[String(this.state.fileType)]["cbc:ID"]["_text"]
                ),
                fechaFactura: String(
                  res.data[String(this.state.fileType)]["cbc:IssueDate"][
                    "_text"
                  ]
                ),
                horaFactura: String(
                  res.data[String(this.state.fileType)]["cbc:IssueTime"][
                    "_text"
                  ]
                ),
                idGeneradorFactura: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingSupplierParty"
                  ]["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyID"][
                    "_text"
                  ]
                ),
                idClienteFactura: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingCustomerParty"
                  ]["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyID"][
                    "_text"
                  ]
                ),
                subtotalFactura:
                  res.data[String(this.state.fileType)][
                    "cac:LegalMonetaryTotal"
                  ]["cbc:LineExtensionAmount"]["_text"],
                codImp1:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][0][
                    "cac:TaxSubtotal"
                  ]["cac:TaxCategory"]["cac:TaxScheme"]["cbc:ID"]["_text"],
                ivaFactura:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][0][
                    "cbc:TaxAmount"
                  ]["_text"],
                codImp2:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][1][
                    "cac:TaxSubtotal"
                  ]["cac:TaxCategory"]["cac:TaxScheme"]["cbc:ID"]["_text"],
                icoFactura:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][1][
                    "cbc:TaxAmount"
                  ]["_text"],
                codImp3:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][2][
                    "cac:TaxSubtotal"
                  ]["cac:TaxCategory"]["cac:TaxScheme"]["cbc:ID"]["_text"],
                icaFactura:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][2][
                    "cbc:TaxAmount"
                  ]["_text"],
                totalFactura:
                  res.data[String(this.state.fileType)][
                    "cac:LegalMonetaryTotal"
                  ]["cbc:PayableAmount"]["_text"],
                codigoFactura: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingCustomerParty"
                  ]["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyID"][
                    "_attributes"
                  ]["schemeName"]
                ),
                xmlCufe: String(
                  res.data[String(this.state.fileType)]["cbc:UUID"]["_text"]
                ),
                nombreEmpresa: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingSupplierParty"
                  ]["cac:Party"]["cac:PartyTaxScheme"]["cbc:RegistrationName"][
                    "_text"
                  ]
                ),
                numeroResolucion: String(
                  res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                    "ext:UBLExtension"
                  ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                    "sts:InvoiceControl"
                  ]["sts:InvoiceAuthorization"]["_text"]
                ),
                fechaIResolucion: String(
                  res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                    "ext:UBLExtension"
                  ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                    "sts:InvoiceControl"
                  ]["sts:AuthorizationPeriod"]["cbc:StartDate"]["_text"]
                ),
                fechaHResolucion: String(
                  res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                    "ext:UBLExtension"
                  ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                    "sts:InvoiceControl"
                  ]["sts:AuthorizationPeriod"]["cbc:EndDate"]["_text"]
                ),
                desdeResolucion: String(
                  res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                    "ext:UBLExtension"
                  ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                    "sts:InvoiceControl"
                  ]["sts:AuthorizedInvoices"]["sts:From"]["_text"]
                ),
                hastaResolucion: String(
                  res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                    "ext:UBLExtension"
                  ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                    "sts:InvoiceControl"
                  ]["sts:AuthorizedInvoices"]["sts:To"]["_text"]
                ),
                nombreClienteFactura: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingCustomerParty"
                  ]["cac:Party"]["cac:PartyName"]["cbc:Name"]["_text"]
                ),
                tipoAmbiente:
                  res.data[String(this.state.fileType)][
                    "cbc:ProfileExecutionID"
                  ]["_text"]
              });
            } else {
              this.setState({
                tipoUBL:
                  String(
                    res.data[String(this.state.fileType)]["cbc:UBLVersionID"][
                      "_text"
                    ]
                  ) + " Validación previa",
                numeroFactura: String(
                  res.data[String(this.state.fileType)]["cbc:ID"]["_text"]
                ),
                fechaFactura: String(
                  res.data[String(this.state.fileType)]["cbc:IssueDate"][
                    "_text"
                  ]
                ),
                horaFactura: String(
                  res.data[String(this.state.fileType)]["cbc:IssueTime"][
                    "_text"
                  ]
                ),
                idGeneradorFactura: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingSupplierParty"
                  ]["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyID"][
                    "_text"
                  ]
                ),
                idClienteFactura: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingCustomerParty"
                  ]["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyID"][
                    "_text"
                  ]
                ),
                subtotalFactura:
                  res.data[String(this.state.fileType)][
                    "cac:LegalMonetaryTotal"
                  ]["cbc:LineExtensionAmount"]["_text"],
                codImp1:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][0][
                    "cac:TaxSubtotal"
                  ]["cac:TaxCategory"]["cac:TaxScheme"]["cbc:ID"]["_text"],
                ivaFactura:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][0][
                    "cbc:TaxAmount"
                  ]["_text"],
                codImp2:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][1][
                    "cac:TaxSubtotal"
                  ]["cac:TaxCategory"]["cac:TaxScheme"]["cbc:ID"]["_text"],
                icoFactura:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][1][
                    "cbc:TaxAmount"
                  ]["_text"],
                codImp3:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][2][
                    "cac:TaxSubtotal"
                  ]["cac:TaxCategory"]["cac:TaxScheme"]["cbc:ID"]["_text"],
                icaFactura:
                  res.data[String(this.state.fileType)]["cac:TaxTotal"][2][
                    "cbc:TaxAmount"
                  ]["_text"],
                totalFactura:
                  res.data[String(this.state.fileType)][
                    "cac:LegalMonetaryTotal"
                  ]["cbc:PayableAmount"]["_text"],
                codigoFactura: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingCustomerParty"
                  ]["cac:Party"]["cac:PartyLegalEntity"]["cbc:CompanyID"][
                    "_attributes"
                  ]["schemeName"]
                ),
                xmlCufe: String(
                  res.data[String(this.state.fileType)]["cbc:UUID"]["_text"]
                ),
                nombreEmpresa: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingSupplierParty"
                  ]["cac:Party"]["cac:PartyTaxScheme"]["cbc:RegistrationName"][
                    "_text"
                  ]
                ),
                nombreClienteFactura: String(
                  res.data[String(this.state.fileType)][
                    "cac:AccountingCustomerParty"
                  ]["cac:Party"]["cac:PartyName"]["cbc:Name"]["_text"]
                ),
                tipoAmbiente:
                  res.data[String(this.state.fileType)][
                    "cbc:ProfileExecutionID"
                  ]["_text"]
              });
            }
            break;
          case "UBL 2.0":
            this.setState({
              tipoUBL:
                String(
                  res.data[String(this.state.fileType)]["cbc:UBLVersionID"][
                    "_text"
                  ]
                ) + " FE Versión 1",
              numeroFactura: String(
                res.data[String(this.state.fileType)]["cbc:ID"]["_text"]
              ),
              fechaFactura: String(
                res.data[String(this.state.fileType)]["cbc:IssueDate"]["_text"]
              ),
              horaFactura: String(
                res.data[String(this.state.fileType)]["cbc:IssueTime"]["_text"]
              ),
              idGeneradorFactura: String(
                res.data[String(this.state.fileType)][
                  "fe:AccountingSupplierParty"
                ]["fe:Party"]["cac:PartyIdentification"]["cbc:ID"]["_text"]
              ),
              idClienteFactura: String(
                res.data[String(this.state.fileType)][
                  "fe:AccountingCustomerParty"
                ]["fe:Party"]["cac:PartyIdentification"]["cbc:ID"]["_text"]
              ),
              subtotalFactura:
                res.data[String(this.state.fileType)]["fe:LegalMonetaryTotal"][
                  "cbc:LineExtensionAmount"
                ]["_text"],
              ivaFactura:
                res.data[String(this.state.fileType)]["fe:TaxTotal"][0][
                  "fe:TaxSubtotal"
                ]["cbc:TaxAmount"]["_text"],
              icoFactura:
                res.data[String(this.state.fileType)]["fe:TaxTotal"][1][
                  "fe:TaxSubtotal"
                ]["cbc:TaxAmount"]["_text"],
              icaFactura:
                res.data[String(this.state.fileType)]["fe:TaxTotal"][2][
                  "fe:TaxSubtotal"
                ]["cbc:TaxAmount"]["_text"],
              totalFactura:
                res.data[String(this.state.fileType)]["fe:LegalMonetaryTotal"][
                  "cbc:PayableAmount"
                ]["_text"],
              codigoFactura: String(
                res.data[String(this.state.fileType)][
                  "fe:AccountingCustomerParty"
                ]["fe:Party"]["cac:PartyIdentification"]["cbc:ID"][
                  "_attributes"
                ]["schemeID"]
              ),
              xmlCufe: String(
                res.data[String(this.state.fileType)]["cbc:UUID"]["_text"]
              ),
              nombreEmpresa: String(
                res.data[String(this.state.fileType)][
                  "fe:AccountingSupplierParty"
                ]["fe:Party"]["cac:PartyName"]["cbc:Name"]["_text"]
              ),
              numeroResolucion: String(
                res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                  "ext:UBLExtension"
                ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                  "sts:InvoiceControl"
                ]["sts:InvoiceAuthorization"]["_text"]
              ),
              fechaIResolucion: String(
                res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                  "ext:UBLExtension"
                ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                  "sts:InvoiceControl"
                ]["sts:AuthorizationPeriod"]["cbc:StartDate"]["_text"]
              ),
              fechaHResolucion: String(
                res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                  "ext:UBLExtension"
                ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                  "sts:InvoiceControl"
                ]["sts:AuthorizationPeriod"]["cbc:EndDate"]["_text"]
              ),
              prefijoResolucion: String(
                res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                  "ext:UBLExtension"
                ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                  "sts:InvoiceControl"
                ]["sts:AuthorizedInvoices"]["sts:Prefix"]["_text"]
              ),
              desdeResolucion: String(
                res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                  "ext:UBLExtension"
                ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                  "sts:InvoiceControl"
                ]["sts:AuthorizedInvoices"]["sts:From"]["_text"]
              ),
              hastaResolucion: String(
                res.data[String(this.state.fileType)]["ext:UBLExtensions"][
                  "ext:UBLExtension"
                ][0]["ext:ExtensionContent"]["sts:DianExtensions"][
                  "sts:InvoiceControl"
                ]["sts:AuthorizedInvoices"]["sts:To"]["_text"]
              ),
              nombreClienteFactura: String(
                res.data[String(this.state.fileType)][
                  "fe:AccountingCustomerParty"
                ]["fe:Party"]["cac:PartyName"]["cbc:Name"]["_text"]
              )
            });

            break;
          default:
            console.log("No estoy en ningun XML valido");
            break;
        }
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
          this.state.numeroResolucion,
          this.state.tipoAmbiente
        );
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
      this.state.fileType
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
