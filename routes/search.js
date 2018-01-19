module.exports = (app,db) => {
app.get('/search', (req, res) => {

		if(req.session.user){
			res.render('search', {
				first_name: req.session.user.first_name})
		}
		else {
			res.render('signup')
		}
	})

app.post('/search', (req, res) => {
        var user = req.body.user
        db.users.findAll({
                where: {
                    first_name: req.body.user
                }
            })
         .then((result) => {

         // console.log(result)

         if (result.length > 0) {
        	var foundUsers = []
         	for (var i=0; i < result.length ; ++i) {
         	foundUsers.push(result[i].dataValues.first_name) 
         }
         	console.log(foundUsers)
         	res.render('search', {first_name: req.session.user.first_name, foundUsers:foundUsers})

         	}
         else
         	res.render('search', { text:"No known user", first_name: req.session.user.first_name})
         })

		})
}





