module.exports = (app, db) => {

    app.get('/score', (req, res) => {
        if (req.session.user) {
            console.log(req.session.user.id)

            Promise.all([db.feels.findAll({
                    where: {
                        user_id: req.session.user.id
                    }
                }), db.feels.findAll()])
            .then(([feelsUser, allFeels])=> {
                 var score = {
                        mood: 0,
                        diet: 0,
                        sleep: 0
                }

                var averagescore = {
                        mood: 0,
                        diet: 0,
                        sleep: 0
                }

                var exercise = {

                    yes:0,
                    no: 0
                }

            // db.feels.findAll({
            //         where: {
            //             user_id: req.session.user.id
            //         }
            //     }) // do 'for each item in array in pug file'

                    debugger
                  for (var i=0; i < feelsUser.length ; ++i){  
                       // console.log(feelsUser.length + feelsUser[i].dataValues.mood)
                       score.mood += (feelsUser[i].dataValues.mood * (1/feelsUser.length)) // computing average
                       score.diet += (feelsUser[i].dataValues.diet * (1/feelsUser.length))
                       score.sleep += (feelsUser[i].dataValues.sleep * (1/feelsUser.length))
                    }

                  for (var i=0; i < allFeels.length ; ++i){  
                       // console.log(allFeels.length + allFeels[i].dataValues.mood)
                       averagescore.mood += (allFeels[i].dataValues.mood * (1/allFeels.length)) // computing average
                       averagescore.diet += (allFeels[i].dataValues.diet * (1/allFeels.length))
                       averagescore.sleep += (allFeels[i].dataValues.sleep * (1/allFeels.length))
                    }

                  for (var i=0; i < feelsUser.length ; ++i){  
                       // console.log(allFeels.length + allFeels[i].dataValues.mood)
                    if(feelsUser[i].dataValues.exercise == "Yes"){
                       exercise.yes += (1)
                    }
                    if((feelsUser[i].dataValues.exercise == "No")){
                        exercise.no += (1)
                    }

                    }
                    console.log(exercise)
                    

                    console.log(score)
                    // var messages = messages(score.mood, ... )
                    function messages(moodScore, dietScore, sleepScore,exerciseScore,noExerciseScore) {
                        var messages = {}
                        if(moodScore < 5.5){ messages.mood = " In a bad mood? have a look at the recommendations page for things you can do to help that "}
                        else {messages.mood = " Only good vibes... keep it going!   "}
                        if(dietScore < 5.5) { messages.diet = " Check the recommendations page for healthy alternatives that will better how you feel"}
                        else {messages.diet = "The quickest way to maintain balance in the body is through the stomach. For more fresh ideas check the recommendations! "}
                        if(sleepScore < 5.5) {messages.sleep = "Sleep is so vital for bettering your mood and maintaining a balance body, try and get more zzzs in!"}
                        else {messages.sleep = "Sleep is the first step to feeling better, try balancing everything together to further better your state of mind! "}
                        if(exerciseScore < noExerciseScore) {messages.exercise = "We see that you have been skipping exercising. A healthy body is a healthy mind so make sure to go for some exercise. If you have no ideas on what to do, check the recommendations page!"}
                        else {messages.exercise = "Good work in exercising. Exercising can help many factors of your mood. If you are looking for different type of exercise routines or simply to see the benefits of exercise check the recommendations page!"}
                        return messages
                    }
                    var messages = messages(score.mood,score.diet,score.sleep,exercise.yes,exercise.no)

                    res.render("score", {
                        id: req.session.user.id,
                        first_name: req.session.user.first_name,
                        last_name: req.session.user.last_name,
                        email: req.session.user.email,
                        date_of_birth: req.session.user.date_of_birth,
                        score: score,
                        inputs:feelsUser,
                        textMood: messages.mood,
                        textDiet: messages.diet,
                        textSleep: messages.sleep,
                        textExercise: messages.exercise,
                        average: averagescore,
                        exercise:exercise,

                    })


                })
        }
         else {
            res.render("loginpage", {
                space: "space"
            })
        }
    
     })
    }


