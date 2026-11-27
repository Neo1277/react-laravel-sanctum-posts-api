
import api from "./api";

// Convert post data into FormData
const buildPostFormData = (postData) => {
    const formData = new FormData();

    Object.entries(postData).forEach(([key, value]) => {

        if (key === "image") {
            if (value instanceof File) {
                formData.append("image", value);
            }

            return;
        }

        if (key === "remove_image") {
            formData.append("remove_image", value ? "1" : "0");
            return;
        }

        if (value !== null && value !== undefined) {
            formData.append(key, value);
        }
    });

    return formData;
};

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
        const formData = buildPostFormData(postData);

        const response = await api.post("/posts", formData);

        return response.data;
    },

    // Update an existing post
    async update(id, postData) {
        const formData = buildPostFormData(postData);

        // Laravel method spoofing
        formData.append("_method", "PUT");

        const response = await api.post(`/posts/${id}`, formData);

        return response.data;
    },

    // Delete a post
    async remove(id) {
        const response = await api.delete(`/posts/${id}`);

        return response.data;
    }

};

export default postService;
