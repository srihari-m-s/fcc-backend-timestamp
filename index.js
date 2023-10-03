// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const path = require("path");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, "public")));

// set EJS as the template engine
app.set("view engine", "ejs");

// set the views directory
app.set("views", path.join(__dirname, "views"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// timestamp api
app.get("/api/:date?", function (req, res) {
  let string = req.params.date;
  let date;

  // If string is empty set date to new Date()
  if (!string) {
    date = new Date();
  } else {
    // If string is numbers
    if (!isNaN(string)) {
      date = new Date(parseInt(string));
    } else {
      date = new Date(string);
    }

    // If string is invalid
    if (date.toString() === "Invalid Date") {
      // res.json({ error: "Invalid Date" });
      let result = JSON.stringify({ message: "Invalid Date" });
      res.render("result", { data: result });
    } else {
      let result = {
        message: JSON.stringify({
          unix: date.getTime(),
          utc: date.toUTCString(),
        }),
      };

      res.render("result", { data: result });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Your app is listening on port http://localhost:" + listener.address().port
  );
});
