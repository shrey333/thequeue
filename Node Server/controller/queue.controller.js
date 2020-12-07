const express = require('express');
const jwt = require('jsonwebtoken');
let router = express.Router();
let { queue } = require('../model/queue.model');

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
  req.queueId = payload.subject;
  next();
}

// => localhost:3000/queues/

/*router.get('/', (req, res) => {
  queue.find()
  queue.find((err, docs) => {
    if (!err) {
      console.log(docs);
      res.send(docs);
    } else {
      console.log('Error in Retrieving queues :' + JSON.stringify(err, undefined, 2));
    }
  });
});*/

router.route('/users/:id').get((req, res) => {
  queue.find({userid: req.params.id}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/merchants/:id').get((req, res) => {
  queue.find({merchantid: req.params.id}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.post('/', (req, res) => {
  queue.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

/*
router.put('/:id', verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  queue.findOneAndUpdate({_id: req.params.id}, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  });
});*/

/*router.route('/:id').put(verifyToken, (req, res, next) => {
  queue.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})*/

/*router.delete('/:id', verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  queue.findOneAndRemove({
    _id: req.params.id
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});*/

router.route('/:id').delete((req, res, next) => {
  console.log('Deleting items');
  queue.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;
