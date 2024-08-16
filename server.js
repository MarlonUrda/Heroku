let express = require("express");
let app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("pad");
});

app.get("/(:id)", (req, res) => {
  res.render("pad");
});

let share = require("share");
require("redis");

let options = {
  db: { type: "redis" },
};

share.server.attach(app, options);

let port = 8000;

app.listen(port);
