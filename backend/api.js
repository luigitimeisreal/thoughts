import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.js"
import bcrypt from "bcrypt";

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

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

// Check if login details are correct
app.get("/api/login", async (req, res) => {
    try {
        const password = await getPassword(req.query.user);
        const isValid = await bcrypt.compare(req.query.pass.trim(), password.trim());
        console.log(password, "enters 3");
        if(isValid) {
            res.json({"login": "correct"});
        } else {
            res.json({"login": "incorrect"});
        }
    } catch {
        res.json({"login": "incorrect"})
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
