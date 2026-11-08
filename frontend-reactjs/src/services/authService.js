import api from "./api";

const authService = {

    // Register a new user
    async register(userData) {
        await api.get("http://localhost:8000/sanctum/csrf-cookie");

        const response = await api.post("/register", userData);

        return response.data;
    },

    // Authenticate an existing user
    async login(credentials) {
        await api.get("http://localhost:8000/sanctum/csrf-cookie");

        const response = await api.post("/login", credentials);

        return response.data;
    },

    // Retrieve the authenticated user
    async getUser() {
        const response = await api.get("/user");

        return response.data;
    },

    // Log out the authenticated user
    async logout() {
        const response = await api.post("/logout");

        return response.data;
    },

};

export default authService;
