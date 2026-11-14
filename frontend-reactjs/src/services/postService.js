import api from "./api";

const postService = {

    // Get all posts (paginated)
    async getAll(page = 1) {
        const response = await api.get("/posts", {
            params: { page }
        });

        return response.data;
    },

    // Get a single post
    async getById(id) {
        const response = await api.get(`/posts/${id}`);

        return response.data;
    },

    // Create a new post
    async create(postData) {
        const response = await api.post("/posts", postData);

        return response.data;
    },

    // Update an existing post
    async update(id, postData) {
        const response = await api.put(`/posts/${id}`, postData);

        return response.data;
    },

    // Delete a post
    async remove(id) {
        const response = await api.delete(`/posts/${id}`);

        return response.data;
    }

};

export default postService;
