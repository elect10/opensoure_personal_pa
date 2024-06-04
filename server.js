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

  /* SignUp 회원가입 */
app.post("/api/signup", async (req, res, next) => {
    // id 중복 확인
    const { username, id, password, phone, department } = req.body;
  
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };
    const result = await db.query(query);
  
    if (result.rows.length > 0) {
      return res.status(400).json({ message: "studentid already exists" });
    } else {
      return next();
    }
  });
  
  app.post("/api/signup", async (req, res) => {
    // id 생성
    const { username, id, password, department, phone } = req.body;
  
    const query = {
      text: "INSERT INTO users (username, id, password, phone, department) VALUES ($1, $2, $3, $4, $5)",
      values: [username, id, password, phone, department],
    };
    const result = await db.query(query);
  
    return res.status(200).json({ message: "Success create new account" });
  });


/* SignIn */
app.post("/api/signin", async (req, res) => {
    const { id, password } = req.body;
  
    const query = {
      text: "SELECT * FROM users WHERE id = $1 AND password = $2",
      values: [id, password],
    };
    const result = await db.query(query);
  
    if (result.rows.length == 0) {
      return res.status(400).json({ message: "Signin failed." });
    } else {
      const payload = {
        id,
      };
      jwt.sign(payload, process.env.KEY, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          return res.status(400).json({ message: "token create failed." });
        } else {
          res.cookie("user", token, {
            maxAge: 30 * 60 * 1000,
            httpOnly: false,
            sameSite: "None",
            secure: true,
          });
          return res
            .status(200)
            .json({ token: token, message: "signin success" });
        }
      });
    }
  });


/* Main page search */
app.post("/api/search", auth, async (req, res) => {
    const { status, position, stack } = req.body;
  
    let positionStr;
    switch (position) {
      case "Front-end":
        positionStr = "front_req";
        break;
      case "Back-end":
        positionStr = "back_req";
        break;
      case "Designer":
        positionStr = "design_req";
        break;
      default:
        return res.status(400).json({ message: "position error" });
    }
  
    await db.query("UPDATE posts SET isEnd = true WHERE enddate < NOW()::Date");
  
    const query = {
      text:
        "SELECT * FROM posts WHERE " +
        positionStr +
        " > 0 AND (stack | $1) > 0 AND isEnd = $2",
      values: [stack, status],
    };
    const result = await db.query(query);
  
    return res.status(200).json(result.rows);
  });

  /* Post page */
app.post("/api/post", auth, async (req, res) => {
    const { postid, id } = req.body;
  
    await db.query("UPDATE posts SET isEnd = true WHERE enddate < NOW()::Date");
  
    const query = {
      text: "SELECT * FROM posts WHERE id = $1",
      values: [postid],
    };
    const result = await db.query(query);
  
    const query2 = {
      text: "SELECT 1 FROM teams WHERE postid = $1 AND userid = $2",
      values: [postid, id],
    };
    isAttend = await db.query(query2);
  
    result.rows[0].isAttend =
      isAttend.rows.length > 0 || result.rows[0].userid == id;
  
    return res.status(200).json(result.rows[0]);
  });


  /* Evaluate Page */
app.post("/api/end_post", auth, async (req, res) => {
    const { postid, id } = req.body;
  
    const userid_query = {
        text: "SELECT u.username, u.id FROM users u WHERE (u.id IN (SELECT t.userid FROM teams t WHERE  t.postid = $1)) AND (u.id NOT IN (SELECT e.teamid FROM evaluate e WHERE e.userid = $2)) AND u.id != $2",
      values: [postid, id],
    };
    const result = await db.query(userid_query);
    return res.status(200).json(result.rows);
  });
  
  /* Post apply */
  app.post("/api/apply", auth, async (req, res) => {
    const { id, postid, position } = req.body;
  
    const query = {
      text: "INSERT INTO applicant VALUES ($1, $2, $3)",
      values: [postid, id, position],
    };
    await db.query(query);
  
    const query2 = {
      text: "INSERT INTO apply_post VALUES ($1, $2)",
      values: [id, postid],
    };
    await db.query(query2);
    /*
    switch (position) {
      case 'Front-end':
        positionStr = 'front_req';
        break;
      case 'Back-end':
        positionStr = 'back_req';
        break;
      case 'Designer':
        positionStr = 'design_req';
        break;
      default:
        return res.status(400).json({ message: 'position error' });
    }
  
    const query3 = {
      text:
        'UPDATE posts SET ' +
        positionStr +
        ' = ' +
        positionStr +
        ' - 1 WHERE id = $1',
      values: [postid],
    };
    await db.query(query3);
  */
    return res.status(200).json({ message: "apply success." });
  });
  
  /* Evaluate submit */
  app.post("/api/evaluate", auth, async (req, res) => {
    const { userid, perform, commute, prepare, commitment } = req.body;
  
    try {
      const query = {
        text: "SELECT * FROM users WHERE id = $1",
        values: [userid],
      };
      result = await db.query(query);
  
      result.rows[0].total += 1;
      result.rows[0].perform += perform;
      result.rows[0].commute += commute;
      result.rows[0].prepare += prepare;
      result.rows[0].commitment += commitment;
  
      const query2 = {
        text: "UPDATE users SET total = $1, perform = $2, commute = $3, prepare = $4, commitment = $5 WHERE id = $6",
        values: [total, perform, commute, prepare, commitment, userid],
      };
      await db.query(query2);
  
      const query3 = {
          text: "INSERT INTO evaluate (userid, teamid) VALUES ($1, $2)",
          values: [id, userid]
      };
      await db.query(query3);
  
      return res.status(200).json({ message: "evaluation success." });
    } catch {
      return res.status(400).json({ message: "evaluation failed." });
    }
  });

  /* Posting */
app.post("/api/posting", auth, async (req, res) => {
    const {
      id,
      projectname,
      front_req,
      back_req,
      design_req,
      stack,
      location,
      post_text,
      enddate,
    } = req.body;
  
    const enddate_date = parse(enddate, "yyyyMMdd", new Date());
    try {
      const query = {
        text: 'INSERT INTO posts (userid, projectname, front_req, back_req, design_req, post_text, stack, location, startdate, enddate, isEnd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()::Date, $9, false) RETURNING id',
        values: [
          id,
          projectname,
          front_req,
          back_req,
          design_req,
          post_text,
          stack,
          location,
          enddate_date,
        ],
      };
      const result = await db.query(query);
      const postid = result.rows[0].id;
  
      const query2 = {
        text: 'INSERT INTO teams (postid, userid) VALUES ($1, $2)',
        values: [postid, id],
      };
      await db.query(query2);
  
      return res.status(200).json({ message: "posting success" });
    } catch (err) {
      return res.status(400).json({ message: "posting failed" });
    }
  });