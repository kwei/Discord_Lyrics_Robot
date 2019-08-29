const MongoClient = require('mongodb').MongoClient;
module.exports = function mongodb_deleteElement(data, cb){
	let err = false;
	MongoClient.connect(data.dbURL, function(err, dbHandler){
		if(err) throw err;
		dbHandler.collection(data.tableName, function(err, table){
			table.remove({data.obj.id}, {w:1}, function(err, res){
				if(err) throw err;
			});
		});
		dbHandler.close();
	});
}

// data = {
// 	tablename: "",
//  collection_name: "",
// 	obj: {
//    id: "",
//    name: "",
//    song: "",
//    lyrics: ""
//  }
// }