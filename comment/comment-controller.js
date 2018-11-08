var Comment = require('./comment-model');
var commController = require('../community/community-controller');
var threadController = require('../thread/thread-controller')
module.exports.createComment = (req, res)=>{
  console.log(req.body.parentId);
  console.log(req.body.body);
  console.log(req.body.username);
  if(!req.body.parentId || !req.body.username || !req.body.body){
    return res.status(400).send("Missing Info");
  }
  commController.findCommunity(req.params.community, (err, community)=>{

    if(err || community==undefined){
      return res.status(400).send("No such community exists or database experiencing difficulties");
    }

    console.log(req.params.threadId);
    threadController.findThread(req.params.threadId, (err, thread)=>{
      if(err || thread==undefined){
        return res.status(400).send("No such thread exists or database experiencing difficulties");
      }
      var commentData = {
        parentId: req.body.parentId,
        username: req.body.username,
        body: req.body.body,
        createdAt: req.body.createdAt,
        favorites: req.body.favorites,

      };
      var newComment = new Comment(commentData);
      newComment.save().then((doc)=>{
        console.log(doc);
        return res.status(200).json(doc);
      }, (err)=>{
        console.log(err);
        return res.status(500).send("Database experiencing Difficulties");
      });
    });
  });
};

module.exports.getComment = (req, res)=>{

}
