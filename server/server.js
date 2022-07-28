const express = require("express");
const app = express();
const port = 4000; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

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
  var Location = req.body.Location;
  var lat = req.body.Latitude;
  var lon = req.body.Longitude;
  var type = req.body.FacilityType;
  var des = req.body.Description;

  console.log(Location, lat, lon, type);

  const sqlQuery =
    "INSERT INTO userpin (FacilityType, Location, Longitude, Latitude, Description) VALUES (?,?,?,?,?);";
  connection.query(sqlQuery, [type, Location, lon, lat, des], (err, result) => {
    res.send(result);
  });
});

app.post("/damregister", (req, res) => {
  
  const id = req.body.userid;
  const pw = req.body.userpw;
  
  console.log(id, pw);
  
  connection.query("select userid from login where userid=?", [id], function (err, rows) {
    if(rows.length){
      console.log(rows);
    }else{
      const sqlQuery = "insert into login (userid, userpw) values (?,?);";
      connection.query(sqlQuery, [id, pw], (err, result) => {
        res.send(result);
        console.log(rows);
      });
    }
  })
});

app.post("/damlogin", (req, res) => {
  const id = req.body.userid;
  const pw = req.body.userpw;
  
  const sqlQuery =
    "INSERT INTO login (userid, userpw) VALUES (?,?);";
  connection.query(sqlQuery, [id, pw], (err, result) => {
    res.send(result); //로그인
});
});


app.post("/report", (req, res) => {
  var selected = req.body.selected;
  var lat  = req.body.lat;
  var lon = req.body.lon;

  console.log(selected, lat, lon);

  const sqlQuery =
    "INSERT INTO report (selected, lat, lon) VALUES (?,?,?);";
  connection.query(sqlQuery, [selected, lat, lon], (err, result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Connected at http://localhost:${port}`);
});

//FROM pro AS A 
// INNER JOIN info AS B 
// ON A.num = B.num; -> 다른 데이블 값 가져오기