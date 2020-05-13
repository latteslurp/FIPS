var mongoose    = require("mongoose"),
    Program     = require("./models/program"),
    Plan        = require("./models/plan"),
    Comment     = require("./models/comment");

var hypertrophyPlan = [
    {
        name: "Handstand Push Up",
        detail: "5 sets 10-15 reps"
    },
    {
        name:"Muscle Up",
        detail:"5 sets 10-15 reps"
    },
    {
        name:"Pull Up",
        detail:"4 sets 10-15 reps"
    },
    {
        name:"Push Up",
        detail: "4 sets all to failure"
    },
    {
        name:"Pistol Squat (per 1 side)",
        detail: "5 sets 8-12 reps"
    },
    {
        name:"Deadlift (Regular Stance, use band)",
        detail: "4 sets 8-12 reps"
    }
]

var mealPlan = [
    {
        name:"Meal 1: 9:00 AM - 9:20 AM",
        detail: "Anabolic French Toast"
    },
    {
        name:"Meal 2: 11:15 AM - 11:30 AM",
        detail:"Chicken Breast and Broccoli"
    },
    {
        name:"Meal 3: 3:00 PM - 3:20 PM",
        detail:"Spinach & Grilled Chicken wrap"
    },
    {
        name: "Meal 4: 6:00 PM - 6:30 PM",
        detail: "Protein Bar & Smart Pop Popcorn"
    },
    {
        name:"Meal 5: 8:50 PM - 9:10PM",
        detail: "Secret Salad"
    }
]

var data = [
    {
        name: "Hypertrophy", 
        image: "https://simplifaster.com/wp-content/uploads/2018/08/Muscle-Growth.jpg",
        description: "To build muscle through weight lifting, you need to have both mechanical damage and metabolic fatigue. When you lift a heavy weight, the contractile proteins in the muscles must generate force to overturn the resistance provided by the weight. In turn, this can result in structural damage to the muscles. Mechanical damage to muscle proteins stimulates a repair response in the body. The damaged fibers in muscle proteins result in an increase in muscle size. Mechanical fatigue occurs when the muscle fibers exhaust the available supply of ATP, an energy component that helps your muscles contract. They aren’t able to continue fueling muscular contractions or can no longer lift the weight properly. This can also lead to muscle gain. Both mechanical damage and metabolic fatigue are important for achieving muscular hypertrophy. (https://www.healthline.com/health/muscular-hypertrophy#how-to)",
        plans: hypertrophyPlan
    },
    {
        name: "Meal Plan", 
        image: "https://www.thehealthy.com/wp-content/uploads/2019/10/GettyImages-931193062.jpg",
        description: "Like training, diet is a vital part of bodybuilding. Eating the right foods in the appropriate amounts provides your muscles with the nutrients they need to recover from workouts and grow bigger and stronger. Conversely, consuming the wrong foods or not consuming enough of the right ones will leave you with subpar results.(https://www.healthline.com/nutrition/bodybuilding-meal-plan)",
        plans: mealPlan
    }
]

function seedDB(){
    //Remove all data -- restart
                //remove all
    Program.remove({}, err=>{
        if(err){
            console.log(err);
        }
        console.log("Remove programs!")
    });
    //Add programs "back"
    data.forEach(seed=>{
        Program.create(seed, (err, program)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("Added new program!");
                //create comment inside each program
                Comment.create({
                    text:'Amazing program! Totally above my expectation.',
                    author:'Reyner'

                }, (err, comment)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        program.comments.push(comment);
                        program.save();
                        console.log("Created a new comment!");
                    }
                });
            }
        });
    });
}

module.exports = seedDB;