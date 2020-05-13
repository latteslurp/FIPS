var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport')
    LocalStrategy   = require('passport-local'),
    //database
    User            = require('./models/user')
    Program         = require('./models/program'),
    Comment         = require('./models/comment'),
    seedDB          = require('./seeds');

//load database
seedDB();
//use database
mongoose.connect("mongodb://localhost/fitness_app", {useNewUrlParser: true, useUnifiedTopology: true});
//body-parser
app.use(bodyParser.urlencoded({extended:true}));
//set view engine as ejs (npm ejs)
app.set('view engine', 'ejs');
//connect css and js
app.use(express.static(__dirname + "/public"));


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"This is a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//allow user access
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    next();
});

//landing page
app.get("/", (req, res)=>{
    res.render("landing");
});

//INDEX PROGRAM PAGE -- SECRET -- Use middleware
app.get("/programs", (req, res)=>{
    Program.find({}, (err, program)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("programs/index", {
                programs: program,
                currentUser: req.user
            });
        }
    });
});

//SHOW 
app.get("/programs/:id", (req, res)=>{
    Program.findById(req.params.id).populate("comments").exec((err, foundProgram)=>{
        if(err){
            console.log(err);
        }
        else{
            Program.find({}, (err, allProgram)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.render("programs/show", {program: foundProgram, allProgram: allProgram});
                }
            });
        }
    });
});

//============================
//       PROGRAM PAGE
//============================
app.get("/programs/:id/secretPlan", isLoggedIn, (req, res)=>{
    Program.findById(req.params.id).exec((err, plan)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("programs/plan", {plan: plan});
        }
    });
});


//=============================
//          COMMENT
//=============================
app.get("/programs/:id/comments/new", isLoggedIn, (req, res)=>{
    Program.findById(req.params.id, (err, program)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {program: program})
        }
    });
});

app.post("/programs/:id/comments", isLoggedIn, (req, res)=>{
    Program.findById(req.params.id, (err, program)=>{
        if(err){
            console.log(err);
            redirect("/programs")
        }
        else{
            //get comment from user
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err);
                }
                else{
                    //put comment to database
                    program.comments.push(comment);
                    //save comment
                    program.save();
                    //redirect to current post
                    res.redirect('/programs/' + program._id);
                }
            });
        }
    });
});


//=============================
//            AUTH
//=============================

app.get("/register", (req, res)=>{
    res.render("register");
});

app.post("/register", (req, res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            //TODO: Redirect to secret page
            res.redirect("/programs")
        });
    });
});

//login
app.get("/login", (req, res)=>{
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/programs",
    failureRedirect: "/login",
}), (req, res)=>{});

//logout
app.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/");
});

//check if user logged in or not
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


//SERVER
app.listen(3000, ()=>{
    console.log("Server has started!!");
});