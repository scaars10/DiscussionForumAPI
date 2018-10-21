var Comment = require('./comment-model');

module.exports.createComment = (req, res)=>{
  if(!req.body.parentId || !req.body.username || !req.body.body){
    return res.status(400).send("Missing Info");
  }
  var commentData = {
    parentId: req.body.parentId,
    username: req.body.username,
    body: req.body.body,
    createdAt: req.body.createdAt,
    favorites: req.body.favorites
  };
  var newComment = new Comment(commentData);
  newComment.save().then((doc)=>{
    console.log(doc);
    return res.status(200).send("Comment successfully created");
  }, (err)=>{
    console.log(err);
    return res.status(500).send("Database experiencing Difficulties");
  });
};

module.exports.getComment = (req, res)=>{

}
