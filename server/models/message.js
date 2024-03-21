import mongoose, {Schema} from "mongoose";

const MessageSchema = new Schema({
    sender: {
        type: String,
    },
    receiver: {
        // id of the receiver
        type: String,
    },
    message: {
        type: String,
    }
},{timestamps: true});

export default mongoose.models.Messages || mongoose.model('Messages', MessageSchema); 

