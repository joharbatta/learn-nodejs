const assert=require('assert');


exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {
        assert.equal(err, null);
        console.log("Inserted " + result.result.n +
            " documents into the collection " + collection);
        callback(result);
    });
};






















// var assert = require('assert');

// exports.insertDocument = function(db, document, collection, callback) {
//   // get the documents collection
//   var coll = db.collection(collection);

//   // insert some documents
//   coll.insert(document, function(err, result) {
//     assert.equal(err, null);
//     console.log('Inserted ' + result.result.n +
//       ' documents into the document collection '
//       + collection);
//     callback(result);
//   });
// };

// exports.findDocuments = function (db, collection, callback) {
//   var coll = db.collection(collection);
//   // will return all documents in specified collection in array form
//   coll.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     callback(docs);
//   });
// }

// exports.removeDocument = function (db, document, collection, callback) {
//   var coll = db.collection(collection);
//   coll.deleteOne(document, function(err, result) {
//     assert.equal(err, null);
//     console.log('Removed the document ' + document);
//     callback(result);
//   });
// };

// exports.updateDocument = function (db, document, update, collection, callback) {
//   var coll = db.collection(collection);
//   // update document where a is 2, set b equal to 1
//   coll.updateOne(document, { $set: update }, null, function(err,result) {
//     assert.equal(err, null);
//     console.log('Updated the document with ' + update);
//     callback(result);
//   });

// }