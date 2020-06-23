const requests = require("../control.requests");

module.exports = (router) => {
  router.route("/api/v1/person-information").get((req, res) => {
    let { id } = req.query;

    if (!id)
      return res.status(400).send("Missing id parameter in request query.");

    requests.getInformation(id, (err, response) => {
      err
        ? res.status(err.code).send(err.message)
        : res.status(200).send(response);
    });
  });
};
