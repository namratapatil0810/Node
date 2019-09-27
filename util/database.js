const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;


const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://namrata:WwdEeu9sj8cqXSyg@cluster0-yqrqg.mongodb.net/test?retryWrites=true&w=majority"
  )
    .then(client => {
      console.log("Successfully Connected!");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb =() =>{
  if(_db){
    return _db;
  }
  throw "No database found!"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;