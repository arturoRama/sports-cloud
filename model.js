const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let sportsSchema = mongoose.Schema({
	id: {type : Number, requiered: true, unique : true},
	name :{type : String, required : true}
});

let Sports = mongoose.model('Sports', sportsSchema);

const listSports = {
	get : function(){
		return Sports.find()
			.then(sports => {
				return sports;
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	post : function(newSport){
		return Sports.create(newSport)				//create en mongoose, insert in mongo
			.then(sport => {
				return sport;
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	getById: function(search){
		return Sports.find({id:search})
			.then(sports => {
				console.log(sports);
				return sports;
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	updateSport: function(search, name){
		return Sports.findOneAndUpdate({id : search},{$set:{name:name}},{new : true})
			.then(sports => {
				console.log(sports);
				return sports;
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	deleteSport : function(search){
		return Sports.findOneAndDelete({id:search})
			.then(sports => {
				console.log(sports);
				return sports;
			})
			.catch(err => {
				throw new Error(err);
			});
	}
}

module.exports = {listSports};