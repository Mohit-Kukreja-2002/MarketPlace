import Seller from "../models/seller.js";
import Message from "../models/message.js";
import Conversation from "../models/conversationModel.js";
import Buyer from "../models/buyer.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"

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

        const receiverSocketId = getReceiverSocketId(sellerId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

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

        const receiverSocketId = getReceiverSocketId(buyerId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

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
        buyer.conversationList.sort((a, b) => b.updatedAt - a.updatedAt);

        // Fetch last message from Message Model
        let lastMessageIds = buyer.conversationList.map(conversation => conversation.messages[conversation.messages.length - 1])
        // Extract seller IDs from each conversation
        const sellerIds = buyer.conversationList.map(conversation => conversation.participants[1]);

        
        let messages = []
        for( let i = 0; i < lastMessageIds.length; i++){
            const message = await Message.findById(lastMessageIds[i]).select("message");
            messages.push(message);
        }

        // Fetch seller documents using these IDs
        let sellers = []
        for( let i = 0; i < lastMessageIds.length; i++){
            const seller = await Seller.findById(sellerIds[i]).select("shopName upi avatar");
            sellers.push(seller);
        }

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

        let seller = req.seller;
        seller = await seller.populate('conversationList')
        seller.conversationList.sort((a, b) => b.updatedAt - a.updatedAt);
        // console.log(seller)

        // Fetch last message from Message Model
        let lastMessageIds = seller.conversationList.map(conversation => conversation.messages[conversation.messages.length - 1])
        // Extract buyer IDs from each conversation
        let buyerIds = seller.conversationList.map(conversation => conversation.participants[0]);


        // Get corresponding messages
        let messages = [];
        for( let i = 0; i < lastMessageIds.length; i++){
            const message = await Message.findById(lastMessageIds[i]).select("message");
            messages.push(message);
        }

        // Fetch buyer documents using these IDs
        let buyers = [];
        for( let i = 0; i < lastMessageIds.length; i++){
            const buyer = await Buyer.findById(buyerIds[i]).select("name avatar");
            buyers.push(buyer);
        }

        // console.log(messages, buyers)

        // Return the list of sellers
        res.status(200).json({
            success: true,
            buyers,
            messages
        });
    } catch (error) {
        console.log('Error in getChattedSellers:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};