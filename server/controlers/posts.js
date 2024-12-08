import mongoose from "mongoose";
import Post from "../models/posts.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = await Post.findById(_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  // ObjectId doğrulama
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Invalid post ID" });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(_id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully", _id });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the post",
      error: error.message,
    });
  }
};