export function InvoiceFEVP(res) {
  infoXML = {};
  if (res == "") {
    return "No hay respuesta del servidor para este XML";
  } else {
    infoXML = {
      tipoUBL:
        String(
          res.data[String(this.state.fileType)]["cbc:UBLVersionID"]["_text"]
        ) + " Validación previa",
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
        res.data[String(this.state.fileType)]["cac:AccountingSupplierParty"][
          "cac:Party"
        ]["cac:PartyLegalEntity"]["cbc:CompanyID"]["_text"]
      ),
      idClienteFactura: String(
        res.data[String(this.state.fileType)]["cac:AccountingCustomerParty"][
          "cac:Party"
        ]["cac:PartyLegalEntity"]["cbc:CompanyID"]["_text"]
      ),
      subtotalFactura:
        res.data[String(this.state.fileType)]["cac:LegalMonetaryTotal"][
          "cbc:LineExtensionAmount"
        ]["_text"],
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
        res.data[String(this.state.fileType)]["cac:LegalMonetaryTotal"][
          "cbc:PayableAmount"
        ]["_text"],
      codigoFactura: String(
        res.data[String(this.state.fileType)]["cac:AccountingCustomerParty"][
          "cac:Party"
        ]["cac:PartyLegalEntity"]["cbc:CompanyID"]["_attributes"]["schemeName"]
      ),
      xmlCufe: String(
        res.data[String(this.state.fileType)]["cbc:UUID"]["_text"]
      ),
      nombreEmpresa: String(
        res.data[String(this.state.fileType)]["cac:AccountingSupplierParty"][
          "cac:Party"
        ]["cac:PartyTaxScheme"]["cbc:RegistrationName"]["_text"]
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
        res.data[String(this.state.fileType)]["cac:AccountingCustomerParty"][
          "cac:Party"
        ]["cac:PartyName"]["cbc:Name"]["_text"]
      ),
      tipoAmbiente:
        res.data[String(this.state.fileType)]["cbc:ProfileExecutionID"]["_text"]
    };
  }
}
