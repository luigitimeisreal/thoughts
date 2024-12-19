import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.js"
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

async function getPassword(username) {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    const currentUser = await User.findOne({"username": username});
    if(!currentUser) return false;
    console.log("User recovered: ", currentUser.password);
    return currentUser.password;
}

