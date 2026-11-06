
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Get all posts
export const getPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get one post
export const getPost = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Create post
export const createPost = async (postData) => {
    const response = await axios.post(API_URL, postData);
    return response.data;
};

// Update post
export const updatePost = async (id, postData) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        postData
    );
    return response.data;
};

// Update post partially
export const updatePostTitle = async (id, title) => {
    const response = await axios.patch(
        `${API_URL}/${id}`,
        { title }
    );
    return response.data;
};

// Delete post
export const deletePost = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
