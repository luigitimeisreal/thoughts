import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";
import Post from "../models/post.js";
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
    const firstPost = new Post({
        profilePhoto: "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        user: "defaultuser",
        content: "This is a thought of someone",
        likes: 50
    });
    await firstPost.save();
    console.log("Installation finished");
}