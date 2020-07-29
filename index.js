const app = require('./app');
const config = require('./config')
const mongoose = require('mongoose');
const MONGO_URI = "mongodb://localhost:27017/AA-hack"
    // 'mongodb+srv://siddhant-user-1:%40siddhant-user-1@cluster0.3lkhs.mongodb.net/AA-hack?retryWrites=true&w=majority'

app.listen(config.port, () => {
  mongoose.connect(MONGO_URI, {useNewUrlParser: true})
      .then(() => console.log('Connected To Db'))
      .catch(error => console.error(error));
  console.log('App running on port ' + config.port);
});