import { useCallback, useEffect, useState } from "react";

import {
    getPosts,
    createPost as createPostRequest,
    updatePost as updatePostRequest,
    updatePostTitle as updatePostTitleRequest,
    deletePost as deletePostRequest
} from "../services/postService";

export default function usePostsApi() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // GET: Get all posts
    const fetchPosts = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            const data = await getPosts();

            setPosts(data);

        } catch (error) {

            setError("Error loading posts.");

        } finally {

            setLoading(false);

        }

    }, []);

    // POST: Create a post
    const addPost = async (postData) => {

        setLoading(true);
        setError(null);

        try {

            const newPost = await createPostRequest(postData);

            setPosts((currentPosts) => [
                newPost,
                ...currentPosts
            ]);

            return newPost;

        } catch (error) {

            setError("Error creating post.");
            return null;

        } finally {

            setLoading(false);

        }

    };

    // PUT: Update a complete post
    const updatePost = async (id, postData) => {

        setLoading(true);
        setError(null);

        try {

            const updatedPost = await updatePostRequest(
                id,
                postData
            );

            setPosts((currentPosts) =>
                currentPosts.map((post) =>
                    post.id === id
                        ? updatedPost
                        : post
                )
            );

            return updatedPost;

        } catch (error) {

            setError("Error updating post.");
            return null;

        } finally {

            setLoading(false);

        }

    };

    // PATCH: Update only the title
    const updatePostTitle = async (id, title) => {

        setLoading(true);
        setError(null);

        try {

            const updatedData = await updatePostTitleRequest(
                id,
                title
            );

            setPosts((currentPosts) =>
                currentPosts.map((post) =>
                    post.id === id
                        ? { ...post, ...updatedData }
                        : post
                )
            );

            return updatedData;

        } catch (error) {

            setError("Error updating post title.");
            return null;

        } finally {

            setLoading(false);

        }

    };

    // DELETE: Delete a post
    const removePost = async (id) => {

        setLoading(true);
        setError(null);

        try {

            await deletePostRequest(id);

            setPosts((currentPosts) =>
                currentPosts.filter((post) => post.id !== id)
            );

            return true;

        } catch (error) {

            setError("Error deleting post.");
            return false;

        } finally {

            setLoading(false);

        }

    };

    // Load posts when the hook is initialized
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return {
        posts,
        loading,
        error,
        fetchPosts,
        addPost,
        updatePost,
        updatePostTitle,
        removePost
    };
}
