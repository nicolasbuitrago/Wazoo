const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');
// const uniqueValidator =require('mongoose-unique-validator');

var User = mongoose.Schema({
	name:{//type: String,required: true
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
	email:{
      type: String,
      unique: true,
      lowercase:true,
      index: true,
      required: true
    },
	passwordHash:{
      type: String,
      required: true
    },
  address: String,
  favorites:[{ type: Schema.Types.ObjectId, ref: 'Restaurant' }]
  },
  { timestamps: true }
);

User.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('passwordHash')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.passwordHash, salt, function(err, hash) {
          if (err) return next(err);

          // Almacena la clave encriptada
          user.passwordHash = hash;
          next();
      });
  });
});

User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.passwordHash, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

User.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// User.methods.generateResetPasswordLink = function generateResetPasswordLink() {
//   return `${process.env
//     .HOST}/reset_password/${this.generateResetPasswordToken()}`;
// };

User.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      confirmed: this.confirmed
    },
    "secretKey"
  );
};

// User.methods.generateResetPasswordToken = function generateResetPasswordToken() {
//   return jwt.sign(
//     {
//       _id: this._id
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );
// };

User.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT()
  };
};

// User.plugin(uniqueValidator, { message: "This email is already taken" });

module.exports = mongoose.model('User', User);