const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);

app.use(router);
require("./routes/route.main")(router);

app.listen(config.port).on("listening", function () {
  console.log(
    `API is online.\nListening for requests on port ${config.port}...`
  );
});
