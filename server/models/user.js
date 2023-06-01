const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre('save', function (next) {
  var user = this; // userSchema

  // 비밀번호가 변경되었을 경우에만 실행
  if (user.isModified('password')) {
    // salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      // 비밀번호 해시화
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; // 해시화된 비밀번호로 변경
        next();
      });
    });
  } else {
    next(); // 비밀번호가 변경되지 않았을 경우 다음으로 넘어감
  }
});

// 비밀번호 확힌 메소드
userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    const user = this; // this = userSchema
    return await bcrypt.compare(plainPassword, user.password);
  } catch (err) {
    throw new Error(err);
  }
};

// 토큰 생성 메소드
userSchema.methods.generateToken = async function () {
  const user = this;

  const token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  await user.save();

  return token;
};

// 토큰 복호화 메소드
userSchema.statics.findByToken = async function (token) {
  const user = this;

  // 유저 아이디를 이용해서 유저를 찾은 다음에
  // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

  try {
    const decoded = jwt.verify(token, 'secretToken');
    const foundUser = await user.findOne({ _id: decoded, token: token });
    return foundUser;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
