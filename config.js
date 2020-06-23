module.exports = {
  port: 8000,

  env: {
    production: {
      KundNrLeveransMottagare: 511942,
      KundNrSlutkund: 511942,
      OrgNrSlutkund: 5590675673,
      UppdragsId: 22615,
    },
    test: {
      KundNrLeveransMottagare: 500243,
      KundNrSlutkund: 500243,
      OrgNrSlutkund: 3102263153,
      UppdragsId: 637,
    },
  },

  requestURL: "https://kt-ext-ws.statenspersonadressregister.se/2019.1",

  tls: {
    passphrase: "6933213230130328",
  },
};
