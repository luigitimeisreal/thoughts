import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.js"

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
    // Creation of user collection
    res.json(req.body);
})

