const Post = require("../models/Post");
// GET all posts with search, filter, sort, and pagination
exports.getPosts = async (req, res) => {
  try {
    const { search, author, sortBy, page = 1, limit = 10 } = req.query;

    let query = {};

    // Search by title or content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by author
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    // Sorting
    let sortOption = { date: -1 }; // Default: newest first
    if (sortBy === "oldest") sortOption = { date: 1 };
    if (sortBy === "title") sortOption = { title: 1 };
    if (sortBy === "author") sortOption = { author: 1 };

    // Pagination
    const skip = (page - 1) * limit;
    const posts = await Post.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    const newPost = new Post({
      title,
      content,
      author,
      image,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author, image },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
