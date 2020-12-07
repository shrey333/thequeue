const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TheQueue', { useNewUrlParser : true, useUnifiedTopology: true }, (err) => {
  if (!err)
    console.log('MongoDB connection succeeded.');
  else
    console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
