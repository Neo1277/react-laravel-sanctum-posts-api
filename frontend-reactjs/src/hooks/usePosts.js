import { useState } from "react";

function usePosts(initialPosts = []) {
  const [posts, setPosts] = useState(initialPosts);

  // Add a new post
  const addPost = (newPost) => {
    setPosts((currentPosts) => [
      newPost,
      ...currentPosts
    ]);
  };

  // Delete a post
  const deletePost = (id) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== id)
    );
  };

  // Update an existing post
  const updatePost = (updatedPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === updatedPost.id
          ? updatedPost
          : post
      )
    );
  };

  return {
    posts,
    addPost,
    deletePost,
    updatePost
  };
}

export default usePosts;
