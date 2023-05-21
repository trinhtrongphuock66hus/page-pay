const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // thêm middleware body-parser

app.use(cors()); // thêm cors middleware

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'users',
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối: ' + err.stack);
    return;
  }

  console.log('Kết nối thành công với id ' + connection.threadId);
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM diachi', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/users', (req, res) => {
  const { name , address, phonenumber } = req.body;
  connection.query(`INSERT INTO diachi (name, address, phone) VALUES ('${name}', '${address}', '${phonenumber}')`, (error, results, fields) => {
    if (error) throw error;
    console.log(`Thêm địa chỉ mới thành công: `, { name , address, phonenumber });
    res.send({ message: 'Đặt hàng thành công' });
  });
});

app.listen(3000, () => {
  console.log('Server đang chạy trên cổng 3000');
});