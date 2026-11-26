import api from "./api";

const categoryService = {

    // Get all categories
    async getAll() {
        const response = await api.get("/categories");

        return response.data;
    }

};

export default categoryService;
