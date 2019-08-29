const MongoClient = require('mongodb').MongoClient;
module.exports = function mongodb_updateElement(data, cb){
	let err = false;
	MongoClient.connect(data.dbURL, function(err, dbHandler){
		if(err) throw err;
		dbHandler.collection(data.tableName, function(err, table){
			table.update({/*id*/}, {$set: {/*new data*/}});
		});
		dbHandler.close();
	});
}


// data = {
// 	tablename: "",
//  collection_name: "",
// 	obj: {
//    id: "",
//    original:{},
//    updated:{}
//  }
// }