module.exports = (app) => {
	app.get('/', (req, res) => {

		if(req.session.user){
			res.render('index', {
				first_name: req.session.user.first_name})
		}
		else {
			res.render('index')
		}
	})
}