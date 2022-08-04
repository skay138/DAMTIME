const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const port = 4000; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용
const crypto = require("crypto");

let corsOptions = {
  origin: "*",
  credential: true,
};

var connection = mysql.createConnection({
  /// 새로 추가된 부분
  host: "damtabase.cvg2imyxpe0d.ap-northeast-2.rds.amazonaws.com",
  user: "root", // mysql에 아이디를 넣는다.
  port: 3306,
  password: "dnjsrl0612", // mysql의 비밀번호를 넣는다.
  database: "dambase", //위에서 만든 데이터베이스의 이름을 넣는다.
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("requested");
});

app.get("/seocho", (req, res) => {
  connection.query("SELECT * FROM seocho", function (err, rows, fields) {
    if (err) {
      console.log("불러오기 실패");
    } else {
      console.log("불러오기 성공");
      res.send(rows);
    }
  });
});

app.get("/userpin", (req, res) => {
  connection.query("SELECT * FROM userpin", function (err, rows, fields) {
    if (err) {
      console.log("불러오기 실패");
    } else {
      console.log("불러오기 성공");
      res.send(rows);
    }
  });
});

app.post("/insert", (req, res) => {
  var User = req.body.UserId;
  var Location = req.body.Location;
  var lat = req.body.Latitude;
  var lon = req.body.Longitude;
  var type = req.body.FacilityType;
  var des = req.body.Description;
  var img = req.body.ImgUrl;

  console.log(Location, lat, lon, type);

  const sqlQuery =
    "INSERT INTO userpin (UserId ,FacilityType, Location, Longitude, Latitude, Description, ImgUrl) VALUES (?,?,?,?,?,?,?);";
  connection.query(
    sqlQuery,
    [User, type, Location, lon, lat, des, img],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/damregister", (req, res) => {
  const id = req.body.userid;
  const pw = req.body.userpw;

  connection.query(
    "select userid from login where userid=?;",
    [id],
    function (err, idck) {
      if (idck.length) {
        res.send("아이디중복");
      } else {
        crypto.randomBytes(64, (err, buf) => {
          //salt는 생성하는 해시값 이외에 추가적인 암호화 값
          const salt = buf.toString("base64");
          console.log("salt :: ", salt);
          //crypto.pbkdf2의 salt 뒤 숫자 파라미터는 임의의 값으로 주어준다.
          crypto.pbkdf2(pw, salt, 10, 64, "sha512", (err, key) => {
            console.log("password :: ", key.toString("base64")); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='

            // 쿼리 작성하여 전달
            const sql =
              "INSERT INTO login (userid, userpw, salt) values (?,?,?);";
            const param = [id, key.toString("base64"), salt];
            connection.query(sql, param, (err, data) => {
              if (!err) {
                res.send("success");
              } else {
                res.send(err);
              }
            });
          });
        });
      }
    }
  );
});

app.get("/damlogin", (req, res) => {
  const id = req.body.userid;
  const pw = req.body.userpw;

  connection.query(
    "select userid from login where userid=?;",
    [id],
    function (err, idck) {
      if (idck.length) {
        connection.query(
          "select userpw , salt from login where userid=?;",
          [id],
          function (err, pwck) {
            crypto.pbkdf2(pw, pwck[0].salt, 10, 64, "sha512", (err, key) => {
              console.log(
                "비밀번호 일치 여부 :: ",
                key.toString("base64") === pwck[0].userpw
              );
              // true : 아이디, 비밀번호 일치
              // false : 아이디 일치, 비밀번호 불일치
              res.send(key.toString("base64") === pwck[0].userpw);
            });
          }
        );
      } else {
        res.send("아이디가 존재하지 않습니다.");
      }
    }
  );
});

app.post("/report", (req, res) => {
  var No = req.body.pinNo;
  var reporttype = req.body.selected;
  var loc = req.body.pininfo;
  var lat = req.body.lat;
  var lon = req.body.lon;
  var text = req.body.text;
  var userid = req.body.userid;

  const sqlQuery =
    "INSERT INTO report (pinNo, type, Location, lat, lon, Description, UserId) VALUES (?,?,?,?,?,?,?);";
  connection.query(
    sqlQuery,
    [No, reporttype, loc, lat, lon, text, userid],
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/getmypin", (req, res) => {
  var userid = req.query.userid;
  console.log(userid);

  const sqlQuery = "SELECT * FROM userpin Where userid = ?,";
  connection.query(sqlQuery, [userid], (err, result) => {
    res.send(result);
  });
});

// app.listen(port, () => {
//   console.log(`Connected at http://localhost:${port}`);
// });

const options = {
  ca: fs.readFileSync("/etc/letsencrypt/live/damtime.kro.kr/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/damtime.kro.kr/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/damtime.kro.kr/cert.pem"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Connected at http://localhost:${port}`);
});

//FROM pro AS A
// INNER JOIN info AS B
// ON A.num = B.num; -> 다른 데이블 값 가져오기
