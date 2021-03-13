var express=require("express"); 
var bodyParser=require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
var path = require('path');
const User = require("./models/User");
const routes=require("./routes/index");
const homes=require("./routes/home");
// const authenticateUser = require("./middlewares/authenticateUser");

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// mongdb cloud connection is here
// mongoose
//   .connect("mongodb://localhost:27017/project", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("connected to mongodb cloud! :)");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
  
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);


app.use('/',homes);
app.use('/homes.html',routes);


// route for serving frontend files
// app
//   .get("/", (req, res) => {
//     res.redirect("copr.html");
//   })
//   .get("/log", (req, res) => {
//     res.redirect("copr.html");
//   })
//   .get("/reg", (req, res) => {
//     res.redirect("copr.html");
//   })

//   .get("/home", authenticateUser, (req, res) => {
//     res.redirect("homes.html", { user: req.session.user });
//   })
//  ;
 
// // route for handling post requirests
// app
//   .post("/log", async (req, res) => {
//     const { email, password } = req.body;

//     // check for missing filds
//     if (!email || !password) {
//       res.send("Please enter all the fields");
//       return;
//     }

//     const doesUserExits = await User.findOne({ email });

//     if (!doesUserExits) {
//       res.send("invalid username or password");
//       return;
//     }

//     const doesPasswordMatch = await bcrypt.compare(
//       password,
//       doesUserExits.password
//     );

//     if (!doesPasswordMatch) {
//       res.send("invalid useranme or password");
//       return;
//     }

//     // else he\s logged in
//     req.session.user = {
//       email,
//     };

//    // res.redirect("homes.html");
   
//   })

  
//   .post("/reg", async (req, res) => {
//     const { email, password, cpassword } = req.body;

//     // check for missing filds
//     if (!email || !password || !cpassword) {
//       res.send("Please enter all the fields");
//       return;
//     }

//     const doesUserExitsAlreay = await User.findOne({ email });

//     if (doesUserExitsAlreay) {
//       res.send("A user with that email already exits please try another one!");
//       return;
//     }
	
// 	if(password!=cpassword){
// 		res.send("Password didn't match");
// 	}
// 	else
// 	{
// 		 // lets hash the password
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const latestUser = new User({ email, password: hashedPassword });
//     latestUser
//       .save()
//       .then(() => {
//         res.send("registered account!");
//         return;
//       })
//       .catch((err) => console.log(err));
// 	}});
 
 console.log("Hai ");
//app.use('/',routes);     //Running after Search Button

// //logout
// app.get("/logout", authenticateUser, (req, res) => {
//   req.session.user = null;
//   res.redirect("copr.html");
// });

// server config
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT}`);
});

