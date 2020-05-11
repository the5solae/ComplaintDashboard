let mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'AppUsers'
}); 
let connection2 = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'Complaints'
}); 

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  // Uncomment below lines for first time to create a table in database
  // let sql = "CREATE TABLE users (email VARCHAR(255), password VARCHAR(255))";
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  console.log('connected as id ' + connection.threadId);
});

connection2.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  /*let sql = "CREATE TABLE users_complaints (
    email varchar(100)  NOT NULL,
    title varchar(100)  NOT NULL,
    businessUnit varchar(50),
    location varchar(50),
    description varchar(1000)  NOT NULL,
    status varchar(100))";
    connection2.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
  });*/
  console.log('connected as id ' + connection2.threadId);
});

exports.register = async function(req,res){
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)

  let users={
     "email":req.body.email,
     "password":encryptedPassword
   }
  
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else {
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
      }
  });
}

exports.login = async function(req,res){
  let email= req.body.email;
  let password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].password)
        if(comparision){
            res.send({
              "code":200,
              "success":"login sucessfull"
            })
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
          });
      }
    }
  });
}

exports.complaint = async function(req,res){
  let complaint={
     "email":req.body.email,
     "title":req.body.title,
     "businessUnit":req.body.businessUnit,
     "location": req.body.location,
     "description":req.body.description,
     "status": req.body.status
   }
  
  connection2.query('INSERT INTO users_complaints SET ?',complaint, function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurr",
        "error": error.message
      })
    } else {
      res.send({
        "code":200,
        "success":"Complaint Recorded"
          });
      }
  });
}

exports.getcomplaints = async function(req,res){
  let email= req.body.email;

  connection2.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        res.send({
          "code":200,
          "success":results[0]
        })
      }
      else{
        res.send({
          "code":206,
          "success":"You have no complaints"
          });
      }
    }
  });
}