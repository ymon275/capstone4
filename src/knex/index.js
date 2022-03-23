const express = require("express");
const onHeaders = require("on-headers");
const bodyParser = require("body-parser");
const PORT = 5050;
const knex = require("./db/knex");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  // ! ACAO needs to be changed to "http://localhost:3000"
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  next();
});

// * For sidebar_tags table
app.get("/sidetags", (req, res) => {
  knex
    .select()
    .from("sidebar_tags")
    .then((tags) => {
      res.send(tags);
    });
});

app.post("/sidetags", (req, res) => {
  knex("sidebar_tags")
    .insert({
      main_tag: req.body.main_tag,
      sub_tags: req.body.sub_tags,
    })
    .then(() => {
      knex
        .select()
        .from("sidebar_tags")
        .then((tags) => {
          res.send(tags);
        });
    });
});

app.put("/sidetags/:id", (req, res) => {
  knex("sidebar_tags")
    .where("id", req.params.id)
    .update({
      main_tag: req.body.main_tag,
      sub_tags: req.body.sub_tags,
    })
    .then(() => {
      knex
        .select()
        .from("sidebar_tags")
        .then((tags) => {
          res.send(tags);
        });
    });
});

app.delete("/sidetags/:id", (req, res) => {
  knex("sidebar_tags")
    .where("id", req.params.id)
    .del()
    .then(() => {
      knex
        .select()
        .from("sidebar_tags")
        .then((tags) => {
          res.send(tags);
        });
    });
});

app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
