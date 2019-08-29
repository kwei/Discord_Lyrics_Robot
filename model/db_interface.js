var mongodb_addElement = require('../functions/db/mongodb_addElement.js');
// var mongodb_updateElement = require('../functions/db/mongodb_updateElement.js');
// var mongodb_findElement = require('../functions/db/mongodb_findElement.js');
var mongodb_findAll = require('../functions/db/mongodb_findAll.js');
// var mongodb_deleteElement = require('../functions/db/mongodb_deleteElement.js');

// url = "mongodb://localhost:27017/discord";

module.exports = {
	addElement: function(data){
		mongodb_addElement(data, function(err, res){
	  		if(err) console.log(err);
	  		console.log(res);
	    });
	},
	findAll: function(data){
		mongodb_findAll(data, function(err, res){
	  		if(err) console.log(err);
	  		console.log(res);
	    });
	}
};

// module.exports = function DB_addElement(data){
// 	mongodb_addElement(data, function(err, res){
//   		if(err) console.log(err);
//   		console.log(res);
//     });
// }

// module.exports = function DB_updateElement(data){
// 	mongodb_updateElement(data, function(err, res){
//   		if(err) console.log(err);
//   		console.log(res);
//     });
// }

// module.exports = function DB_findElement(data){
// 	mongodb_findElement(data, function(err, res){
//   		if(err) console.log(err);
//   		console.log(res);
//     });
// }

// module.exports = function DB_findAll(data){
// 	mongodb_findAll(data, function(err, res){
//   		if(err) console.log(err);
//   		console.log(res);
//     });
// }

// module.exports = function DB_deleteElement(data){
// 	mongodb_deleteElement(data, function(err, res){
//   		if(err) console.log(err);
//   		console.log(res);
//     });
// }