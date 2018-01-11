module.exports = (app,db) => {
	app.get('/howdoyoufeel', (req, res) => {

		if(req.session.user){
			res.render('howdoyoufeel', {
				first_name: req.session.user.first_name})
		}
		else {
			res.render('index')
		}
	})
app.post('/feelForm', (req, res) => {

		console.log(req.body.mood)
		console.log(req.body.sleep)
		console.log(req.body.diet)
		console.log(req.body.exercise)
		db.feels.create({
				mood: `${req.body.mood}`,
				sleep: `${req.body.sleep}`,
				diet: `${req.body.diet}`,
				exercise: `${req.body.exercise}`,
				user_id: `${req.session.user.id}`
			})
		res.render("profile", {
			id: req.session.user.id,
			first_name: req.session.user.first_name,
			last_name: req.session.user.last_name,
			email: req.session.user.email,
			date_of_birth: req.session.user.date_of_birth,

		})
	}) //end of app.post
}