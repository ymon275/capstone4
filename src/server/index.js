const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.API_PORT || 5050;
const knex = require("./db/knex");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
// * Allows the requests to be sent from any origin
app.use((req, res, next) => {
  // ! ACAO needs to be changed to "http://localhost:3000"
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token, x-access-token"
  );
  next();
});
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "jabsf9tg9a8w4qharvaesdiftu");
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  next();
};
const verifyMasterToken = (req, res, next) => {
  // ! Add to verify a master user
  next();
};

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
// * End of Sidebar tags

// * For Inventory management
app.get("/inventory", (req, res) => {
  knex
    .select()
    .from("inventory")
    .then((result) => res.send(result));
});
// ! Implement verifyMasterToken
app.post("/inventory", verifyMasterToken, async (req, res) => {
  const { id, title, description, tags, name, image } = req.body;
  if (!(id && title && tags && description && name && image)) {
    res.status(400).send("All input is required");
  }
  const oldId = await await knex("inventory").where("id", id).first();
  if (oldId) {
    res.status(409).send("Id is already used");
  }
  knex("inventory")
    .insert({
      id: id,
      title: title,
      name: name,
      image: image,
      tags: tags,
      description: description,
    })
    .then((result) => {
      knex("inventory")
        .where("id", id)
        .first()
        .then((result) => res.send(result));
    });
});
// * Ending Inventory management

// * For JWT Token Auth => (
app.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUsers = await await knex
      .select()
      .from("users")
      .where("email", email)
      .then((result) => result);
    const oldUser = oldUsers[0];
    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login.");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create token
    const token = jwt.sign(
      { username: username, email: email, password: encryptedPassword },
      "jabsf9tg9a8w4qharvaesdiftu",
      {
        expiresIn: "2h",
      }
    );

    // Create user in our database
    knex("users")
      .insert({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
        token: token,
      })
      .then((result) => {
        knex
          .select()
          .from("users")
          .where("email", email.toLowerCase())
          .then((user) => res.status(200).send(user));
      });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const users = await await knex
      .select()
      .from("users")
      .where("email", email)
      .then((result) => result);
    const user = users[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { username: user.username, email: user.email, password: user.password },
        "jabsf9tg9a8w4qharvaesdiftu",
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      // save user token
      knex("users").where("email", email).update(user);

      // user
      res.status(200).send(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
});
// * )

app.get("/user", verifyToken, (req, res) => {
  res.send(req.user);
});

app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
