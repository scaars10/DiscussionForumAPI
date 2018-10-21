var User = require('./user-model');
var bcrypt = require('bcryptjs')
//var app = require('../server/server').app;
var salt = bcrypt.genSaltSync(13);
var jwt = require('jsonwebtoken');

module.exports.createUser = (req, res) =>{
  console.log('New request for User Registration')
  if(!req.body.username || !req.body.password){
    return res.status(400).send("Username or Email and Password Required");
  }
//
  var hashPassword = bcrypt.hashSync(req.body.password, salt);
var jwt = require('jsonwebtoken');
  var userData = {
    username: req.body.username,
    email: req.body.email,
    password: hashPassword
  }


  var newUser = new User(userData);

  newUser.save().then((doc)=>{
    //console.log('Saved ',doc);
    return res.status(200).send('Account successfully created');
  },(err)=> {
    if(err){
      return res.status(500).send("Username and Email should be unique");
    }

})};

module.exports.loginUser = (req, res) =>{
  //for performing copy and making new JSON copy
    getUser(req, res, (registeredUser)=>{
    var isVerified = bcrypt.compareSync(req.body.password, registeredUser.password);
    if(!isVerified){
      return res.status(400).send("Password Incorrect");
    }
//BUG!!!!!
//BUG resolved by performing deepcopy
//Password not deleted from RegisteredUser OBJECT
    // console.log(delete registeredUser.password);
    // console.log(registeredUser.prototype);
    // console.log(Object.prototype.toString.call(registeredUser));
    //Set the environment variable
    var token = jwt.sign(registeredUser, req.app.settings.superSecret, {expiresIn: 3600*1000*24});
    delete registeredUser.password;
    res.json({
      user: registeredUser,
      token: token
    });
  });

}

var getUser = function(req, res, callback){
  if(!req.body.login || !req.body.password){
    return res.status(400).send('UserID and Password Required');
  }
  User.find({$or: [{username: req.body.login}, {email: req.body.login}]}, (err, user)=>{
    if(err){
      return res.status(500).send("User does not Exist or difficulties in DB");

    }
    if(user.length<1){
      return res.status(400).send("No Account with the specified email");
    }
    if(user.length>1){
      console.log("Fatal Error! Multiple Accounts with same Login");
    }
    var edUser = user[0];
    var registeredUser = JSON.parse(JSON.stringify(edUser));
    callback(registeredUser);
  });
};
