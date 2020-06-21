const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
 const dbname = 'conFusion';

var dboper = require('./operations');

MongoClient.connect(url, function(err,client) {
    assert.equal(err,null); // establish that there was no error connecting to server
    console.log('Connected correctly to server');
     const db = client.db(dbname);
    dboper.insertDocument(db, {name: 'insertyDoc', description: 'insertyDescription'}, 'dishes', function (result) {
      console.log(result.ops);
    });
  });



















// var MongoClient = require('mongodb').MongoClient,
//     assert = require('assert');

// var dboper = require('./operations');
// // connecting to the database server
// const url = 'mongodb://localhost:27017/';
// const dbname = 'conFusion';

// // use connect method to connect to the server
// MongoClient.connect(url, function(err,client) {
//   assert.equal(err,null); // establish that there was no error connecting to server
//   console.log('Connected correctly to server');
//   const db = client.db(dbname);
//   dboper.insertDocument(db, {name: 'insertyDoc', description: 'insertyDescription'}, 'dishes', function (result) {
//     console.log(result.ops);// print out returned value
//     // now let's perform a find operation
//     dboper.findDocuments(db, 'dishes', function(docs) {
//       console.log(docs);
//       dboper.updateDocument(db, {name: 'insertyDoc'}, {description: 'newDescription'}, 'dishes', function(result) {
//         console.log(result.result);
//         dboper.findDocuments(db, 'dishes', function(docs) {
//           console.log(docs);

//           db.dropCollection('dishes', function(result) {
//             console.log(result);
//             client.close();
//           });
//         });
//       });
//     });

//   });
// });