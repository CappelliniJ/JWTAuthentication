require("dotenv").config();

const express = require("express");
const app = express();
const {
  models: { User },
} = require("./db");
const path = require("path");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/api/auth", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/auth", async (req, res, next) => {
  try {
    // res.send(await User.byToken(req.headers.authorization));
    const token = req.headers.authorizationconst;
    id = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(id);

    if (req.user) {
      res.json(req.user);
    }
  } catch (ex) {
    next(ex);
  }
});

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
