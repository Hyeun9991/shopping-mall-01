const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const { User } = require('./models/user');

require('dotenv').config({ path: './config/.env' });
const config = require('./config/key');
const mongoose = require('mongoose');

const mongoURL = config.mongoURI;
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json()); // JSON 데이터를 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터를 파싱하기 위한 미들웨어
app.use(cookieParser());

app.post('/api/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res
      .status(201)
      .json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    let errorMessage = 'Unable to register user';
    if (err.code === 11000 && err.keyPattern.email === 1) {
      errorMessage = 'Email already exists';
    }
    res.status(400).json({ success: false, message: errorMessage });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('heurm server is listening to port ' + port);
});
