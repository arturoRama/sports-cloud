const express = require('express');
const bodyParser = require('body-parser');
const sportsRouter = require('./router');
const mongoose = require('mongoose');
const app = express();
mongoose.Promise =global.Promise;

const {DATABASE_URL, PORT} = require('./config.js');

const jsonParser = bodyParser.json();


app.use(express.static('public'));

app.use('/sports/api',jsonParser, sportsRouter);

let server;

function runServer(port,databaseUrl){
	return new Promise( (resolve,reject) => {
		mongoose.connect(databaseUrl, err => {
				if (err){
					return reject(err);
				}
				else {
					server= app.listen(port, () =>{
						console.log('Your app is running in port', port);
						resolve();
					})
					.on('error',err=>{
						mongoose.disconnect();
						return reject(err);
					});
				}
			}
		)
	})
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve,reject) =>{
				console.log('Closing server');
				server.close(err => {
					if (err) {
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}

runServer(PORT, DATABASE_URL)
	.catch(err => console.log(err));

module.exports = {app,runServer,closeServer};