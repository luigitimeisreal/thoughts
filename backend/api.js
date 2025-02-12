import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.js"
import Post from "./models/post.js";
import bcrypt from "bcrypt";
import cookieSession from "cookie-session";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const app = express();

const port = process.env.PORT || 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieSession({
    name: "thoughts-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
  }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);    
})

// Test
app.get("/api/", (req, res) => {
    res.json({ text: 'The server is working' })
})

// Register user
app.post("/api/register", (req, res) => {
    console.log("Parameters: ", req.body.firstName);
    register(req.body).catch(err => console.log(err));
    res.json(req.body);
})

// Upload post
app.post("/api/publish", (req, res) => {
    console.log(req.body.userToken);
    const decryptedData = jwt.verify(req.body.userToken, process.env.SECRET_KEY);
    console.log("Obtaining user", decryptedData.username);
    savePost(req.body.text, decryptedData.username);
})

// Check if login details are correct
app.get("/api/login", async (req, res) => {
    try {
        const password = await getPassword(req.query.user);
        console.log("enters 4", req.query.pass);
        const isValid = await bcrypt.compare(req.query.pass, password);
        console.log(isValid, "enters 3");
        const token = jwt.sign({ username: req.query.user }, process.env.SECRET_KEY);
        console.log(token);
        if (isValid) {
            res.json({"login": "correct", "token": token});
        } else {
            res.json({"login": "incorrect"});
        }
    } catch(error) {
        res.json({"login": "incorrect"})
        console.log(error);
    }
    

})

// Obtain tweets
app.get("/api/posts", async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    const posts = await Post.
    find().
    sort({ _id: -1 }).
    skip(req.query.number).
    limit(10).
    exec();
    res.json(posts);
})

app.get("/api/user", async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    console.log(req.query.token);
    const decryptedData = jwt.verify(req.query.token, process.env.SECRET_KEY);
    console.log("Obtaining user", decryptedData.username);
    res.json(decryptedData.username);
    return;
})

app.put("/api/likes/add", async (req, res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
   // Check if it is in array already
   let postIdObject = new mongoose.Types.ObjectId(`${req.body.postId}`);
   let likesPost = await Post.
   findOne({_id: postIdObject})
   let isLiked = false;
   const decryptedData = jwt.verify(req.body.userToken, process.env.SECRET_KEY);
   likesPost.likes.forEach(user => {
    if(user === decryptedData.username) {
        isLiked = true;
    }
   })
   // If it's not, add it
   console.log(isLiked);
   if(!isLiked) {
    await Post.updateOne(
        { _id: postIdObject },
        { $push: { likes: decryptedData.username } }
    )
    res.json(true);
   } else {
    res.json(false);
   }
   return;
})

app.delete("/api/likes/remove", async (req, res) => {
    console.log("Remove L received", req.body);
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    let postIdObject = new mongoose.Types.ObjectId(`${req.body.postId}`);
    const decryptedData = jwt.verify(req.body.userToken, process.env.SECRET_KEY);
    await Post.updateOne(
        { _id: postIdObject },
        { $pull: { likes: decryptedData.username } }
      );
})

/*
No overload matches this call.
db.posts.updateOne(
  { _id: ObjectId('678fe8e9410b3391c10e25e9') },
  { $pull: { likes: 'newuser' } }
);
*/

async function register(userData) {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    const encryptedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        password: encryptedPassword
    });
    await newUser.save();
}

async function savePost(text, user) {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    let date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    let fullDate = `${year}-${month}-${day}`;
    const newTextPost = new Post({
        profilePhoto: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        user: user,
        content: text,
        likes: [],
        date: fullDate
    })
    await newTextPost.save();
}

async function getPassword(username) {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    const currentUser = await User.findOne({"username": username});
    if(!currentUser) return false;
    console.log("User recovered: ", currentUser.password);
    return currentUser.password;
}

