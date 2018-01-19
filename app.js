const express = require("express"), 
	  app = express(),
	  session = require('express-session'),
	  bodyParser = require("body-parser"),
	  pg = require('pg'),
	  Client = pg.Client, 
	  fs = require('fs')
	  path = require('path'),

	  bcrypt = require('bcrypt')

	  db = require(path.resolve( __dirname, "./config/db.js" ))
	  env = require(path.resolve( __dirname, "./config/.env.js" ))



require ('dotenv').load()
app.set("view engine", "pug")
var WEBPORT = env.WEBPORT
app.use(bodyParser.urlencoded({extended:true}))// 
app.use(express.static(path.join(__dirname, 'public'))); // to give app.js access to images on server

app.use(session({
    secret: 'keyboard cat', // MAKE THIS AN ENV VARIABLE ALSO
    cookie: {},
    resave: true,               
    saveUninitialized: true     
}))



require("./routes/index.js")(app)
require("./routes/signup.js")(app,db,bcrypt)
require("./routes/login.js")(app, db, bcrypt)
require("./routes/profile.js")(app,db)
require("./routes/logout.js")(app)
require("./routes/about.js")(app)
require("./routes/howdoyoufeel.js")(app,db)
require("./routes/score.js")(app,db)
require("./routes/recommendation.js")(app,db)
require("./routes/search.js")(app, db)


db.sequelize.sync({ 
    force: false, // CHANGE THIS TO FALSE WHEN HOSTING - WILL OTHERWISE DELETE ALL DATA WHEN RESTARTING THE APP ! ! ! ! ! ! ! ! ! !! ! ! ! ! ! ! !! ! 
    logging: console.log 
}).then(()=> {
	app.listen(WEBPORT, ()=>{
	console.log('Running on', WEBPORT)
	})
})