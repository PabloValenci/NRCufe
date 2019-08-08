getDataFile = async () => {
  await axios
    .get(
      "https://api-rest-reactor.herokuapp.com/api/getinfo-xml/" +
        this.state.fileSearch
    )
    .then(res => {
      console.log(res);
      this.setState({
        numeroFactura: String(res.data["fe:Invoice"]["cbc:ID"]["_text"]),
        fechaFactura: String(res.data["fe:Invoice"]["cbc:IssueDate"]["_text"]),
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
          res.data["fe:Invoice"]["fe:LegalMonetaryTotal"]["cbc:PayableAmount"][
            "_text"
          ],
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
        fechaHResolucion: String(
          res.data["fe:Invoice"]["ext:UBLExtensions"]["ext:UBLExtension"][0][
            "ext:ExtensionContent"
          ]["sts:DianExtensions"]["sts:InvoiceControl"][
            "sts:AuthorizationPeriod"
          ]["cbc:EndDate"]["_text"]
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
        ),
        nombreClienteFactura: String(
          res.data["fe:Invoice"]["fe:AccountingCustomerParty"]["fe:Party"][
            "cac:PartyName"
          ]["cbc:Name"]["_text"]
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
    })
    .catch(error => {
      if (this.state.selectedFile !== null) {
        alert("Error de conexión al servidor");
      }
    });
};

this.setState({
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
    res.data[String(this.state.fileType)]["fe:AccountingSupplierParty"][
      "fe:Party"
    ]["cac:PartyIdentification"]["cbc:ID"]["_text"]
  ),
  idClienteFactura: String(
    res.data[String(this.state.fileType)]["fe:AccountingCustomerParty"][
      "fe:Party"
    ]["cac:PartyIdentification"]["cbc:ID"]["_text"]
  ),
  subtotalFactura:
    res.data[String(this.state.fileType)]["fe:LegalMonetaryTotal"][
      "cbc:LineExtensionAmount"
    ]["_text"],
  ivaFactura:
    res.data[String(this.state.fileType)]["fe:LegalMonetaryTotal"][
      "cbc:TaxExclusiveAmount"
    ]["_text"],
  totalFactura:
    res.data[String(this.state.fileType)]["fe:LegalMonetaryTotal"][
      "cbc:PayableAmount"
    ]["_text"],
  codigoFactura: String(
    res.data[String(this.state.fileType)]["fe:AccountingCustomerParty"][
      "fe:Party"
    ]["cac:PartyIdentification"]["cbc:ID"]["_attributes"]["schemeID"]
  ),
  xmlCufe: String(res.data[String(this.state.fileType)]["cbc:UUID"]["_text"]),
  nombreEmpresa: String(
    res.data[String(this.state.fileType)]["fe:AccountingSupplierParty"][
      "fe:Party"
    ]["cac:PartyName"]["cbc:Name"]["_text"]
  ),
  numeroResolucion: String(
    res.data[String(this.state.fileType)]["ext:UBLExtensions"][
      "ext:UBLExtension"
    ][0]["ext:ExtensionContent"]["sts:DianExtensions"]["sts:InvoiceControl"][
      "sts:InvoiceAuthorization"
    ]["_text"]
  ),
  fechaIResolucion: String(
    res.data[String(this.state.fileType)]["ext:UBLExtensions"][
      "ext:UBLExtension"
    ][0]["ext:ExtensionContent"]["sts:DianExtensions"]["sts:InvoiceControl"][
      "sts:AuthorizationPeriod"
    ]["cbc:StartDate"]["_text"]
  ),
  fechaHResolucion: String(
    res.data[String(this.state.fileType)]["ext:UBLExtensions"][
      "ext:UBLExtension"
    ][0]["ext:ExtensionContent"]["sts:DianExtensions"]["sts:InvoiceControl"][
      "sts:AuthorizationPeriod"
    ]["cbc:EndDate"]["_text"]
  ),
  prefijoResolucion: String(
    res.data[String(this.state.fileType)]["ext:UBLExtensions"][
      "ext:UBLExtension"
    ][0]["ext:ExtensionContent"]["sts:DianExtensions"]["sts:InvoiceControl"][
      "sts:AuthorizedInvoices"
    ]["sts:Prefix"]["_text"]
  ),
  desdeResolucion: String(
    res.data[String(this.state.fileType)]["ext:UBLExtensions"][
      "ext:UBLExtension"
    ][0]["ext:ExtensionContent"]["sts:DianExtensions"]["sts:InvoiceControl"][
      "sts:AuthorizedInvoices"
    ]["sts:From"]["_text"]
  ),
  hastaResolucion: String(
    res.data[String(this.state.fileType)]["ext:UBLExtensions"][
      "ext:UBLExtension"
    ][0]["ext:ExtensionContent"]["sts:DianExtensions"]["sts:InvoiceControl"][
      "sts:AuthorizedInvoices"
    ]["sts:To"]["_text"]
  ),
  nombreClienteFactura: String(
    res.data[String(this.state.fileType)]["fe:AccountingCustomerParty"][
      "fe:Party"
    ]["cac:PartyName"]["cbc:Name"]["_text"]
  )
});
