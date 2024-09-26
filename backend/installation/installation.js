import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    const admin1 = new User({
        firstName: "Administrator",
        lastName: "Administrator",
        username: "admin1",
        email: "no data",
        password: process.env.ADMIN_PASSWORD
    });
    await admin1.save();
    console.log("Installation finished");
}