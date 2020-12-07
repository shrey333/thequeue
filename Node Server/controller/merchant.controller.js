const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;

let {merchant} = require('../model/merchant.model');

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
  req.merchantId = payload.subject;
  next();
}

// => localhost:3000/merchants/

router.get('/', (req, res) => {
  merchant.find((err, docs) => {
    if (!err) {
      console.log(docs);
      res.send(docs);
    } else {
      console.log('Error in Retrieving merchants :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.route('/:id').get((req, res) => {
  merchant.findById(req.params.id, (error, data) => {
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
  merchant.findById(req.params.id, (err, doc) => {
    if (!err) {
      console.log(doc);
      res.send(doc);
    } else {
      console.log('Error in Retrieving merchant :' + JSON.stringify(err, undefined, 2));
    }
  });
});*/

router.post('/', (req, res) => {
  console.log(req.body.email + ' ' + req.body.password);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    let data = new merchant({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      shopname: req.body.shopname,
      email: req.body.email,
      password: hash,
      mobilenumber: req.body.mobilenumber,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode
    });
    let merchantid = data._id;
    data.save().then((docs) => {
      let payload = {subject: docs._id};
      let token = jwt.sign(payload, 'secretKey');
      console.log(docs);
      res.send({merchanttoken: token, merchantid: merchantid});
    });
  });
});

router.post('/login', (req, res) => {
  let data = req.body;
  console.log('in login');
  console.log(req.body);
  merchant.findOne({email: data.email}, (error, merchant) => {
    if (error) {
      console.log(error);
    } else {
      if (!merchant) {
        res.status(401).send('Invalid email');
      } else {
        console.log('in bcrypt');
        bcrypt.compare(data.password, merchant.password, function (err, match) {
          if(err){
            console.log(err);
          }
          if (match === true) {
            let merchantid = merchant._id;
            let payload = {subject: merchant._id};
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({merchanttoken: token, merchantid: merchantid});
          } else {
            console.log('data.password: ' + data.password + ' merchant.password: ' + merchant.password);
            console.log('Incorrect');
            res.status(401).send('Invalid password');
          }
        })

      }
    }
  });
})
/*
router.put('/:id', verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  merchant.findOneAndUpdate({_id: req.params.id}, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  });
});*/

router.route('/:id').put(verifyToken, (req, res, next) => {
  merchant.findByIdAndUpdate(req.params.id, {
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

  merchant.findOneAndRemove({
    _id: req.params.id
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});*/

router.route('/:id').delete( (req, res, next) => {
  merchant.findOneAndRemove(req.params.id, (error, data) => {
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

  merchant.findOne(req.body)
    .then(merchant => {
      // No customer with the same email in the database
      if (!merchant) {
        return res.json({
          taken: true
        });
      }else {
        // Validate the 'create user' form
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
