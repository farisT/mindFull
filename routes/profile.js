module.exports = (app, db) => {
    app.get('/profile', (req, res) => {
        if (req.session.user) {
            console.log(req.session.user.id)

            // get clothes info from user here and pass into variables
            // db.clothes.findAll({
            //         where: {
            //             user_id: req.session.user.id
            //         }
            //     }) // do 'for each item in array in pug file'
                        res.render("profile", {
                            id: req.session.user.id,
                            first_name: req.session.user.first_name,
                            last_name: req.session.user.last_name,
                            email: req.session.user.email,
                            date_of_birth: req.session.user.date_of_birth,

                        })
        } else {
            res.render("loginpage", {
                space: "space"
            })
        }
    })
}
