const Posts = require("../model/post");

async function deletePost(req, res) {
    const { id } = req.params;
    
    try {
        const deletedPost = await Posts.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found or already deleted" });
        }
        res.json({ message: "Post deleted successfully", deletedPost });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = deletePost;
