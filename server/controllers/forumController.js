import { ForumPost } from '../models/Forum.js';
import User from '../models/User.js';

// @desc    Get all forum posts
// @route   GET /api/forum
// @access  Public
export const getAllPosts = async (req, res) => {
    try {
        const posts = await ForumPost.find()
            .populate('user_id', 'name email')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new forum post
// @route   POST /api/forum
// @access  Private
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await ForumPost.create({
            user_id: req.user._id,
            title,
            content,
        });

        const populatedPost = await ForumPost.findById(post._id).populate('user_id', 'name email');

        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
