const express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();
// GET all posts
router.get("/posts", getPosts);

// GET single post by ID
router.get("/posts/:id", getPostById);

// POST create new post
router.post("/posts", createPost);

// PUT update post
router.put("/posts/:id", updatePost);

// DELETE post
router.delete("/posts/:id", deletePost);
module.exports = router;

