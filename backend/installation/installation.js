import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/thoughts');
    // Creation of user collection
    const userSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        email: String,
        password: String
    });
    const User = mongoose.model('User', userSchema);
    const admin1 = new User({
        firstName: "Administrador",
        lastName: "Administrador",
        username: "admin1",
        email: "no data",
        password: process.env.ADMIN_PASSWORD
    });
    await admin1.save();
    console.log("Installation finished");
}