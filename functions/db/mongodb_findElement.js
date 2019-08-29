const MongoClient = require('mongodb').MongoClient;
module.exports = function mongodb_findElement(data, cb){
	let err = false;
	MongoClient.connect(data.dbURL, function(err, dbHandler){
		if(err) throw err;
		dbHandler.collection(data.tableName, function(err, table){
			table.find({/*songname*/}).toArray(function(err, res){
				if(err) throw err;
				console.log("There are " + res.length + " dataset in the database.");
				console.log(res);
			});
		});
		dbHandler.close();
	});
}

// data = {
// 	tablename: "",
//  collection_name: "",
// 	obj: {
//    name: "",
//    song: "",
//    lyrics: ""
//  }
// }