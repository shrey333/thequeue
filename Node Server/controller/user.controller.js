const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;

let {user} = require('../model/user.model');

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('unauthorized request');
  }
  req.userId = payload.subject;
  next();
}

// => localhost:3000/users/

/*router.get('/', (req, res) => {
  user.find((err, docs) => {
    if (!err) {
      console.log(docs);
      res.send(docs);
    } else {
      console.log('Error in Retrieving users :' + JSON.stringify(err, undefined, 2));
    }
  });
});*/

router.route('/:id').get((req, res) => {
  user.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

/*router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  console.log(req.params.id);
  user.findById(req.params.id, (err, doc) => {
    if (!err) {
      console.log(doc);
      res.send(doc);
    } else {
      console.log('Error in Retrieving user :' + JSON.stringify(err, undefined, 2));
    }
  });
});*/

router.post('/', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    let data = new user({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dateofbirth: req.body.dateofbirth,
      email: req.body.email,
      password: hash,
      mobilenumber: req.body.mobilenumber,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode
    });
    let userid = data._id;
    data.save().then((docs) => {
      let payload = {subject: docs._id};
      let token = jwt.sign(payload, 'secretKey');
      console.log(docs);
      res.send({usertoken: token, userid: userid});
    });
  });
});

router.post('/find', (req, res) => {
  let data = req.body;
  console.log('in login');
  user.findOne({email: data.email}, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if(!user){
          res.status(200).send('No other mail');
      }
      else{
        res.status(401).send('Yes mail exists');
      }
    }
  });
});

router.post('/login', (req, res) => {
  let data = req.body;
  console.log('in login');
  user.findOne({email: data.email}, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send('Invalid email');
      } else {
        console.log('in bcrypt');
        bcrypt.compare(data.password, user.password, function (err, match) {
          if (match === true) {
            let userid = user._id;
            let payload = {subject: user._id};
            let token = jwt.sign(payload, 'secretKey');
            console.log('logged in successfully');
            res.status(200).send({usertoken: token, userid: userid});
          } else {
            //console.log('data.password: ' + data.password + ' user.password: ' + user.password);
            console.log('Incorrect credential');
            res.status(401).send('Invalid password');
          }
        });
        /*if (user.password !== data.password) {

        } else {

        }*/
      }
    }
  });
})
/*
router.put('/:id', verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  user.findOneAndUpdate({_id: req.params.id}, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  });
});*/

router.route('/:id').put(verifyToken, (req, res, next) => {
  user.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

/*router.delete('/:id', verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  user.findOneAndRemove({
    _id: req.params.id
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});*/

router.route('/:id').delete( (req, res, next) => {
  user.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

router.post('/check', (req, res, next) => {

  user.findOne(req.body)
    .then(user => {
      // No customer with the same email in the database
      console.log(user);
      if (user) {
        console.log('user found');
        return res.json({
          taken: true
        });
      }else {
        // Validate the 'create user' form
        console.log('user not found');
        res.json({
          taken: false
        })
      }
    })
    .catch(error => {
      res.json({
        taken: true
      })
    });
});

module.exports = router;
