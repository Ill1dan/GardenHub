import Message from '../models/Message.js';
import User from '../models/User.js';

// @desc    Send a message
// @route   POST /api/chat
// @access  Private
export const sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;

    try {
        const message = await Message.create({
            sender: req.user._id,
            receiver: receiverId,
            content
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get conversation with a specific user
// @route   GET /api/chat/:userId
// @access  Private
export const getConversation = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user._id }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get list of conversations (Inbox) for the current user
// @route   GET /api/chat/inbox
// @access  Private
export const getInbox = async (req, res) => {
    try {
        // Find all messages where the current user is either sender or receiver
        const messages = await Message.find({
            $or: [{ sender: req.user._id }, { receiver: req.user._id }]
        })
            .sort({ createdAt: -1 })
            .populate('sender', 'name profilePicture')
            .populate('receiver', 'name profilePicture');

        const conversations = [];
        const processedUsers = new Set();

        for (const msg of messages) {
            const otherUser = msg.sender._id.toString() === req.user._id.toString()
                ? msg.receiver
                : msg.sender;

            if (!processedUsers.has(otherUser._id.toString())) {
                const unreadCount = await Message.countDocuments({
                    sender: otherUser._id,
                    receiver: req.user._id,
                    read: false
                });

                conversations.push({
                    user: otherUser,
                    lastMessage: msg,
                    unreadCount
                });
                processedUsers.add(otherUser._id.toString());
            }
        }

        res.json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Get list of experts/gardeners for users to chat with
// @route GET /api/chat/experts
// @access Private
export const getExperts = async (req, res) => {
    try {
        // Find users who are gardeners or experts
        // Assuming roles are 'gardener', 'admin' (which might duplicate as expert), or we check specific fields
        // For keeping it simple, let's fetch all gardeners.
        const experts = await User.find({ role: { $in: ['gardener', 'expert'] } }).select('name profilePicture role');
        res.json(experts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
