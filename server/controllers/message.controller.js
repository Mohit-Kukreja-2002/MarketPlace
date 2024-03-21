import Seller from "../models/seller.js";
import Message from "../models/message.js";
import Conversation from "../models/conversationModel.js";
import Buyer from "../models/buyer.js";

export const sendMessageBuyer = async (req, res) => {
    try {
        const { message, id: sellerId } = req.body;
        const buyer = req.user;
        const seller = await Seller.findById(sellerId);

        const newMessage = new Message({
            sender: buyer._id,
            receiver: sellerId,
            message,
        });


        let conversation = await Conversation.findOne({
            participants: { $all: [buyer._id, sellerId] },
        });


        if (!conversation) {
            conversation = await Conversation.create({
                participants: [buyer._id, sellerId],
            });

            buyer.conversationList.push(conversation._id);
            seller.conversationList.push(conversation._id);

            await Promise.all[buyer.save(), seller.save()];
        }

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if (receiverSocketId) {
        //     // io.to(<socket_id>).emit() used to send events to specific client
        //     io.to(receiverSocketId).emit("newMessage", newMessage);
        // }

        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            messageSent: message,
        });
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({
            error: "Internal server error",
            success: false
        });
    }
};

export const sendMessageSeller = async (req, res) => {
    try {
        const { message, id: buyerId } = req.body;
        const seller = req.seller;
        const buyer = await Buyer.findById(buyerId);

        const newMessage = new Message({
            sender: seller._id,
            receiver: buyerId,
            message,
        });


        let conversation = await Conversation.findOne({
            participants: { $all: [buyerId, seller._id] },
        });


        if (!conversation) {
            conversation = await Conversation.create({
                participants: [buyerId, seller._id],
            });

            buyer.conversationList.push(conversation._id);
            seller.conversationList.push(conversation._id);

            await Promise.all[buyer.save(), seller.save()];
        }

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if (receiverSocketId) {
        //     // io.to(<socket_id>).emit() used to send events to specific client
        //     io.to(receiverSocketId).emit("newMessage", newMessage);
        // }

        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            messageSent: message,
        });
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({
            error: "Internal server error",
            success: false
        });
    }
};

export const getMessagesBuyer = async (req, res) => {
    try {
        const { id: sellerId } = req.body;
        const buyer = req.user;

        const page = parseInt(req.body.page) || 1; // Default to page 1 if not provided
        const limit = 50; // Adjust the limit as needed

        const conversation = await Conversation.findOne({
            participants: {
                $all: [buyer._id, sellerId]
            },
        }).populate({
            path: "messages",
            options: {
                sort: { createdAt: -1 }, // Sort messages by createdAt field in descending order
                skip: (page - 1) * limit,
                limit: limit,
            }
        });


        if (!conversation) {
            return res.status(200).json({
                success: true,
                conversations: [],
                message: "The conversation is empty"
            });
        }

        // console.log(conversation)

        const messages = conversation.messages;

        res.status(200).json({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

export const getMessagesSeller = async (req, res) => {
    try {
        const { id: buyerId } = req.body;
        const seller = req.seller;

        const page = parseInt(req.body.page) || 1; // Default to page 1 if not provided
        const limit = 50; // Adjust the limit as needed

        const conversation = await Conversation.findOne({
            participants: {
                $all: [buyerId, seller._id]
            },
        }).populate({
            path: "messages",
            options: {
                sort: { createdAt: -1 }, // Sort messages by createdAt field in descending order
                skip: (page - 1) * limit,
                limit: limit,
            }
        });

        if (!conversation) {
            return res.status(200).json({
                success: true,
                conversations: [],
                message: "The conversation is empty"
            });
        }

        // console.log(conversation)

        const messages = conversation.messages;

        res.status(200).json({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

export const getChattedSellers = async (req, res) => {
    try {

        let buyer = req.user;
        buyer = await buyer.populate('conversationList')

        // Fetch last message from Message Model
        const lastMessageIds = buyer.conversationList.map(conversation => conversation.messages[conversation.messages.length - 1])
        const messages = await Message.find({ _id: { $in: lastMessageIds } }).select("message");

        // Extract seller IDs from each conversation
        const sellerIds = buyer.conversationList.map(conversation => conversation.participants[1]);

        // Fetch seller documents using these IDs
        const sellers = await Seller.find({ _id: { $in: sellerIds } }).select("shopName upi avatar");

        // Return the list of sellers
        res.status(200).json({
            success: true,
            sellers,
            messages
        });

    } catch (error) {
        console.log('Error in getChattedSellers:', error);
        res.status(500).json({
            sucess: false,
            error: 'Internal server error'
        });
    }
};

export const getChattedBuyers = async (req, res) => {
    try {
        // Get the logged-in buyer's ID from the request
        // const buyerId = req.user;

        let seller = req.seller;
        seller = await seller.populate('conversationList')

        // Extract buyer IDs from each conversation
        const buyerIds = seller.conversationList.map(conversation => conversation.participants[0]);

        // Fetch seller documents using these IDs
        const buyers = await Buyer.find({ _id: { $in: buyerIds } }).select("name avatar");

        // Return the list of sellers
        res.status(200).json({
            success: true,
            buyers
        });
    } catch (error) {
        console.log('Error in getChattedSellers:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};