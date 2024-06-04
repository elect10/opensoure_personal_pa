/* NPM Modules */
const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { parse } = require("date-fns");

/* User Modules */
const db = require("./modules/DBconfig");
const { login, auth } = require("./modules/JWTauth");

/* express config */
const app = express();
const port = 3000;

app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/my-app/build/"));
  app.use(cookieParser());
  
  /* Database Connect */
  db.connect((err) => {
    if (err) throw err;
    console.log("DB is Connected");
  });