var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
  res.render('helloworld', {
    title: 'Hello, World!'
  });
});

/* GET Userlist page. */
router.get('/userlist', function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function (e, docs) {
    res.render('userlist', {
      "userlist": docs
    });
  });
});

/* GET New User page. */
router.get('/newuser', function (req, res) {
  res.render('newuser', {
    title: 'Add New User'
  });
});

/* GET Edit User page. */
router.get('/edituser/:username', function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.findOne({username: req.params.username}, function (e, docs) {
    res.render('edituser', {
      title: 'Edit user',
      "user": docs
    });
  });
});

router.post('/editeduser/:oldname', function (req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  var collection = db.get('usercollection');

  console.log(req.params.oldname);
  console.log(userName);
  console.log(userEmail);

  collection.update({'username': req.params.oldname}, {$set: {'username': userName, 'email': userEmail}}, (err, item) => {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      // And forward to success page
      res.redirect("/userlist");
    }
  })
});

router.get('/deleteuser/:username', function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');

  collection.findOneAndDelete({username: req.params.username}).then( (doc) => {
      res.redirect("/userlist");
  })
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.insert({
    "username": userName,
    "email": userEmail
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      // And forward to success page
      res.redirect("userlist");
    }
  });

});

module.exports = router;