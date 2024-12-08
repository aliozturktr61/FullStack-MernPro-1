import axios from "axios";
const apiEndpoint = "http://localhost:5001/posts/";

export const fetchPosts = async () => await axios.get(apiEndpoint);

export const fetchSinglePost = async (id) =>
  await axios.get(`${apiEndpoint}${id}`);

export const createPost = async (post) => await axios.post(apiEndpoint, post);

export const updatePost = async (id, updatedPost) =>
  await axios.patch(`${apiEndpoint}${id}`, updatedPost);

export const deletePost = async (id) => {
  try {
    return await axios.delete(`${apiEndpoint}${id}`);
  } catch (error) {
    console.error("Error in API call (deletePost):", error.response?.data || error.message);
    throw error; // Hatanın çağrıldığı yere iletilmesi için tekrar fırlat
  }
};
