const MongoClient = require('mongodb').MongoClient;
module.exports = function mongodb_addElement(data, cb){
	MongoClient.connect(data.dbURL, {useNewUrlParser: true}, function(err, dbHandler){
		const db = dbHandler.db(data.dbName);
		let table = db.collection(data.tableName);
		table.insertOne(data.obj);
		table.estimatedDocumentCount(function(err, count){
			cb(err, count);
		});
		dbHandler.close();
	});
}