const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

const User = mongoose.model('User', userSchema);

module.exports = { User };
