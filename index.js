// const logEvents = require('./logEvents')
// const EventEmitter = require('events')

// class MyEmitter extends EventEmitter { };
// //? initialize object
// const myEmitter = new MyEmitter();

// //? add listener for log events
// myEmitter.on('log', (msg) => logEvents(msg))

// setTimeout(() => {
//     //? Emmit events
//     myEmitter.emit('log', 'log event emmitted successfully')

// }, 2000);




require("express-async-errors")
require("dotenv").config();
const express = require("express");
// const { logger, logEvents } = require("./middlewares/logEvents");
// const errorHandler = require("./middlewares/errorHandler");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { verifyJWT } = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/DBConn");
const fileUpload = require("express-fileupload");
const morgan = require("morgan")
const helmet = require("helmet")
mongoose.set("strictQuery", true);
const { users, posts } = require("./data/index");
const User = require("./model/User");
const Post = require("./model/Post");
const filePayLoadExists = require("./middlewares/filePayLoadExists");
const fileExtLimiter = require("./middlewares/fileExtLimiter");
const fileSizeLimiter = require("./middlewares/fileSizeLimiter");
const multer = require("multer");


app.use(cors(corsOptions));

//? Server static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.post("/assets", express.static(path.join(__dirname, "public/assets")))


/* app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Handle preflight requests (OPTIONS method)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Pass control to the next middleware or route handler
    next();
});

*/


//? Connect to MongoDB
connectDB();

//?   'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"))
app.use(helmet())

//? Built-in middleware for json
app.use(express.json());
//?  middleware for cookies
app.use(cookieParser());



//? FILE STORAGE
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/assets/'); // Specify the directory where files will be stored
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${ext}`;
//         cb(null, fileName); // Use a unique filename for each uploaded file
//     },
// });


// const upload = multer({ storage: storage });




app.get('/', (req, res) => {
    res.send('<h2>Welcome to Me &#x1F449; You Social API...🚀</h2>')
})

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT); //? Every route after it will use it




// app.patch("/profile", upload.fields([
//     { name: "profilePicture", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 },
// ]), async (req, res) => {
//     const { userId, username, nickname, location, occupation, profilePicture, coverImage } = req.body;
//     const duplicate = await User.findOne({ username }).lean().exec()
//     if (!req.body) return res.status(400).json({ "message": "You need to make new changes" });
//     if (duplicate && duplicate._id.toString() !== userId) return res.status(409).json({ "message": "Username Exist!" });

//     try {
//         const user = await User.findById(userId).exec();
//         if (username) {
//             user.username = username;
//         }
//         if (nickname) {
//             user.nickname = nickname;
//         }
//         let updatedPicsPath = user.picsPath.toString(); // Initialize with the current picsPath

//         if (req?.files) {

//             if (req?.files?.profilePicture) {
//                 const file = req.files;
//                 if (user.picsPath !== file.profilePicture[0].filename.toString()) {
//                     // Update the user's picsPath and all related posts in a single query
//                     await Promise.all([
//                         User.findByIdAndUpdate(userId, { $set: { picsPath: file.profilePicture[0].filename.toString() } }),
//                         Post.updateMany({ userId }, { $set: { userPicsPath: file.profilePicture[0].filename.toString() } }),
//                     ]);
//                     updatedPicsPath = file.profilePicture[0].filename.toString(); // Update the value to the new picsPath
//                 }
//             }
//             if (req.files.coverImage) {
//                 const file = req.files;

//                 user.backgroundBg = file.coverImage[0].filename.toString();

//             }
//         }

//         if (location) {
//             user.location = location;
//         }
//         if (occupation) {
//             user.occupation = occupation;
//         }
//         await user.save();

//         // Find all posts by the user and update their picsPath
//         const posts = await Post.find({ userId });
//         for (const post of posts) {
//             post.userPicsPath = updatedPicsPath; // Use the updated picsPath
//             await post.save();
//         }
//         const { pwd, refreshToken, ...rest } = user._doc;
//         res.status(201).json({ rest, posts });
//     } catch (err) {
//         res.status(409).json({ message: err.message });
//     }
// });




// app.use(fileUpload())
// app.post(
//     "/upload",
//     fileUpload({ createParentPath: true }),
//     filePayLoadExists,
//     fileExtLimiter([".png", ".jpg", ".jpeg"]),
//     fileSizeLimiter,
//     (req, res) => {
//         const files = req.files;
//         console.log("new files", files);
//         Object.keys(files).forEach((key) => {
//             const filePath = path.join(__dirname, "uploads", files[key].name);
//             files[key].mv(filePath, (err) => {
//                 if (err) return res.status(500).json({ status: "error", message: err });
//             });
//         });
//         return res.json({
//             status: "success",
//             message: Object.keys(files).toString(),
//         });
//     }
// );
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));


app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404Page.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404: Not Found" });
    } else {
        res.type("txt").send("404: Not Found");
    }
});
//? Display error message on the browser
// app.use(errorHandler);
const PORT = process?.env?.PORT ?? 4500;
mongoose.connection.once("open", () => {
    console.log("Connected to Database");
    // User.insertMany(users)
    // Post.insertMany(posts)
    app?.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on("error", (err) => {
    console.log("Error:", err);

});
