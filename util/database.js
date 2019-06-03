const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://patilnamrata:mongoDB%212019@cluster0-5fnez.mongodb.net/test?retryWrites=true"
  )
    .then(client => {
      console.log("Successfully Connected!");
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;
