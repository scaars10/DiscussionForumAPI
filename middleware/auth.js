var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  if(!req.headers['token']){
    return res.status(400).send("Please verify your ID");
  }

  var token = req.headers.token;
  jwt.verify(token, req.app.settings.superSecret, (err, decoded) =>{
    if(err){
      return res.status(400).send("Invalid Token");
    }
    req.user = decoded;
    next();
  })
}
