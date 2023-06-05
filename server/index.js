const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const { User } = require('./models/user');
const { auth } = require('./middleware/auth');

require('dotenv').config();
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

app.get('/', (req, res) => {
  res.json({ hello: 'I am happy to deploy our application' });
});

// 인증
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

// 회원가입
app.post('/api/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    const userData = await user.save();
    res.status(201).json({ success: true, userData });
  } catch (err) {
    let errorMessage = 'Unable to register user';
    if (err.code === 11000 && err.keyPattern.email === 1) {
      errorMessage = 'Email already exists';
    }
    res.status(400).json({ success: false, message: errorMessage });
  }
});

// 로그인
app.post('/api/users/login', async (req, res) => {
  try {
    // db에서 이메일 찾기
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });
    }

    // email이 있다면, DB에 저장된 비밀번호와 비교
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({ loginSuccess: false, message: 'wrong password' });
    }

    // password가 일치하면 token 생성
    const token = await user.generateToken();

    // token을 cookie에 저장
    res
      .cookie('x_auth', token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (error) {
    res.status(500).json({
      loginSuccess: false,
      message: 'An error occurred while logging in ',
    });
  }
});

// 로그아웃
app.get('/api/users/logout', auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '' }
    );

    if (!user) {
      return res.json({ success: false, message: 'Failed to logout' });
    }

    return res.status(200).send({ success: true });
  } catch (error) {
    next(err);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
