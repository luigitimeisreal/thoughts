import mongoose from "mongoose";

// Creation of user collection
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String
});

export default mongoose.model('User', userSchema);