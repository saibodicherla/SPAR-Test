// Environment is either 'production' or 'test'
const ENV = "test";
const config = require("./config");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const https = require("https");
const utils = require("./controllers/control.utils");

const httpsAgent = new https.Agent({
  rejectUnauthorized: true,
  cert: fs.readFileSync("./files/tls/tls.crt"),
  key: fs.readFileSync("./files/tls/tls.key"),
  passphrase: config.tls.passphrase,
});

module.exports = {
  getInformation: (id, cb) => {
    utils.parseId(id, (idErr, parsedId) => {
      if (idErr) return cb(idErr);

      let data = xml
        .replace(
          "[timestamp]",
          moment().format("YYYY-MM-DDTHH:mm:ss.SSS").toString()
        )
        .replace("[id]", parsedId);

      axios({
        method: "POST",
        url: config.requestURL,
        headers: {
          "Content-Type": "text/xml",
        },
        data: data,
        httpsAgent: httpsAgent,
        withCredentials: true,
      })
        .then((response) => {
          let { data } = response;

          if (!data)
            return cb(null, `No information found for ID number ${parsedId}`);

          utils.jsonify(data, (jsonErr, result) => {
            return cb(jsonErr, result);
          });
        })
        .catch((err) => {
          console.log("Error", err);
          return cb(err, null);
        });
    });
  },
};

const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Header />
<Body>
  <SPARPersonsokningFraga xmlns="http://statenspersonadressregister.se/schema/komponent/sok/personsokningsfraga-1.0"
    xmlns:id="http://statenspersonadressregister.se/schema/komponent/sok/identifieringsinformation-1.0"
    xmlns:sok="http://statenspersonadressregister.se/schema/komponent/sok/personsokningsokparametrar-1.0"
    xmlns:argument="http://statenspersonadressregister.se/schema/komponent/sok/sokargument-1.1"
    xmlns:person="http://statenspersonadressregister.se/schema/komponent/person/person-1.1">
    <id:IdentifieringsInformation>
      <id:KundNrLeveransMottagare>${config.env[ENV].KundNrLeveransMottagare}</id:KundNrLeveransMottagare>
      <id:KundNrSlutkund>${config.env[ENV].KundNrSlutkund}</id:KundNrSlutkund>
      <id:OrgNrSlutkund>${config.env[ENV].OrgNrSlutkund}</id:OrgNrSlutkund>
      <id:UppdragsId>${config.env[ENV].UppdragsId}</id:UppdragsId>
      <id:SlutAnvandarId>foretag-200428</id:SlutAnvandarId>
      <id:Tidsstampel>[timestamp]</id:Tidsstampel>
    </id:IdentifieringsInformation>
    <sok:PersonsokningFraga>
      <argument:PersonId>
        <person:FysiskPersonId>[id]</person:FysiskPersonId>
      </argument:PersonId>
    </sok:PersonsokningFraga>
  </SPARPersonsokningFraga>
</Body>
</Envelope>
`;
