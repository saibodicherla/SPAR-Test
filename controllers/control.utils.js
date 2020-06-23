const convert = require("xml-js");
const moment = require("moment");

module.exports = {
  parseId: (id, cb) => {
    let yearSuffix = Number(moment().format("YY"));
    let yearPrefix = Number(moment().format("YYYY").slice(0, 2));
    let gthundred = false;

    // If id contains a hyphen, person is less than a hundred years old
    if (id.match("-")) id = id.replace("-", "");

    // If id contains a plus, person is more than 100 years old
    if (id.match(new RegExp(/\+/))) {
      id = id.replace("+", "");
      gthundred = true;
    }

    // Deal with invalid ID number and return error.
    if (isNaN(id))
      return cb(
        { code: 500, message: "Invalid ID format. ID is not a number" },
        null
      );

    // Make ID 12 digits by adding prefix.
    if (id.length === 10) {
      if (gthundred) {
        yearPrefix -= 1;
        id = String(yearPrefix) + id;
      } else {
        let idSuffix = Number(id.slice(0, 2));
        if (idSuffix > yearSuffix) {
          yearPrefix -= 1;
          id = String(yearPrefix) + id;
        } else {
          id = String(yearPrefix) + id;
        }
      }
    }

    if (id.length === 12) return cb(null, id);

    return cb({ code: 500, message: "Invalid ID format." }, null);
  },

  jsonify: (xml, cb) => {
    let result = convert.xml2json(xml, { compact: true, spaces: 4 });

    // Remove all whitespaces
    let cleaned = result.replace(new RegExp(/\s*/g), "");

    // Create regexes for ns strings and for _text nested data
    let numbermatch = new RegExp(/ns\d+:/g);
    let textmatch = new RegExp(/{"_text":"(.*?)"}/);

    while (cleaned.match(textmatch)) {
      let matched = cleaned.match(textmatch)[0];
      cleaned = cleaned.replace(
        matched,
        matched.replace('{"_text":', "").replace("}", "")
      );
    }

    cleaned = cleaned.replace(numbermatch, "");

    try {
      let json = JSON.parse(cleaned)["S:Envelope"]["S:Body"];
      console.log(json);
      delete json.SPARPersonsokningSvar._attributes;
      return cb(null, json);
    } catch (err) {
      console.log(err);
      return cb(
        {
          code: 500,
          message: "An error occurred trying to parse the response into JSON.",
        },
        null
      );
    }
  },
};
