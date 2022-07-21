const express = require("express");
const app = express();
const port = 4000; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

let corsOptions = {
    origin : "*",
    credential : true,
};

var connection = mysql.createConnection({
  /// 새로 추가된 부분
  host: "localhost",
  user: "damdam", // mysql에 아이디를 넣는다.
  password: "1q2w3e4r", // mysql의 비밀번호를 넣는다.
  database: "pintest", //위에서 만든 데이터베이스의 이름을 넣는다.
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("requested")
});

app.get("/api", (req, res) => {
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
  var Location = req.body.Location;
  var lat = req.body.Latitude;
  var lon = req.body.Longitude;
  console.log(Location, lat, lon)

  const sqlQuery = "INSERT INTO userpin (Location, Longitude, Latitude) VALUES (?,?,?);";
  connection.query(sqlQuery, [Location, lon, lat], (err,result) =>{
    res.send(result);
  })
});

app.listen(port, () => {
  console.log(`Connected at http://localhost:${port}`);
});