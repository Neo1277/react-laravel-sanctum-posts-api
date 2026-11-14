import { useCallback, useEffect, useState } from "react";
import postService from "../services/postService";

function usePosts() {

    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get posts from Laravel API
    const fetchPosts = useCallback(async (currentPage = page) => {
        try {
            setLoading(true);
            setError(null);

            const response = await postService.getAll(currentPage);

            setPosts(response.data);
            setPagination(response.meta);

        } catch (err) {
            console.error("Error fetching posts:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load posts."
            );

        } finally {
            setLoading(false);
        }
    }, [page]);

    // Load posts when the page changes
    useEffect(() => {
        fetchPosts(page);
    }, [page, fetchPosts]);

    // Create post
    const addPost = async (postData) => {
        await postService.create(postData);

        if (page !== 1) {
            setPage(1);
        } else {
            await fetchPosts(1);
        }
    };

    // Delete post
    const deletePost = async (id) => {
        await postService.remove(id);

        if (posts.length === 1 && page > 1) {
            setPage(currentPage => currentPage - 1);
        } else {
            await fetchPosts(page);
        }
    };

    // Update post
    const updatePost = async (id, postData) => {
        await postService.update(id, postData);
        await fetchPosts(page);
    };

    return {
        posts,
        pagination,
        page,
        setPage,
        loading,
        error,
        fetchPosts,
        addPost,
        deletePost,
        updatePost
    };
}

export default usePosts;
