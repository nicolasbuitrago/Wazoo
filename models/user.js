var mongoose = require("mongoose"),
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

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
      required: true
    },
	password:{
      type: String,
      required: true
    },
  address: String
});

User.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // Almacena la clave encriptada
          user.password = hash;
          next();
      });
  });
});

User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

mongoose.model("User",User);

module.exports = mongoose.model('User', User);