const MongoClient = require('mongodb').MongoClient;
module.exports = function mongodb_findAll(data, cb){
	MongoClient.connect(data.dbURL, {useNewUrlParser: true}, function(err, dbHandler){
		const db = dbHandler.db(data.dbName);
		let table = db.collection(data.tableName);
		table.find({}).toArray(function(err, res){
			cb(err, "There are " + res.length + " dataset in the database.");
			cb(err, res);
		});
		dbHandler.close();
	});
}