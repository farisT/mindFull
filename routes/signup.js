module.exports = (app,db,bcrypt) => {
	app.get('/signup', (req, res) => {

		if(req.session.user){
			res.render('index', {
				first_name: req.session.user.first_name})
		}
		else {
			res.render('signup')
		}
	})

app.post('/signUp', (req, res) => {
        var email = req.body.email
        db.users.findAll({
                where: {
                    email: req.body.email
                }
            })
            .then((result) => {
                if (result.length > 0) {
                    // if email already exist in database so array not empty
                    res.render("signup", {
                        errorSignup: "Email address already exists"
                    })
                } else if (result.length <= 0) { // if email doesn't exists yet > add new user in db 
                    var salt = bcrypt.genSalt(10, function(error, salt) {
                        bcrypt.hash(req.body.password, salt)
                        .then((hash)=> {
                            return db.users.create({
                                first_name: req.body.firstname,
                                last_name: `${req.body.lastname}`,
                                email: `${req.body.email}`,
                                date_of_birth: `${req.body.dateOfBirth}`,
                                password: `${hash}`
                            })
                        })
                        .then((createdUser) => {
                            var userinfo = {
                                    id: createdUser.dataValues.id,
                                    first_name: createdUser.dataValues.first_name,
                                    last_name: createdUser.dataValues.last_name,
                                    date_of_birth: createdUser.date_of_birth,
                                }
                                req.session.user = userinfo
                                res.redirect("/score", 301)
                        })
                    })
                }
            })
            .catch(e => {
                console.log("error 1:", e)
            })
        }) //end of app.post


}