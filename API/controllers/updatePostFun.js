const jwt = require('jsonwebtoken');
const Post = require("../model/post");
const fs = require('fs'); // Import the 'fs' module for file operations
require('dotenv').config();

async function updateFunPost(req, res) {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) {
            // Handle JWT verification error
            console.error('JWT verification error:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const { id, title, summary, content } = req.body;
            const postDoc = await Post.findById(id);

            if (!postDoc) {
                return res.status(404).json({ error: 'Post not found' });
            }

            // Check if the user is the author of the post
            const isAuthor =JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                return res.status(403).json({ error: 'You are not authorized to update this post' });
            }

            // Update the post document
            postDoc.title = title;
            postDoc.summary = summary;
            postDoc.content = content;
            if (newPath) {
                postDoc.cover = newPath;
            }
            await postDoc.save();

            // Send a success response
            res.json({ success: true, post: postDoc });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

module.exports = updateFunPost;
