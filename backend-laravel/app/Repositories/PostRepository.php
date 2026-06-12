<?php

namespace App\Repositories;

use App\Models\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * PostRepository
 *
 * Eloquent implementation of the PostRepositoryInterface.
 *
 * Responsible for all database operations related to posts,
 * including retrieval, creation, updating, deletion, and pagination.
 */
class PostRepository implements PostRepositoryInterface
{
    /**
     * Retrieve a paginated list of posts.
     *
     * @param  int  $perPage  Number of records per page.
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 10)
    {
        return Post::paginate($perPage);
    }

    /**
     * Find a post by its identifier.
     *
     * @param  int  $id  Post identifier.
     * @return Post|null Returns the post if found, otherwise null.
     */
    public function find(int $id): ?Post
    {
        return Post::find($id);
    }

    /**
     * Find a post by its identifier or fail.
     *
     * @param  int  $id  Post identifier.
     *
     * @throws ModelNotFoundException
     */
    public function findOrFail(int $id): Post
    {
        return Post::findOrFail($id);
    }

    /**
     * Create a new post.
     *
     * @param  array<string, mixed>  $data  Post attributes.
     */
    public function create(array $data): Post
    {
        return Post::create($data);
    }

    /**
     * Update an existing post.
     *
     * @param  array<string, mixed>  $data  Updated post attributes.
     * @param  int  $id  Post identifier.
     */
    public function update(array $data, int $id): Post
    {
        $post = $this->findOrFail($id);
        $post->update($data);

        return $post;
    }

    /**
     * Delete a post.
     *
     * @param  int  $id  Post identifier.
     * @return bool True if the post was deleted successfully.
     *
     * @throws ModelNotFoundException
     */
    public function delete(int $id): bool
    {
        $post = Post::findOrFail($id);

        return $post->delete();
    }
}
