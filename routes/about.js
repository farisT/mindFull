module.exports = (app) => {
    app.get('/about', (req, res) => {

        if(req.session.user){
            res.render('about', {
                first_name: req.session.user.first_name})
        }
        else {
            res.render('about')
        }
    })
}