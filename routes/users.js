var express = require('express');
var router = express.Router();
var db = require('../models/index')
var request = require('request')
var testController = require('./test')

/* GET users listing. */


router.get('/:page', (req, res) => {
  let limit = 4;   // number of records per page
  let offset = 0;
  db.User.findAndCountAll()
    .then((data) => {
        console.log(data)
      let page = req.params.page;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      console.log(offset)
      db.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'dateOfBirth'],
        limit: limit,
        offset: offset,
        $sort: { id: 1 }
      })
        .then((users) => {
          res.status(200).json({ 'result': users, 'count': data.count, 'pages': pages });
          console.log(users + "disini")
        });
    })
    .catch(function (error) {
      res.status(500).send('Internal Server Error');
    });
});
// var data = []
// router.get('/',  (req, res,next) => {
//   request('http://localhost:3000/users/1',  (error, response, body) => {
//       if(error) { 
//           res.json('An erorr occured')
//           console.log(error)
//       }
//       else {
//           let result = JSON.parse(body)
//           res.send(result.data)
//           data.push(result.data)
//       }
//       console.log(data + "ini")
  
//       const save_data = db.User.create(data)

//       if (save_data) {
//           console.log("data saved")
//       }else{
//           return res.status(400).json(response(false, error))
//       }
//   });
// });

router.get('/api', testController.getRecipes)

module.exports = router;
