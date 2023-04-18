const router = require("express").Router();

const { User, Thought } = require("../../models");

router.post("/",(req,res)=>{
  const newUser=new User({
    username:req.body.
  })
})

router.get("/", (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
