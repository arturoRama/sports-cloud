const express = require('express');
const router = express.Router();
const {listSports} = require('./model');
const bcrypt = require('bcryptjs');

router.get('/list-sports', (req,res,next) => {

	listSports.get()
	.then(sports => {
		res.status(200).json({
			message : 'Successfully sending the list of sports',
			status : 200,
			sports : sports
		});
	}).catch( err => {
			res.status(500).json({
				message : "Internal server error",
				status: 500
			});
			return next();
	});

});

router.post('/post-sport', (req,res,next) => {
	let requiredFields = ['id','name'];

	for(let i = 0; i < requiredFields.length; i++){
		let currentField = requiredFields[i];
		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body`,
				status : 406
			});
			return next();
		}
	}

	let sportID = req.body.id;

	bcrypt.hash(req.body.name,10)
	.then(hashedName => {
		let objectToAdd = {
			id : sportID,
			name : hashedName
		};
		listSports.post(objectToAdd)
			.then(sport => {
				res.status(201).json({
					message: "Successfully added the sport",
					status : 201,
					sport : sport
				});
			})
			.catch( err => {
				res.status(500).json({
					message : "Internal server error",
					status: 500
				});
				return next();
		});
	})
		
});

router.get('/list-sports/:id', (req,res,next) => {
	let sportID = req.params.id;

	listSports.getById(sportID)
	.then(sports => {
		if(sports.length > 0){
			res.status(200).json({
				message : "Successfully found the sport",
				status : 200,
				sports : sports
			});
		}
		else{
			res.status(404).json({
				message : "No sport associated to that ID",
				status : 404
			});
		}
	})
	.catch(err => {
		res.status(500).json({
			message : "Internal Server Issue",
			status : 500
		})
		return next();
	});
	
});

router.put('/update-sport/:id', (req,res,next) => {
	let sportID = req.params.id;

	if (sportID	== null)
	{
		res.status(406).json({
			message: "Missing parameter ID",
			status: 406
		}).send("");
	}

	if (!('name' in req.body)){
			res.status(406).json({
				message : `Missing field name in body.`,
				status : 406
			}).send("");
	}

	sportName = req.body.name;

	listSports.updateSport(sportID, sportName)
	.then(sports => {
		if(sports){
			res.status(200).json({
				message : "Successfully updated the sport",
				status : 400,
				sports : sports
			})
			return next();
		}
		else{
			res.status(404).json({
				message : "No sport associated to that ID",
				status : 404
			})
			return next();
		}
	})
	.catch(err => {
		res.status(500).json({
			message : "Internal Server Issue",
			status : 500
		})
		return next();
	});

});

router.delete('/remove-sport/:id', (req,res,next) => {
	if (!('id' in req.params))
	{
		res.status(406).json({
			message : "Missing parameter",
			status : 406
		});
		return next();
	}

	if (!('id' in req.body))
	{
		res.status(406).json({
			message : "Missing id in body",
			status : 406
		});
		return next();
	}

	if (req.params.id != req.body.id)
	{
		res.status(404).json({
			message : "Both id's must match",
			status : 404
		});
		return next();
	}

	delID = req.body.id;

	listSports.deleteSport(delID)
	.then(sports => {
		if(sports){
			res.status(204).json({
				message : "Sport successfully deleted",
				status : 204,
				sports : sports
			})
			return next();
		}
		else{
			res.status(404).json({
				message : "No sport associated to that ID",
				status : 404
			})
			return next();
		}
	})
	.catch(err => {
		res.status(500).json({
			message : "Internal server issue",
			status : 500
		})
		return next();
	});

});

module.exports = router;


/*
app.delete('/remove-sport/:id', jsonParser, (req,res) =>{

	if (!('id' in req.params))
	{
		res.status(406).json({
			message : "Missing parameter",
			status : 406
		}).send("");
	}

	if (!('id' in req.body))
	{
		res.status(406).json({
			message : "Missing id in body",
			status : 406
		}).send("");
	}

	if (req.params.id != req.body.id)
	{
		res.status(404).json({
			message : "Both id's must match",
			status : 404
		}).send("");
	}

	delID = req.body.id;

	sportsArray.forEach(function(item,index){
		if(item.id == delID)
		{
			sportsArray.splice(index, 1);
			res.status(204).json({
				message : "Post successfully deleted",
				status : 204
			}).send("");
		}
	});

	res.status(404).json({
			message : "The selected id is not associated to any post",
			status : 404
	}).send("");

});
*/