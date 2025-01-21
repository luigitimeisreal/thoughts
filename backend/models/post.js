import mongoose from "mongoose";

// Creation of post collection
const postSchema = new mongoose.Schema({
    profilePhoto: String,
    user: String,
    content: String,
    likes: [String],
    date: Date
})

export default mongoose.model('Post', postSchema);