import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema({
    participants: {
        type: [String], // Array of participant IDs (sender and receiver)
        required: true,
        // unique: true // Ensures unique combination of participants
    },
    messages: {
        type: [Schema.Types.ObjectId], // Array of message IDs
        ref: 'Messages',
        default: [] // Initialize as an empty array
    }
}, { timestamps: true });

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);
