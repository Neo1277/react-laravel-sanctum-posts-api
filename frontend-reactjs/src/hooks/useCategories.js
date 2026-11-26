import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";

function useCategories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchCategories = async () => {

            try {
                setLoading(true);
                setError(null);

                const response = await categoryService.getAll();

                setCategories(response.data);

            } catch (err) {

                console.error("Error fetching categories:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load categories."
                );

            } finally {
                setLoading(false);
            }

        };

        fetchCategories();

    }, []);

    return {
        categories,
        loading,
        error
    };

}

export default useCategories;
