import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";
import bcrypt from "bcrypt";

dotenv.config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    const encryptedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const admin1 = new User({
        firstName: "Administrator",
        lastName: "Administrator",
        username: "admin1",
        email: "no data",
        password: encryptedPassword
    });
    await admin1.save();
    console.log("Installation finished");
}