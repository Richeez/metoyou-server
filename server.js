require("dotenv").config();
const express = require("express");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { verifyJWT } = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credentials");
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
// const corsFunc = require("./headerConfig")

//? Handle Options credentials check before CORS & fetch cookies credentials requirement
// app.use(credentials);
//? Cross Origin Resource Sharing

app.use(cors());




// app.use(function (req, res, next) {
//   // Allow requests from 'https://metoyou.vercel.app'
//   res.setHeader('Access-Control-Allow-Origin', 'https://metoyou.vercel.app');

//   // Allow specific HTTP methods
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

//   // Allow specific HTTP headers
//   res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Accept, Content-Type');

//   // Set how long the preflight request can be cached (in seconds)
//   res.setHeader('Access-Control-Max-Age', '3600');

//   // Handle preflight requests (OPTIONS method)
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   // Pass control to the next middleware or route handler
//   next();
// });




//? Connect to MongoDB
connectDB();
//? Custom middleware logger
app.use(logger);
//? 
// app.use(corsFunc)
//?  Built-in middleware to handle urlencoded data;
//?   in other words form data:
//?   'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"))
app.use(helmet())

//? Built-in middleware for json
app.use(express.json());
//?  middleware for cookies
app.use(cookieParser());

// module.exports = (req, res) => {

//   // Check if the request starts with "/api" and remove the prefix
//   if (req.url.startsWith('/api')) {
//     req.url = req.url.slice(4);
//   }

//   // Handle the modified request with your Express app
//   app(req, res);
// };

//? Server static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.post("/assets", express.static(path.join(__dirname, "public/assets")))


//? FILE STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/assets/'); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${ext}`;
    console.log("file created:", fileName)
    cb(null, fileName); // Use a unique filename for each uploaded file
  },
});


const upload = multer({ storage: storage });

app.post("/post", upload.single("file"), async (req, res) => {
  try {
    const { userId, description, } = req.body;
    console.log("desc", description)
    console.log("userId", userId)
    const user = await User.findById(userId).exec();
    console.log("as user:", user);
    const newPost = new Post({
      userId,
      username: user?.username,
      description,
      userPicsPath: user?.picsPath,
      location: user?.location,
      likes: {},
      comments: [],
    });
    if (req?.file) {
      newPost.picsPath = req.file?.filename;
    }
    console.log("New Post:", newPost)
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
})


app.patch("/profile", upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]), async (req, res) => {
  const { userId, username, nickname, location, occupation } = req.body;

  if (!req.body) return res.status(400).json({ "message": "You need to make new changes" });
  console.log("userId", userId);

  try {
    const user = await User.findById(userId).exec();
    if (username) {
      user.username = username;
    }
    if (nickname) {
      user.nickname = nickname;
    }

    if (req?.files) {
      console.log("files", req.files)

      if (req?.files?.profilePicture) {
        const file = req.files;
        user.picsPath = file.profilePicture[0].filename;
        console.log("path", user.picsPath)
      }
      if (req.files.coverImage) {
        const file = req.files;

        user.backgroundBg = file.coverImage[0].filename;
        console.log("backgroundBg", user.backgroundBg)

      }
    }

    if (location) {
      user.location = location;
    }
    if (occupation) {
      user.occupation = occupation;
    }

    const result = await user.save();
    const { pwd, refreshToken, ...rest } = user._doc;
    res.status(201).json({ rest });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});




app.use(fileUpload())
app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filePayLoadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;
    console.log("new files", files);
    Object.keys(files).forEach((key) => {
      const filePath = path.join(__dirname, "uploads", files[key].name);
      files[key].mv(filePath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });
    return res.json({
      status: "success",
      message: Object.keys(files).toString(),
    });
  }
);

// app.use('/subdir', express.static(path.join(__dirname, '/public')));
// app.use('/subdir', require('./routes/subdir'));
// app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));

app.get('/', (req, res) => {
  res.send('<h2>Welcome to Me &#x1F449; You Social API...🚀</h2>')
})

app.use(verifyJWT); //? Every route after it will use it
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
app.use(errorHandler);
const PORT = process?.env?.PORT ?? 4500;

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  // User.insertMany(users)
  // Post.insertMany(posts)
  app?.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
